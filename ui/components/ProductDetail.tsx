'use client';
import { Product } from '@/type';

const ProductDetail = ({
  product,
}: {
  product: Product;
}) => {
  const mainImage =
    product?.variants?.[0]?.image ??
    product?.variants?.[0]?.images?.[0] ??
    (Array.isArray(product.images)
      ? product.images[0]
      : undefined) ??
    '/placeholder.png';
  return (
    <div className="p-6">
      <img
        src={mainImage}
        alt={product.name}
        className="w-64 mx-auto"
      />
      <h1 className="text-2xl font-bold mt-4">
        {product.name}
      </h1>
      <p className="text-lg text-gray-700 mt-2">
        {product.price}
      </p>
      <p className="mt-4">{product.description}</p>
    </div>
  );
};

export default ProductDetail;
