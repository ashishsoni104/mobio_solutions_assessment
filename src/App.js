import React,{lazy, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home/Home'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./redux/product/ProductSlice";
import { setIsUserLogin } from "./redux/auth/AuthSlice";
const Layout = lazy(()=>import("./layout/Layout"));
// const Home = lazy(()=>import("./pages/home/Home"));
const Checkout = lazy(()=>import("./pages/checkout/Checkout"));
const PlaceMyOrder = lazy(()=>import("./pages/placemyorder/PlaceMyOrder"));
const Login = lazy(()=>import('./pages/login/Login'));


function App() {
	const dispatch = useDispatch();
	const carts = useSelector((state) => state.products.carts);
	const isLogin = useSelector((state) => state.auth.isUserLogin);
	useEffect(()=>{
		if(carts && Object.keys(carts).length===0){
			let cartsValue = window.localStorage.getItem('cartItem');
			if(cartsValue) dispatch(addToCart(JSON.parse(cartsValue)))
		}
		let isLoginUser = window.localStorage.getItem("isLoginUser");
		if(isLoginUser) dispatch(setIsUserLogin(setIsUserLogin?true:false));
	},[])
  return (
	<BrowserRouter>
		<Routes>
			<Route index path="/" element={<Home />} />
			<Route path="/checkout" element={<Checkout />} />
			<Route path="/placeorder" element={<PlaceMyOrder />} />
			<Route path="/login" element={<Login />} />
		</Routes>
    </BrowserRouter>
  );
}

export default App;
