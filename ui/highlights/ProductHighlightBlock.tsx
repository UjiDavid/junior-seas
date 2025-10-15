import Container from '../Container';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import ProductCard from '../components/ProductCard';
import { Product } from '@/type';

interface Props {
  title: string;
  products?: Product[];
  sectionKey?: string;
}

const ProductHighlightBlock: React.FC<Props> = ({
  title,
  products = [],
  sectionKey,
}) => {
  return (
    <Container>
      <section>
        <h2 className="text-xl md:text-2xl lg:text-3xl md:m-10 font-bold m-5 text-center underline decoration-yellow-500 underline-offset-8">
          {title}.
        </h2>

        {!products.length ? (
          <ProductGridSkeleton count={12} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, idx) => (
              <ProductCard
                key={
                  product._id ??
                  product.id ??
                  `${sectionKey}-${idx}`
                }
                product={product}
                sectionKey={sectionKey}
              />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
};

export default ProductHighlightBlock;
