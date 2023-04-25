import Navbar from "../components/Navbar"
import { Button, Divider } from "@mantine/core"

export default function Home() {
  const categoriesList = [0,1,2,3,4,5],
  categoriesItems = categoriesList.map(item => 
    <div>
      <div className="bg-gray-300 h-[200px]"></div>
      <div className="text-center mt-2 text-[14px] font-semibold"><p>Category</p></div>
    </div>
  ),
  artistsList = [0,1,2,3,4,5],
  artistsItems = artistsList.map(artist => 
    <div className="h-[120px] flex" style={{ border: '1px solid #ccc' }}>
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
        <div className="h-[500px] bg-gray-300"></div>
      </section>

      <section className="my-10">
        <div className="w-[90%] mx-auto">
          <div className="text-center text-gray-600">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className="mb-5 mt-10">
            <h2 className="font-semibold text-center">ART CATEGORIES</h2>
            <Divider my="xs" label="The art categories we support" className="italic" labelPosition="center" />
          </div>
          <div className="grid grid-cols-6 gap-3 mt-5">
            { categoriesItems }
          </div>
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

    </>
  )
}
