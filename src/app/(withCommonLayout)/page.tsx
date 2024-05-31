import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import HowItWorks from "@/components/UI/HomePage/HowItWorks/HowItWorks";
import Stats from "@/components/UI/HomePage/Stats/Stats";
import WhyUs from "@/components/UI/HomePage/WhyUs/WhyUs";
import TopDonors from "@/components/UI/HomePage/TopDonors/TopDonors";
import SuccessStories from "@/components/UI/HomePage/SuccessHistory/SuccessHistory";
import FilteringDonors from "@/components/UI/HomePage/HeroSection/FilteringDonors/FilteringDonors";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FilteringDonors />
      <TopDonors />
      <SuccessStories />
      <WhyUs />
      <HowItWorks />
      <Stats />
    </>
  );
};

export default HomePage;
