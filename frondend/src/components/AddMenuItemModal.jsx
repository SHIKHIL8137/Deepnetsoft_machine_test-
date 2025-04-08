import React,{useEffect, useState} from 'react'
import { toast } from 'sonner';
import { addItems, getMenu } from '../apis/dataFetchApis';
import { useDispatch, useSelector } from 'react-redux';
import { menuFetch } from '../redux/slice/dataReducer';

const AddMenuItemModal = ({ isOpen, onClose}) => {
  const dispatch = useDispatch()
  const menus = useSelector((state)=>state.Data.menus);
    const [isSubmitting, setSubmitting] = useState(false);
   const [formData, setFormData] = useState({
      itemName: '',
      description: '',
      price: 0,
      menuID: ''
    });

    useEffect(() => {
      const fetchMenus = async () => {
        try {
          const response = await getMenu();
          if (response.status) {
            const data = response.data.data;
            dispatch(menuFetch(data));
          }
        } catch (error) {
          console.error("Error fetching menus:", error);
        }
      };    
      fetchMenus();
    }, []);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value.trim()
      });
    };


  
    const handleSubmit = async(e) => {
      e.preventDefault();
      if(!formData.itemName || !formData.description || !formData.menuID){
        return toast.error('All fields are required');
      }else if(formData.price <= 0){
        return toast.error('price not equal to 0');
      }
       try {
              setSubmitting(true)
              const response = await addItems(formData);
              if(!response.data.status){
                toast.error(response.data.message);
              }
              setFormData({
                itemName: '',
                description: '',
                price: 0,
                menuID: ''
              });
              onClose();
              toast.success(response.data.message);
            } catch (error) {
             toast.error(error.response.data.message);
            }finally{
              setSubmitting(false);
            }
    };
  
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-100">
    <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose}></div>
    
    <div className="relative bg-black border border-gray-700 w-full max-w-md mx-4 rounded shadow-lg"
         style={{ backgroundImage: 'linear-gradient(rgb(0 0 0 / 95%), rgb(0 0 0 / 95%))' }}>
      
      <div className="border-b border-gray-700 p-4">
        <div className="flex items-center justify-center my-2">
          <div className="h-px bg-gray-600 w-12"></div>
          <h3 className="text-2xl font-bold px-4 text-center" 
              style={{ color:'#ffe5e5', textShadow: '2px 2px 0 rgba(128, 0, 32, 0.6)' }}>
            ADD MENU ITEM
          </h3>
          <div className="h-px bg-gray-600 w-12"></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Menu</label>
            <select
              name="menuID"
              value={formData.menuID}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-900"
            >
              <option value="">select</option>
              {menus.length > 0 ? (
                menus.map(menu => (
                  <option key={menu._id} value={menu._id}>
                    {menu.menuName}
                  </option>
                ))
              ) : (
                <option value="">No menus available</option>
              )}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white uppercase focus:outline-none focus:ring-2 focus:ring-red-900"
              placeholder="CINNAMON TOAST CRUNCH"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-900 min-h-20"
              placeholder="Skrewball peanut butter whiskey, vanilla extract, Amaretto, baileys, egg white, cinnamon"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Price</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">$</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 pl-6 text-white focus:outline-none focus:ring-2 focus:ring-red-900"
                placeholder="16.00"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`px-4 py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-red-900 to-red-700 text-white rounded font-medium transition-colors ${
              isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:from-red-800 hover:to-red-600"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                
              </>
            ) : (
              "Save item"
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default AddMenuItemModal
