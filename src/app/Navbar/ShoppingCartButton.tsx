"use client"

import { ShoppingCart } from "../lib/db/cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { formatPrice } from "../lib/format";
import Link from "next/link";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {

  function closeDropdown() {
    const element = document.activeElement as HTMLElement

    if(element){
      element.blur()
    }
  }

  return (
    <div className=" dropdown-end dropdown">
      <label tabIndex={0} className=" btn-ghost btn-circle btn">
        <div className="indicator text-2xl">
          <AiOutlineShoppingCart />
          <span className=" badge badge-sm indicator-item">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        className=" dropdown-content card-compact z-30 mt-3 w-52 bg-base-100 shadow"
        tabIndex={0}
      >
        <div className=" card-body">
          <span className=" text-lg font-bold ">{cart?.size || 0} Items</span>
          <span className="text-info">
            Subtotal: {formatPrice(cart?.subtotal || 0)}
          </span>
          <div className=" card-actions">
            <Link href={"/cart"} className=" btn-primary btn-block btn" onClick={closeDropdown}>
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
