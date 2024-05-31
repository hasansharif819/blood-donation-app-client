import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import Stats from "@/components/UI/HomePage/Stats/Stats";
import TopDonors from "@/components/UI/HomePage/TopDonors/TopDonors";
import SuccessStories from "@/components/UI/HomePage/SuccessHistory/SuccessHistory";
import FilteringDonors from "@/components/UI/HomePage/FilteringDonors/FilteringDonors";
import DonationTips from "@/components/UI/HomePage/DonationTips/DonationTips";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FilteringDonors />
      <TopDonors />
      <SuccessStories />
      <DonationTips />
      <Stats />
    </>
  );
};

export default HomePage;
