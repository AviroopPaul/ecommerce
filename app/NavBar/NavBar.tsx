import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo.png"
import { redirect } from "next/navigation"
import { getCart } from "@/lib/db/cart"
import AddToCartButton from "../products/[id]/AddToCartButton"
import ShoppingCartButton from "./ShoppingCartButton"
import UserMenuButton from "./UserMenuButton"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

const searchProducts = async(formData: FormData) =>{
  "use server"

  const searchQuery=formData.get("searchQuery")?.toString();

  if (searchQuery){
    redirect("/search?query=" + searchQuery);
  }
}

export const NavBar = async () => {

  const cart= await getCart()
  const userSession= await getServerSession(authOptions)

  return (
    <div className='bg-base-100'>
        <div className='navbar max-w-7xl m-auto flex-col sm:flex-row gapp-4 '>
          <div className="flex-1">
            <Link href={'/'} className="btn btn-ghost text-xl">
              <Image src={logo} alt="AviMart Logo" height={40} width={40}/>
              AviMart
            </Link>
          </div>
          <div className="flex-none gap-2">
            <form action={searchProducts}>
              <div className="form-control">
                <input name="searchQuery" placeholder="Search" className="input input-bordered w-full min-w-[100px]" />
              </div>
            </form>
            <ShoppingCartButton cart={cart}/>
            <UserMenuButton session={userSession}/>
          </div>

        </div>
    </div>
  )
}
