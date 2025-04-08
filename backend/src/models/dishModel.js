import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
  menuName:{
    type : String,
    required : true
  },
  description:{
    type :String,
    required : true,
  }
})
const Menu = mongoose.model('Menu',menuSchema);

const itemSchema = mongoose.Schema({
  itemName : {
    type:String,
    required : true,
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  menu:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Menu'
  }
})


export const Item = mongoose.model('Item',itemSchema);
export {Menu}