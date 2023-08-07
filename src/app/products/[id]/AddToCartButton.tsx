"use client";

import { useState, useTransition } from "react";

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

export default function AddToCartButton({
  productId,
  incrementProductQuantity,
}: AddToCartButtonProps) {
  // useTransition takes care of error handling when calling a server action from a client componenet
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        className=" btn-primary btn"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
          });
        }}
      >
        Add to Cart
      </button>
      {isPending ? (
        <span className=" loading loading-spinner loading-md"></span>
      ) : null}
      {!isPending && success && <span className=" text-success">Added to cart</span>}
    </div>
  );
}
