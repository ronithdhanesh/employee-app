import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { Data } from '../Data/productData';
import ProductCard from './ProductCard';



const HomeView = () => (
  <div className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 my-4">
    <h2 className="text-4xl font-black mb-4">Welcome to Sneaker.Co</h2>
    <p className="text-lg text-blue-100 max-w-md mb-6">The ultimate store optimized for sneaker Heads.</p>
    <Link to="/shop" className="bg-white text-indigo-700 font-bold px-6 py-2.5 rounded-lg shadow-md hover:bg-gray-100">Browse Shop Catalog</Link>
  </div>
);

const ShopView = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Our Store Catalog</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {Data.map((product)=>{
      return (
        <ProductCard image_src={product.image_src} productName={product.productName} price={product.price} ratings={product.ratings} stars={product.stars} id={product.id} page={"product"}/>
      )
    })}
    </div>
  </div>
);

const ProductDetailView = () => {
  

  const { id } = useParams();
  const currentProduct = Data.find(
    (item) => item.id === Number(id)
  );

  if (!currentProduct) {
    return (
      <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl max-w-2xl mx-auto p-8 shadow-sm">
        <span className="text-4xl">⚠️</span>
        <h2 className="text-xl font-bold text-red-600 mt-4 mb-2">Product Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">The product ID #{id} doesn't exist in our current inventory catalog database.</p>
        <Link to="/shop" className="bg-indigo-600 text-white font-bold text-xs px-4 py-2 rounded shadow-xs hover:bg-indigo-700">
          Return to Store Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-2xl mx-auto shadow-sm flex flex-col md:flex-row gap-8 my-4 animate-fadeIn">
      
      <div className="w-full md:w-1/2 bg-gray-100 h-64 rounded-xl overflow-hidden border border-dashed border-gray-200">
        <img
          src={currentProduct.image_src}
          alt={currentProduct.productName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <span className="text-xs font-extrabold tracking-widest text-indigo-600 uppercase">Sneaker Inventory</span>

          <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-2">
            {currentProduct.productName}
          </h2>
          
          <p className="text-3xl font-black text-gray-900 mb-4">
            {currentProduct.price}
          </p>
          
          <p className="text-sm text-gray-600 leading-relaxed">
            {currentProduct.desc}
          </p>
        </div>

        <Link 
          to="/shop" 
          className="w-full mt-6 bg-gray-900 text-white font-bold py-2.5 rounded-lg text-center block text-sm hover:bg-gray-800 transition-colors"
        >
          ← Back to Catalog Shop
        </Link>
      </div>

    </div>
  );
};


const EcommerceApp = () => {
  return (
    <BrowserRouter>
      <div className="w-full max-w-5xl mx-auto p-6 font-sans text-gray-800 min-h-screen">
        
        <nav className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-xl shadow-md mb-8">
          <h1 className="text-xl font-black tracking-wide text-indigo-400">Sneaker Co.</h1>
          
          <div className="flex gap-6 text-sm font-semibold">
            <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-indigo-400 transition-colors">Shop</Link>
          </div>
        </nav>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/shop" element={<ShopView />} />
            <Route path="/product/:id" element={<ProductDetailView/>} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
};

export default EcommerceApp;