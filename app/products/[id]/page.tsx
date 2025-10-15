import { fetchSingleProduct } from '@/lib/services/productService';
import ProductDetail from '@/ui/components/ProductDetail';
import React from 'react';

interface IParams {
  params: Promise<{ id: string }>;
}

const Page: React.FC<IParams> = async ({ params }) => {
  const { id } = await params;
  const singleProduct = await fetchSingleProduct(id);

  if (!singleProduct) return null;

  return <ProductDetail product={singleProduct} />;
};

export default Page;
