import React, { useEffect,  useState } from "react";

function CartProduct({ item, onIncrease, onDecrease, onRemove ,isCart}) {

  const total = (Number(item.productPrice) || 0) * (Number(item.quantity) || 1);

  return (
    <>
      <div className="w-full border border-gray-200 rounded-xl p-4 bg-white">
        <div className="grid grid-cols-[90px_1fr_120px_160px_140px_60px] items-center gap-4">
          {/* IMAGE */}
          <div className="w-[90px] h-[90px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {item.productImg ? (
              <img
                src={item.productImg}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-xs text-gray-400">No image</div>
            )}
          </div>

          {/* TITLE */}
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {item.productName}
            </p>
          </div>

          {/* PRICE */}
          <div className="text-gray-900 font-medium">
            ${Number(item.productPrice).toFixed(2)}
          </div>

          {/* QUANTITY (type : true(Cart) , false(Favourites) (yani favourites da burası olmıycak ama cart da olucak.))*/}  
         { isCart && ( <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onDecrease?.(item)}
              className="w-9 h-9 rounded-lg border border-gray-300 hover:bg-gray-50"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className="w-10 text-center font-medium text-gray-900">
              {item.quantity}
            </span>
            
            <button
              type="button"
              onClick={() => onIncrease?.(item)}
              className="w-9 h-9 rounded-lg border border-gray-300 hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              +
            </button>

          </div>)}

          {/* TOTAL PRICE (type true olursa (yani Card) birinci div gösterilecek type false olursa (favourites) ikinci div gösterilicek) */}
          { isCart ? (<div className="font-semibold text-gray-900">${total.toFixed(2)}</div>)  
          : <div className="font-semibold text-gray-900">❤️</div> }

          {/* DELETE */}
          <button
            type="button"
            onClick={() => onRemove?.(item)}
            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-red-50 hover:border-red-300"
            aria-label="Remove item"
            title="Remove"
          >
            🗑️
          </button>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
