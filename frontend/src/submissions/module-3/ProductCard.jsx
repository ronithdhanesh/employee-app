import React from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

function ProductCard({image_src, productName,price, ratings, stars,page, id}) {
    return(
        <div className=" min-h-full flex flex-col bg-white max-w-60 p-2 rounded-lg shadow-md">
            <div className="product-image">
                <img className="w-full h-40 rounded-lg shadow-sm object-cover" src={image_src}/>
            </div>
            <div className="product-details my-2 ml-2">
                <h2 className="text-lg">{productName}</h2>
                <div className="flex justify-between">
                    <div className="price">
                        <h3 className="font-bold">{price}</h3>
                    </div>
                    <div className="ratings mr-2 bg-amber-200 rounded-sm text-xs p-1">
                        {ratings}
                    </div>

                </div>
                
            </div>
            {/* <div className="buy-button ml-1 mb-2 mr-1 text-white font-medium ">
                <button className="cursor-pointer bg-blue-950 min-w-full rounded-lg py-2">🛒 Add to card</button>
            </div> */}

            <Link to={`/${page}/${id}`} className="buy-button ml-1 mb-2 mr-1 text-white font-medium bg-blue-950 min-w-full rounded-lg py-2 pl-2 justify-center items-center">🛒 Add to card</Link>

        </div>
    )
}



export default ProductCard;

