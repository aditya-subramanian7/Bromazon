"use client";

import Image from "next/image";
import { CartItemWithProduct } from "../lib/db/cart";
import Link from "next/link";
import { formatPrice } from "../lib/format";
import { useTransition } from "react";
import { setProductQuantity } from "./actions";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();
  const quantityOptions: JSX.Element[] = [];

  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className=" rounded-lg"
        />
        <div>
          <Link href={"product/" + product.id} className=" font-bold">
            {product.name}
          </Link>
          <div>Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className=" select-bordered select w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              <option value={0}>0(Remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className=" flex items-center gap-3 ">
            Total: {formatPrice(product.price * quantity)}
            {isPending && (
              <span className=" loading loading-spinner loading-sm"></span>
            )}
          </div>
        </div>
      </div>
      <div className=" divider" />
    </div>
  );
}
