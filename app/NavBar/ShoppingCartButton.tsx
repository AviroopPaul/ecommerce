"use client";

import { ShoppingCart } from "@/lib/db/cart";
import format from "@/lib/format";
import Link from "next/link";
import React, { use, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

const ShoppingCartButton = ({ cart }: ShoppingCartButtonProps) => {
  const closeDropdown = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn-ghost btn btn-circle">
        <div className="indicator ">
          <FaShoppingCart size="25px" />
          <span className="badge badge-md indicator-item bg-base-200">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        id="dropdown-cart"
        className="card dropdown-content card-compact mt-3 w-52 bg-base-200 shadow"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size || 0} Items </span>
          <span className="text-info">
            Subtotal: {format(cart?.subtotal || 0)}
          </span>
          <div className="card-actions">
            <Link
              href={"/cart"}
              className="btn btn-primary btn-block"
              onClick={closeDropdown}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartButton;
