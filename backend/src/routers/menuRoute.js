import express from 'express';
import { addItem, addMenu, getItems, getMenuData } from '../controllers/menuController.js';
const route = express.Router();


route.post('/addmenu',addMenu);
route.post('/additem',addItem);
route.get('/getitems',getItems);
route.get('/getmenu',getMenuData)

export default route