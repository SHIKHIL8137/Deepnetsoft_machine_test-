import React,{useState} from 'react'

const FloatingActionBtn = ({ onAddMenu, onAddItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
  return (
    <div className="fixed right-6 bottom-6 z-100 flex flex-col-reverse items-end">
      {isExpanded && (
        <>
          <button
            onClick={() => {
              onAddMenu();
              setIsExpanded(false);
            }}
            className="mb-4 flex items-center bg-gradient-to-r from-red-900 to-red-700 text-white px-4 py-2 rounded-lg shadow-lg hover:from-red-800 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
          >
            <span className="mr-2">Add Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={() => {
              onAddItem();
              setIsExpanded(false);
            }}
            className="mb-4 flex items-center bg-gradient-to-r from-red-900 to-red-700 text-white px-4 py-2 rounded-lg shadow-lg hover:from-red-800 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
          >
            <span className="mr-2">Add Item</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </>
      )}
      
      <button
        onClick={toggleExpand}
        className="bg-gradient-to-r from-red-900 to-red-700 text-white p-4 rounded-full shadow-lg hover:from-red-800 hover:to-red-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
        style={{ boxShadow: '0 4px 10px rgba(150, 0, 0, 0.5)' }}
      >
        {isExpanded ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default FloatingActionBtn
