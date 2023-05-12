import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { billSlice } from './bill/biillSlice'
import { holdingSlice } from './holding/holdingSlice'
import { homeSlice } from './home/homeSlice'
import { incomeSlice } from './income/incomeSlice'
import { walletSlice } from './wallet/walletSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    income: incomeSlice.reducer,
    bill: billSlice.reducer,
    holding: holdingSlice.reducer,
    home: homeSlice.reducer,
    wallet: walletSlice.reducer
  }
})