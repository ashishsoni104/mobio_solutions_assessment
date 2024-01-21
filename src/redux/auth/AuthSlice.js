import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../utills/axios';

const initialState = {
    loading:'idle',
    registerUserResponse:{},
    loginResponse:{},
    isUserLogin:false,
    errorMessage:""
}

export const registerUser = createAsyncThunk('auth/registerUser', async (params) => {
    try{
        let response = await axiosInstance.post('users',params);
        console.log(response);
        if (response.status === 200) {
            return response.data;
        }else{
            // return response;
            throw new Error("Something went wrong")
        }
    }catch(e){
        
        console.log(e.response);
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (params) => {
    try{
        let response = await axiosInstance.post('auth/login',params);
        if(response.status === 200){
            return response.data;
        }else{
            throw new Error("Something went wrong")
        }
    }catch(e){
        return e;
    }
})

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        blankRegisterResponse: (state) => {
            state.registerUserResponse = {};
        },
        blankLoginResponse: (state) => {
            state.loginResponse = {};
        },
        setIsUserLogin:(state,action) => {
            state.isUserLogin = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending,(state)=>{
            state.loading = 'loading';
        })
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = 'succeeded';
            state.registerUserResponse = action.payload;
        })
        builder.addCase(registerUser.rejected,(state)=>{
            state.loading = "failed";
            state.registerUserResponse = {};
        })
        builder.addCase(loginUser.pending,(state)=>{
            state.loading = 'loading';
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = 'succeeded';
            state.loginResponse = action.payload;
        })
        builder.addCase(loginUser.rejected,(state)=>{
            state.loading = "failed";
            state.loginResponse = {};
        })
    }

})
export const {blankRegisterResponse,blankLoginResponse,setIsUserLogin} = AuthSlice.actions;
export default AuthSlice.reducer;

