import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './slice/dataReducer'

const store = configureStore({
  reducer:{
    Data : dataReducer
  }
})

export default store