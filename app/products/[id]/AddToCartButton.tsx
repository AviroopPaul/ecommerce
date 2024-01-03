"use client";

import React, { useState, useTransition } from "react";
import { FaShoppingCart } from "react-icons/fa";
import incrementProductQuantity from "./actions";

interface AddToCartButtonProps {
  product_id: string;
  incrementProductQuantity: (product_id: string) => Promise<void>;
}

const AddToCartButton = ({
  product_id,
  incrementProductQuantity,
}: AddToCartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(product_id);
            setSuccess(true);
          });
        }}
      >
        ADD TO CART
        <FaShoppingCart size="18px" />
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to cart!</span>
      )}
    </div>
  );
};

export default AddToCartButton;
