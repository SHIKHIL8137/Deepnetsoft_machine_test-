import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import bg2 from '../assets/images/bg-2.png';
import pgImgae1 from'../assets/images/bg-top.png'
import Navbar from '../components/Navbar';
import bgCenter from '../assets/images/bg_center.png'
import bgleft from '../assets/images/bg_right.png'
import bgright from '../assets/images/bg_left.png'
import cooldrings from '../assets/images/icons/cooldrings.png'
import lemonDrings from '../assets/images/icons/cocktail1 1.png'
import Footer from '../components/footer';
import FloatingActionBtn from '../components/FloatingActionBtn'
import AddMenuModal from '../components/addMenuModal';
import AddMenuItemModal from '../components/AddMenuItemModal';

import { api } from '../apis/api';
import { itemsFetch, menuFetch } from '../redux/slice/dataReducer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { getItems, getMenu } from '../apis/dataFetchApis';
import Skeleton from "react-loading-skeleton";

const HomePage = () => {
  const dispatch = useDispatch();
  const menuSelector = useSelector((state) => state.Data.menus);
  const itemSelector = useSelector((state) => state.Data.items);
  const [activeTab, setActiveTab] = useState(null);
  const [activeMenuName, setActiveMenuName] = useState("MENU");
  const [loading, setLoading] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchMenu = async () => {
      try {
        const response = await getMenu();
        
        if (response.status === 200) {
          dispatch(menuFetch(response.data.data));

          if (response.data.data.length > 0 && !activeTab) {
            setActiveTab(response.data.data[0]._id);
            setActiveMenuName(response.data.data[0].menuName.toUpperCase());
          }
        }
      } catch (error) {
        console.log(error);
        const errorMsg = error?.response?.data?.message || "Something went wrong";
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenu();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab) {
      setLoading(true);
      const fetchItems = async () => {
        try {
          const response = await getItems(activeTab);
          
          if (response.status === 200) {
            dispatch(itemsFetch(response.data.data));
          }
        } catch (error) {
          console.log(error);
          const errorMsg = error?.response?.data?.message || "Something went wrong";
          toast.error(errorMsg);
        } finally {
          setLoading(false);
        }
      };
      
      fetchItems();
    }
  }, [activeTab]);

  const handleMenuClick = (menuId, menuName) => {
    setActiveTab(menuId);
    setActiveMenuName(menuName.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar/>

      <div className="relative py-12 bg-cover " style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${pgImgae1})` }}>
        <div className="container mx-auto text-center px-4">
          <h2 className=" text-[40px] md:text-[75px] font-bold mb-6 shadow-lg" style={{ color:'#rgb(255 244 244)', textShadow: '2px 3px 0 rgba(128, 0, 32, 0.6)' }}>MENU</h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: '"Kelly Slab", sans-serif' }}
          >
            Please take a look at our menu featuring food, drinks, and brunch. If you'd like to
            place an order, use the "Order Online" button located below the menu.
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-center p-4" style={{backgroundImage: `linear-gradient(rgb(0 0 0 / 90%), rgb(0 0 0 / 90%)), url(${bg2})`}}>
          {loading && menuSelector.length === 0 ? (
            <Skeleton height={100} width={200} />
          ) : (
            menuSelector.map((val, ind) => (
              <button 
                key={ind}
                className={`px-8 py-3 mx-1 ${activeTab === val._id ? 'bg-blue-500' : 'bg-black'}`}
                onClick={() => handleMenuClick(val._id, val.menuName)}
              >
                {val.menuName}
              </button>
            ))
          )}
        </div>

        <div className="relative w-full bg-black md:py-12 py-5 flex justify-between" style={{backgroundImage:`linear-gradient(rgb(0 0 0 / 85%), rgb(0 0 0 / 85%)), url(${bgCenter})`}}>
          <div className="hidden md:block w-[180px] h-[641px]" style={{backgroundRepeat: 'no-repeat', backgroundImage:`url(${bgleft})`}}>
          </div>
          
          <div className="absolute top-10 left-9 md:left-50 md:top-21 z-10">
            <img className="w-16 h-24 md:w-28 md:h-40" src={cooldrings} alt="Cool Drinks Decoration" />
          </div>
          
          <div className="border pb-15 md:pb-0 md:pt-10 flex-1 mx-4 md:mx-10 my-10 md:my-30">
            <div className="flex mt-5 md:mt-0 items-center justify-center mb-6 ">
              <div className="h-px bg-gray-600 w-10 md:w-24"></div>
              <h2 className="text-2xl md:text-4xl font-bold px-3 md:px-6 text-center" 
                  style={{ color:'#ffe5e5', textShadow: '2px 3px 0 rgba(128, 0, 32, 0.6)' }}>
                {activeMenuName || "MENU"}
              </h2>
              <div className="h-px bg-gray-600 w-10 md:w-24"></div>
            </div>
            
            <div className="w-full py-6 md:py-8 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                {loading && activeTab ? (
                  <Skeleton count={4} height={60} />
                ) : itemSelector.length > 0 ? (
                  itemSelector.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-white font-bold text-lg">{item.itemName}</h3>
                        <div className="flex-grow border-b border-dotted mx-2 border-gray-400"></div>
                        <span className="text-white font-medium text-lg">${item.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm" style={{ fontFamily: '"Kelly Slab", sans-serif' }}>
                        {item.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 col-span-2">No items found for this menu.</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-16 md:bottom-37 right-4 md:right-46 z-10">
            <img className="w-16 h-20 md:w-24 md:h-32" src={lemonDrings} alt="Lemon Drinks Decoration" />
          </div>
          
          <div className="hidden md:block w-[150px] h-[610px]" style={{backgroundRepeat: 'no-repeat', backgroundImage:`url(${bgright})`}}>
          </div>
        </div>
      </div>

      <FloatingActionBtn 
        onAddMenu={() => setIsMenuModalOpen(true)} 
        onAddItem={() => setIsItemModalOpen(true)}
      />
      
      <AddMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
      
      <AddMenuItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
      />
      
      <Footer/>
    </div>
  );
}

export default HomePage