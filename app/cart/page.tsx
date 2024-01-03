import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import setProductQuantity from "./actions";
import format from "@/lib/format";

export const metadata = {
  title: "Your Cart - AviMart",
};
export const cartPage = async () => {

    const cart = await getCart()
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Browse your cart!</h1>
      
      {cart?.items.map(cartItem => (
        <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}/>
      ))}
      {!cart?.items.length && <p>Your cart is empty!</p> }
      <div className="flex flex-col items-end top-0 right-0 sm:items-center">
        <p className="mb-3 font-bold">Total : {format(cart?.subtotal || 0)}</p>
        <button className="btn btn-primary sm:w-[200px]">Check out</button>
      </div>
    </div>
  );
};

export default cartPage;
