import React, { cache } from "react";
import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/app/components/PriceTag";
import { Metadata } from "next";
import AddToCartButton from "./AddToCartButton";
import incrementProductQuantity from "./actions";
interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name + "- AviMart",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        height={500}
        width={500}
        className="rounded-lg shadow-lg"
        priority
      />
      <div>
        <h1 className="text-5xl bold">{product.name}</h1>
        <PriceTag price={product.price} className="text-2xl py-4 mt-4" />
        <p className="text-xl py-4">{product.description}</p>
        <AddToCartButton product_id={product.id} incrementProductQuantity={incrementProductQuantity}/>
      </div>
    </div>
  );
};

export default ProductPage;
