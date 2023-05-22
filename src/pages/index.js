import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Image from "next/image"
import "swiper/css"
import "swiper/css/navigation"
import bannerImg from "../images/banner-img.png"
import { Divider, Button } from "@mantine/core"


export default function Home() {
  const artistsList = [0,1,2,3,4,5]
  const artistsItems = artistsList.map(artist => 
    <div key={artist} className="h-[120px] flex" style={{ border: '1px solid #ccc' }}>
      <div className="w-[35%] bg-gray-300"></div>
      <div className="w-[65%] p-4 flex items-center">
        <div>
          <h4>Mike Lambert</h4>
          <p className="text-gray-600 text-[14px] italic">Painter, Lagos</p>
        </div>
      </div>
    </div>
  )

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
                <div className="mt-6"><Button size="md">Discover Art &raquo;</Button></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-20">
        <div className="lg:w-[90%] lg:px-0 px-5 w-full mx-auto">
          <div className="mb-6">
            <h2 className="font-semibold text-center">OUR ARTISTS</h2>
            <Divider my="xs" label="Genius creators" className="italic" labelPosition="center" />
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
            { artistsItems }
          </div>
          <div className="flex justify-center mt-5">
            <Button size="sm" variant="default">View More &raquo;</Button>
          </div>
        </div>
      </section>

      <Footer/>

    </>
  )
}
