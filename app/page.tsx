import BannerSlider from "@/app/components/BannerSlider";
import Section from "@/app/components/Section";
import SectionCard from "@/app/components/SectionCard";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <BannerSlider />
      <Section />
      <SectionCard />
    </main>
  );
}
