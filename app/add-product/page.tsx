import FormSubmitButton from "@/app/_components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { error } from "console";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Add Product-AviMart",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions)

  if(!session){
    redirect("/api/auth/signin?callbackUrl=/add-product")
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price)
    throw Error("Input fields are empty");

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });
  
  redirect("/");
}

const addProductPage = async () => {

  const session = await getServerSession(authOptions)

  if(!session){
    redirect("/api/auth/signin?callbackUrl=/add-product")
  }
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add product</h1>
      <form action={addProduct}>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          className="input input-bordered w-full mb-3"
        />
        <textarea
          name="description"
          required
          placeholder="Description"
          className="textarea textarea-bordered w-full mb-3"
        />
        <input
          type="url"
          name="imageUrl"
          required
          placeholder="Image URL"
          className="input input-bordered w-full mb-3"
        />
        <input
          type="number"
          name="price"
          required
          placeholder="Price"
          className="input input-bordered w-full mb-3"
        />
        <FormSubmitButton className="btn-block">ADD PRODUCT</FormSubmitButton>
      </form>
    </div>
  );
};

export default addProductPage;
