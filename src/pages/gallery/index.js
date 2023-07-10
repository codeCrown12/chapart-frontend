import Navbar from '../../components/Navbar'
import Footer from '@/components/Footer'
import { TextInput, Select } from '@mantine/core'
import ArtWork from '@/components/gallery/Artwork'
import { httpEntry } from '@/services/axios.service'
import { useEffect, useState } from 'react'
import { showError } from '@/services/notification.service'
import Image from 'next/image'
import Empty from '../../images/no-data.svg'
import { FiSearch } from 'react-icons/fi'
import { capitalizeFirst } from '@/services/utils.service'
import { Oval } from 'react-loader-spinner'

export const getServerSideProps = async () => {
    const response = await httpEntry.get('/art/categories')
    const categories = response.data.data
    return { props: { categories } }
}

export default function Gallery ({ categories }) {

    const mappedCategories = categories.map(category => {
        return { label: `${capitalizeFirst(category.name)}`, value: category.slug }
    })
    const [artWorks, setArtWorks] = useState([])
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(true)

    const getArtWorks = async () => {
        setLoading(true)
        try {
            const response = await httpEntry.get(`/art/get?category=${category}&search=${search}`)
            const results = response.data.data.results
            const mappedResults = results.map(artWork => <ArtWork art_data={artWork} key={artWork.slug} />)
            setArtWorks(mappedResults)
        } catch (error) {
            showError(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getArtWorks()
    }, [search, category])

    const DisplayArtWorks = () => {
        if (artWorks.length >= 1) {
            return (
                <div className="min-h-[100vh]">
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 mt-5">
                        { artWorks }
                    </div>
                </div>
            )
        }
        else return (
            <div className="flex justify-center items-center min-h-[100vh]">
                <div>
                    <div><Image src={Empty} className="w-[130px] h-[130px]" /></div>
                    <p className="text-center mt-3">{ search ? ( <strong>{ `"${search}"` }</strong> ) : "Art Works" } Not found</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <Navbar/>

            <section className="my-10">
                <div className="lg:w-[90%] lg:px-0 px-5 w-full mx-auto">
                    <div className="lg:flex md:flex block items-center justify-between">
                        <div className="lg:w-[30%] md:w-[30%] w-full lg:mb-0 md:mb-0 mb-3">
                            <Select
                                value={category}
                                onChange={setCategory}
                                data={[{ label: "All", value: "" }, ...mappedCategories]}
                            />
                        </div>
                        <div className="lg:w-[30%] md:w-[30%] w-full">
                            <TextInput
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.currentTarget.value)}
                                placeholder="search art title, description..."
                                rightSection={<FiSearch/>}
                            />
                        </div>
                    </div>
                    <div className="mt-10">
                        { 
                            loading ? (
                                <div className="flex justify-center min-h-[100vh]">
                                    <Oval 
                                        color="#fcba03"
                                        secondaryColor="#ccc"
                                    />
                                </div>
                            ) : <DisplayArtWorks />
                        }
                    </div>
                    
                </div>
            </section>

            <Footer />
        </>
    )
}