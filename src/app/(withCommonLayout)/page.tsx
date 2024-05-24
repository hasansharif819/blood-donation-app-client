import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import HowItWorks from "@/components/UI/HomePage/HowItWorks/HowItWorks";
import Stats from "@/components/UI/HomePage/Stats/Stats";
import WhyUs from "@/components/UI/HomePage/WhyUs/WhyUs";
import TopDonors from "@/components/UI/HomePage/TopDonors/TopDonors";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TopDonors />
      {/* <Specialist /> */}
      {/* <TopRatedDoctors /> */}
      <WhyUs />
      <HowItWorks />
      <Stats />
    </>
  );
};

export default HomePage;
