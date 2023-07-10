import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Image from "next/image"
import "swiper/css"
import "swiper/css/navigation"
import bannerImg from "../images/banner-img.png"
import { Divider, Button } from "@mantine/core"
import Link from "next/link"


export default function Home() {

  return (
    <>

      <Navbar/>

      <section>
        <div className="relative">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 lg:h-[100vh] h-fit overflow-y-auto items-center">
            <div className="overflow-y-hidden h-full bg-gray-50 lg:block hidden">
              <Image alt="banner-image" className="h-full w-full object-contain" src={bannerImg}/>
            </div>
            <div className="px-5 py-10">
              <div className="flex items-center">
                <div className="mr-3"><div className="h-[40px] w-[40px] object-cover bg-gray-800 rounded-full" ></div></div>
                <div className="flex items-center text-[14px]"><p>Art is fun😉</p> <div className="w-[50px] h-[1px] bg-black ml-2"></div> </div>
              </div>
              <div className="my-4"><h1 className="text-[5em] leading-[6rem]">Share your beautiful art.</h1></div>
              <div>
                <p>Aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="mt-6"><Button component={Link} href="/gallery" size="md">Discover Art &raquo;</Button></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-20">
        
      </section>

      <Footer/>

    </>
  )
}
