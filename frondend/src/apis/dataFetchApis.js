import {api} from './api'

export const addMenu = async(formData)=>{
  return await api.post('/addmenu',formData);
}

export const addItems = async(formData)=>{
  return await api.post('/additem',formData);
}

export const getMenu = async()=>{
  return await api.get('/getmenu');
}

export const getItems = async(id)=>{
  return await api.get(`/getitems?id=${id}`);
}