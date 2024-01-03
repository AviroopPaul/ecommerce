import React from "react";
import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import PriceTag from "../components/PriceTag";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-zinc-100 hover:shadow-xl transition-shadow"
    >
      <div className="card-body">
        <figure>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={800}
            height={400}
            className="h-48 object-cover"
          />
        </figure>
        <h2 className="card-title">
          {isNew && <div className="badge badge-secondary">NEW!</div>}
          {product.name}
        </h2>

        <p className="">{product.description}</p>
        <PriceTag price={product.price} className=""></PriceTag>
      </div>
    </Link>
  );
};

export default ProductCard;
