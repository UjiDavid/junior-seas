import FeedCarousel from '@/ui/FeedCarousel';
import GoogleReviews from '@/ui/GoogleReviews';
import HeroCarousel from '@/ui/HeroCarousel';
import Highlights from '@/ui/highlights/Highlights';
import Perks from '@/ui/Perks';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Perks />
      <Highlights />
      <FeedCarousel />
      <GoogleReviews />
    </>
  );
}
