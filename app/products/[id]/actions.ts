"use server";

import { createCart, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

const incrementProductQuantity = async (product_id: string) => {
    
  //creating a create after getting a cart.
  const cart = (await getCart()) ?? (await createCart());

  // for finding if the article exists in the cart or not.
  const articileInCart = cart.items.find(
    (item) => item.productId === product_id
  );

  if (articileInCart) {

    await prisma.cart.update({
      where : {id: cart.id}, 
      data:{
        items:{
          update:{
            where: {id: articileInCart.id},
            data:{quantity :{increment:1}}
          }
        }
      }
    })
  } else {

    await prisma.cart.update({
      where: {id:cart.id},
      data:{
        items:{
          create:{
            productId: product_id,
            quantity:1,
          }
        }
      }
    })

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: product_id,
        quantity: 1,
      },
    });
  }

  revalidatePath("/products/[id]"); //for refreshing the page in server component.
};

export default incrementProductQuantity;
