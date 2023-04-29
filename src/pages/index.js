import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button, Divider } from "@mantine/core"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import Image from "next/image"
import "swiper/css"
import "swiper/css/navigation"
import bannerImg from "../images/banner-img.png"
import flagImg from "../images/flag.png"


export default function Home() {
  const categoriesList = [0,1,2,3,4,5,6,7,8,9,10,11],
  categoriesItems = categoriesList.map(item => 
    <SwiperSlide tag="div" key={item}>
      <div className="bg-gray-300 h-[200px]"></div>
      <div className="text-center mt-2 text-[14px] font-semibold"><p>Category</p></div>
    </SwiperSlide>
  ),
  artistsList = [0,1,2,3,4,5],
  artistsItems = artistsList.map(artist => 
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
        <div className="grid grid-cols-2 gap-20 h-[600px] items-center">
          <div className="overflow-y-hidden h-full">
            <Image className="h-full w-full object-cover" src={bannerImg}/>
          </div>
          <div className="lg:pr-10">
            <div className="flex items-center">
              <div className="mr-4"><Image className="h-[60px] w-[60px]" src={flagImg} /></div>
              <div className="flex items-center"><p>Based in Nigeria</p> <div className="w-[100px] h-[2px] bg-black ml-2"></div> </div>
            </div>
            <div className="my-8"><h1 className="text-[5em] leading-[6rem]">Buy/Sell Beautiful Art.</h1></div>
            <div>
              <p>Lorem ipsum dolor strud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-20">
        <div className="w-[90%] mx-auto">
          <div className="mb-6">
            <h2 className="font-semibold text-center">ART CATEGORIES</h2>
            <Divider my="xs" label="Currently supported art categories" className="italic" labelPosition="center" />
          </div>
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              400:{
                slidesPerView:2,
              },
              639: {
                slidesPerView: 3,
              },
              865:{
                slidesPerView:4
              },
              1000:{
                slidesPerView:5
              },
              1500:{
                slidesPerView:6
              },
              1700:{
                slidesPerView:7
              }
            }}
            modules={[Navigation]}
            navigation
            slidesPerView={5}
            spaceBetween={10}
            className="myswiper">
            { categoriesItems }
          </Swiper>
        </div>
      </section>

      <section className="my-20">
        <div className="w-[90%] mx-auto">
          <div className="mb-6">
            <h2 className="font-semibold text-center">TRENDING ARTWORKS</h2>
            <Divider my="xs" label="The artworks our users love the most" className="italic" labelPosition="center" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-300 h-[300px]"></div>
            <div className="bg-gray-300 h-[300px]"></div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="bg-gray-300 h-[300px]"></div>
            <div className="bg-gray-300 h-[300px]"></div>
            <div className="bg-gray-300 h-[300px]"></div>
          </div>
          <div className="flex justify-center mt-5">
            <Button size="sm" variant="default">View All Products</Button>
          </div>
        </div>
      </section>

      <section className="my-20">
        <div className="w-[90%] mx-auto">
          <div className="mb-6">
            <h2 className="font-semibold text-center">MEET THE ARTISTS</h2>
            <Divider my="xs" label="The real show runners" className="italic" labelPosition="center" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            { artistsItems }
          </div>
          <div className="flex justify-center mt-5">
            <Button size="sm" variant="default">View All artists</Button>
          </div>
        </div>
      </section>

      <Footer/>

    </>
  )
}
