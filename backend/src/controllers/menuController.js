import { Item, Menu } from "../models/dishModel.js"

export const addMenu = async(req,res)=>{
  try {
    const {menuName , description} = req.body
    if(!menuName || !description){
      return res.status(400).json({status :false,message:"Missing requied fields"})
    }
    const alreadyExistMenu = await Menu.findOne({menuName});
    if(alreadyExistMenu){
      return res.status(409).json({status:false,message:"Already exist the Menu Name"});
    }
    const newMane = new Menu({
      menuName,
      description
    })
    await newMane.save();
    res.status(200).json({status:true,message:"New menu added"});
  } catch (error) {
    console.log(error);
    res.status(500).json({status:false,message:"Internal Server Error"});
  }
}

export const addItem =async(req,res)=>{
  try {
    const {itemName , description , price ,menuID} = req.body;
    console.log(req.body)
    if(!itemName || !description || !price || !menuID){
      return res.status(400).json({status :false,message:"Missing requied fields"})
    }
    const existingItem = await Item.findOne({itemName});
    if(existingItem){
      return res.status(409).json({status:false,message:"Already exist the item"});
    }
    const menuIdValid = await Menu.findById(menuID);
    if(!menuIdValid){
      return res.status(400).json({status:false ,message:"Menu not found"});
    }
    const newItem = new Item({
      itemName,
      description,
      price,
      menu:menuID
    })
    await newItem.save();
    res.status(200).json({status:true,message:"New Item Added"});
  } catch (error) {
    console.log(error);
    res.status(500).json({status:false,message:"Internal Server Error"});
  }
}

export const getItems = async(req,res)=>{
  try {
    const menuID = req.query.id;
    const items = await Item.find({
      menu: menuID
    }).sort({ createdAt: -1 });
    res.status(200).json({data:items})
  } catch (error) {
    console.log(error);
    res.status(500).json({status:false,message:"Internal Server Error"});
  }
}

export const getMenuData =async(req,res)=>{
  try {
    const menu = await Menu.find();
    res.status(200).json({data:menu})
  } catch (error) {
    console.log(error)
    res.status(500).json({status:false,message:"Internal Server Error"});
  }
}
