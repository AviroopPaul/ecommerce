"use server";
import { createCart, getCart } from "@/lib/db/cart";
import { Quantico } from "next/font/google";
import React from "react";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

const setProductQuantity = async (productId: string, quantity: number) => {
  const cart = (await getCart()) ?? (await createCart());

  const articileInCart = cart.items.find(
    (item) => item.productId === productId
  );

  if (quantity === 0) {
    if (articileInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: {
              id: articileInCart.id,
            },
          },
        },
      });
    }
  } else {
    if (articileInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: articileInCart.id },
              data: { quantity },
            },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: { productId, quantity },
          },
        },
      });
    }
  }

  revalidatePath("/cart");
};

export default setProductQuantity;
