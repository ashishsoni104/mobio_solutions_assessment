import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from './product/ProductSlice'
import AuthSlice from './auth/AuthSlice'

export const store = configureStore({
  reducer: {
    products:ProductSlice,
    auth:AuthSlice
  },
})