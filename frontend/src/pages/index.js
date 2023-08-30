import Image from 'next/image'
import { Inter } from 'next/font/google'
import BannerSlider from "@/components/home/BannerSlider";

import AdvertisementImg from "@/components/home/AdvertisementImg";
import HomeSection from "@/components/home/HomeSection";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      // className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >

      {/* Banner Slider START */}
      <div className="h-auto w-full">
        <BannerSlider />
      </div>
      {/* Banner Slider END */}
      <AdvertisementImg /> {/* AdvertisementImg Marquee */}
      <HomeSection />

    </main>
  )
}
