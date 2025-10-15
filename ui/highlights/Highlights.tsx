'use client';
import ProductHighlightBlock from './ProductHighlightBlock';
import HomeFeatureImgs from './HomeFeatureImgs';

import Container from '../Container';
import { useAllHighlights } from '../../hooks/useHighlights';
import ProductGridSkeleton from '../components/ProductGridSkeleton';

interface HighlightSection {
  type: 'section';
  key: string;
  title: string;
}

interface HighlightImage {
  type: 'image' | 'image2';
}

type HighlightItem = HighlightSection | HighlightImage;

const highlightSections: HighlightItem[] = [
  {
    type: 'section',
    key: 'NEW AT JUNIOR SEAS',
    title: 'New at Junior Seas',
  },
  { type: 'image' },
  {
    type: 'section',
    key: 'POPULAR AT JUNIOR SEAS',
    title: 'Popular at Junior Seas',
  },
  {
    type: 'section',
    key: 'ONLY AT JUNIOR SEAS',
    title: 'Only at Junior Seas',
  },
  { type: 'image2' },
  {
    type: 'section',
    key: 'HOT DEALS AND SALES',
    title: 'Hot Deals & Sales',
  },
];
const Highlights = () => {
  const {
    data: highlights,
    isLoading,
    isError,
  } = useAllHighlights();

  // While top-level fetch is loading show skeletons for the sections
  if (isLoading) {
    return (
      <div className="space-y-10">
        {highlightSections.map((item, i) => {
          if (item.type === 'section') {
            return (
              <div key={item.key ?? i}>
                <h2 className="text-xl md:text-2xl lg:text-3xl md:m-10 font-bold m-5 text-center underline decoration-yellow-500 underline-offset-8">
                  {item.title}.
                </h2>
                <ProductGridSkeleton count={12} />
              </div>
            );
          } else if (item.type === 'image') {
            return (
              <Container key={`image1-${i}`}>
                <div className="flex gap-4 flex-col md:flex-row">
                  <HomeFeatureImgs
                    src="/assets/js-imgs/Google-Pixel-9-Series-768x922.png"
                    className="w-full max-w-l"
                    alt="ANC Earphones"
                  />
                  <HomeFeatureImgs
                    src="/assets/js-imgs/Home-Smart-Watches-768x768.png"
                    className="w-full max-w-l"
                    alt="Home Smart Watch"
                  />
                  <HomeFeatureImgs
                    src="/assets/js-imgs/uk-used-iphones-img.jpeg"
                    className="w-full lg:col-span-2"
                    alt="UK Used iPhones"
                  />
                </div>
              </Container>
            );
          } else {
            // image2
            return (
              <Container key={`image2-${i}`}>
                <div className="flex gap-4 flex-col md:flex-row">
                  <HomeFeatureImgs
                    src="/assets/js-imgs/Explore-ANC-Earphones-768x768.png"
                    className=""
                    alt="appleAccessories"
                  />
                  <HomeFeatureImgs
                    src="/assets/js-imgs/Google-Pixel-9-Series-768x922.png"
                    className=""
                    alt="ANC Earphones"
                  />
                  <HomeFeatureImgs
                    src="/assets/js-imgs/S25-Ultra-Infographic-768x922.jpg"
                    alt="Home Smart Watch"
                  />
                </div>
              </Container>
            );
          }
        })}
      </div>
    );
  }

  if (isError)
    return (
      <div className="text-center text-red-500">
        Failed to load highlights
      </div>
    );

  // Loaded: pass products for each section (use empty array if none)
  return (
    <div className="space-y-10">
      {highlightSections.map((item, index) => {
        if (item.type === 'section') {
          const productsForSection =
            highlights?.[item.key] ?? []; // pass [] when loaded but empty
          return (
            <ProductHighlightBlock
              key={item.key}
              sectionKey={item.key}
              title={item.title ?? 'Default Title'}
              products={productsForSection}
            />
          );
        } else if (item.type === 'image') {
          return (
            <div
              key={`image-${index}`}
              className="flex flex-col justify-center md:flex-row lg:flex-row gap-4 bg-gray-100 p-4 rounded-lg"
            >
              <div className="flex gap-4">
                <HomeFeatureImgs
                  src="/assets/js-imgs/Google-Pixel-9-Series-768x922.png"
                  className="w-full max-w-l"
                  alt="ANC Earphones"
                />
                <HomeFeatureImgs
                  src="/assets/js-imgs/Home-Smart-Watches-768x768.png"
                  className="w-full max-w-l"
                  alt="Home Smart Watch"
                />
              </div>
              <HomeFeatureImgs
                src="/assets/js-imgs/uk-used-iphones-img.jpeg"
                className="w-full lg:col-span-2"
                alt="UK Used iPhones"
              />
            </div>
          );
        } else {
          return (
            <Container key={`image-${index}`}>
              <div className="flex gap-4 flex-col md:flex-row">
                <HomeFeatureImgs
                  src="/assets/js-imgs/Explore-ANC-Earphones-768x768.png"
                  className=""
                  alt="appleAccessories"
                />
                <HomeFeatureImgs
                  src="/assets/js-imgs/Google-Pixel-9-Series-768x922.png"
                  className=""
                  alt="ANC Earphones"
                />
                <HomeFeatureImgs
                  src="/assets/js-imgs/Home-Smart-Watches-768x768.png"
                  alt="Home Smart Watch"
                />
              </div>
            </Container>
          );
        }
      })}
    </div>
  );
};

export default Highlights;
