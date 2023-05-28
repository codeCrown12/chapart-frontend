import Navbar from '../../components/Navbar'
import Footer from '@/components/Footer'
import { TextInput, SegmentedControl, Loader } from '@mantine/core'
import ArtWork from '@/components/gallery/Artwork'
import { httpEntry } from '@/services/axios.service'
import { useEffect, useState } from 'react'
import { parseError } from '@/services/notification.service'
import Image from 'next/image'
import Empty from '../../images/no-data.svg'
import { FiSearch } from 'react-icons/fi'
import { capitalizeFirst } from '@/services/utils.service'
import { Oval } from 'react-loader-spinner'

export const getServerSideProps = async () => {
    const response = await httpEntry.get('/art/categories')
    const categories = response.data.data.results
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

    const getArtWorks = () => {
        setLoading(true)
        httpEntry.get(`/art/get?category=${category}&search=${search}`).then(response => {
            const results = response.data.data.results
            const mappedResults = results.map(artWork => <ArtWork art_data={artWork} key={artWork.slug} />)
            setArtWorks(mappedResults)
        }).catch(error => {
            parseError(error)
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        getArtWorks()
    }, [search, category])

    const DisplayArtWorks = () => {
        if (artWorks.length >= 1) {
            return (
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-5">
                    { artWorks }
                </div>
            )
        }
        else return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div>
                    <div><Image src={Empty} className="w-[130px] h-[130px]" /></div>
                    <p className="text-center mt-3"><strong>{ `"${search}"` }</strong> Not found.</p>
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
                        <div className="mr-2">
                            <SegmentedControl
                                value={category}
                                onChange={setCategory}
                                data={[{ label: "All", value: "" }, ...mappedCategories]}
                            />
                        </div>
                        <div className="w-[30%]">
                            <TextInput
                                type="search"
                                size="md"
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
                                <div className="flex justify-center items-center min-h-[300px]">
                                    <Oval 
                                        color="#000"
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