import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useRouter } from "next/router"
import { httpEntry } from "@/services/axios.service"
import { Avatar, Group, UnstyledButton, List, Divider, Popover, Skeleton } from "@mantine/core"
import Link from "next/link"
import { FiHeart, FiMessageCircle, FiShare, FiMoreHorizontal } from "react-icons/fi"
import { showError } from "@/services/notification.service"
import { useEffect, useState } from "react"
import { capitalizeFirst } from "@/services/utils.service"

export default function ArtWorkDetails() {

    const router = useRouter()
    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState("")
    const [moreWorks, setMoreWorks] = useState([])

    const fetchArtWorkDetails = async () => {
        setLoading(true)
        try {
            const response = await httpEntry.get(`/art/get/${router.query.slug}`)
            const result = response.data.data
            setSelectedImage(result.images[0])
            setDetails(result)
            const responseTwo = await httpEntry.get(`/art/user/${result.author.slug}?limit=4`)
            const results = responseTwo.data.data.results
            setMoreWorks(results.filter(item => item.slug != result.slug))
        } catch (error) {
            showError(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchArtWorkDetails()
    }, [router.query.slug])
    
    return (
        <>
            <Navbar />

            <div className="my-10 min-h-[100vh]">
                <div className="lg:w-[60%] w-[90%] mx-auto">
                    {
                        details != null && !loading && (
                            <>
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <Group>
                                            <Avatar size="lg" radius={100} />
                                            <div>
                                                <p className="font-semibold">{ details.author.username } - <span className="italic"> { details.title } </span></p>
                                                <Link href="/" className="text-[14px] text-black no-underline hover:underline">{ `${capitalizeFirst(details.author.firstname)} ${capitalizeFirst(details.author.lastname)}` }</Link>
                                            </div>
                                        </Group>
                                    </div>
                                    
                                    <div>
                                        <Popover width={200} position="left" withArrow shadow="md">
                                            <Popover.Target>
                                                <UnstyledButton className="lg:hidden md:hidden hover:bg-gray-100 flex justify-center items-center p-2 rounded-full"><FiMoreHorizontal size={20} /></UnstyledButton>
                                            </Popover.Target>
                                            <Popover.Dropdown>
                                                <Group>
                                                    <UnstyledButton className="hover:bg-gray-100 flex justify-center items-center p-2 rounded-full"><FiHeart size={20} /></UnstyledButton>
                                                    <UnstyledButton className="hover:bg-gray-100 flex justify-center items-center p-2 rounded-full"><FiMessageCircle size={20} /></UnstyledButton>
                                                    <UnstyledButton className="hover:bg-gray-100 flex justify-center items-center p-2 rounded-full"><FiShare size={20} /></UnstyledButton>
                                                </Group>
                                            </Popover.Dropdown>
                                        </Popover>
                                    </div>

                                    <div className="lg:block md:block hidden">
                                        <Group>
                                            <UnstyledButton className="hover:bg-gray-100 flex justify-center items-center p-2 rounded-full"><FiHeart size={20} /></UnstyledButton>
                                            <UnstyledButton className="hover:bg-gray-100 flex justify-center items-center p-2 rounded-full"><FiMessageCircle size={20} /></UnstyledButton>
                                            <UnstyledButton className="hover:bg-gray-100 flex justify-center items-center p-2 rounded-full"><FiShare size={20} /></UnstyledButton>
                                        </Group>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div>
                                        <img className="w-full h-[400px] rounded-lg object-cover" src={selectedImage} />
                                    </div>
                                    <div className="overflow-x-auto scrollbar-hide">
                                        <div className="flex gap-2 mt-2">
                                            {
                                                details.images.map(item => (
                                                    <div>
                                                        <UnstyledButton className="rounded-lg" style={{ border: selectedImage == item ? '2px solid #fcba03' : '2px solid transparent'  }} onClick={() => setSelectedImage(item)} key={item}>
                                                            <img src={item} className="h-[70px] w-[90px] rounded-lg object-cover" />
                                                        </UnstyledButton>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h2 className="font-semibold mb-2">Description</h2>
                                    <p>{ details.description }</p>
                                </div>
                                <div className="mt-6">
                                    <h2 className="font-semibold mb-2">Specifications</h2>
                                    <div>
                                        <List>
                                            {
                                                details.specifications.map((item, index) => (
                                                    <List.Item key={index}>{ item }</List.Item>
                                                ))
                                            }
                                        </List>
                                    </div>
                                </div>
                                {
                                    moreWorks.length >= 1 && (
                                        <>
                                            <Divider variant="dashed" className="my-10" />
                                            <div>
                                                <h4 className="font-semibold mb-3">More by { details.author.username }</h4>
                                                <div className="overflow-x-auto scrollbar-hide">
                                                    <div className="flex gap-3">
                                                        {
                                                            moreWorks.map(item => (
                                                                <div>
                                                                    <div>
                                                                        <Link href={`/gallery/${item.slug}`} key={item.id}>
                                                                            <img src={item.images[0]} className="bg-gray-300 h-[180px] w-[220px] rounded-md object-cover" />
                                                                        </Link>
                                                                    </div>
                                                                    <p><Link className="no-underline hover:underline text-black text-[14px]" href={`/gallery/${item.slug}`}>{ capitalizeFirst(item.title) }</Link></p>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                    {
                        loading && (
                            <>
                                <div>
                                    <Group>
                                        <Skeleton circle height={60} />
                                        <div className="w-[40%]">
                                            <Skeleton height={8} radius="xl" />
                                            <Skeleton mt={4} width="60%" height={8} radius="xl" />
                                        </div>
                                    </Group>
                                </div>
                                <div className="mt-4">
                                    <Skeleton radius={8} height={400} />
                                </div>
                                <div className="mt-6">
                                    <Skeleton mb={4} height={8} radius="xl" />
                                    <Skeleton mb={4} width="90%" height={8} radius="xl" />
                                    <Skeleton mb={4} width="80%" height={8} radius="xl" />
                                    <Skeleton mb={4} width="70%" height={8} radius="xl" />
                                    <Skeleton mb={4} width="60%" height={8} radius="xl" />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

            <Footer />
        </>
    )

}