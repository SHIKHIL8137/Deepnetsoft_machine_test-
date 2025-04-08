import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menus:[],
  items:[],
}

const dataSlice  = createSlice({
  name:"Data",
  initialState,
  reducers:{
    menuFetch : (state,action)=>{
      state.menus=[...action.payload];
    },
    itemsFetch : (state,action)=>{
      state.items = [...action.payload];
    }
  }
})


export const {menuFetch,itemsFetch} = dataSlice.actions
export default dataSlice.reducer;