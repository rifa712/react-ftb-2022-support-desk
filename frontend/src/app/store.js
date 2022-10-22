import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import ticketSlice from '../features/ticket/ticketSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketSlice,
  },
})
