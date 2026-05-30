import HeroBanner from "@/components/home/HeroBanner";
import MkuBanner from "@/components/home/MkuBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <MkuBanner />
      <CategoryGrid />
      <FeaturedProducts />
    </>
  );
}
