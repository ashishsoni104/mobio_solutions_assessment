import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../utills/axios';

const initialState = {
    products:[],
    loading:'idle',
    error:"",
    carts:{}
}
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    let response = await axiosInstance.get('products');
    if (response.status === 200) {
        return response.data;
    }else{
        throw new Error("Something went wrong")
    }
});

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addToCart:(state,action) => {
            window.localStorage.setItem('cartItem',JSON.stringify(action.payload))
            state.carts = action.payload;
        },
        setProducts:(state,action)=>{
            state.products = action.payload;
        },
        updateCartsDecrement:(state,action) => {
            let product = action.payload;
            if((state.carts[product.productId].quantity-1) === 0){
                delete state.carts[product.productId];
            }else{
                state.carts[product.productId].quantity = state.carts[product.productId].quantity-1;
            }
            window.localStorage.setItem('cartItem',JSON.stringify(state.carts))
        },
        updateCartsIncrement:(state,action)=>{
            let product = action.payload;
            state.carts[product.productId].quantity = state.carts[product.productId].quantity+1;
            window.localStorage.setItem('cartItem',JSON.stringify(state.carts))
        },
        blankCart:(state) => {
            state.carts = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading = 'loading';
        })
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading = 'succeeded';
            state.products = action.payload;
        })
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.loading = 'failed';
            state.products = [];
            state.error = action.error.message;
        })
    }
});
export const { addToCart,setProducts,updateCartsDecrement, updateCartsIncrement,blankCart} = productSlice.actions;
export default productSlice.reducer;