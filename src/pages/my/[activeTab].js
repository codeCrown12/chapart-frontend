import { useState } from "react"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { Avatar, Button, Tabs } from "@mantine/core"
import { useRouter } from "next/router"
import ProfileImg from "../../images/profile-img.png"

export default function My() {

    const [showMenu, setShowMenu] = useState(true)
    const router = useRouter()

    return (
        <>
            <Navbar/>

            <div className="w-[80%] mx-auto my-10 min-h-[100vh]">
                <div className="flex justify-center items-center">
                    <div>
                        <Avatar color="green" radius={100} size={120} src={ProfileImg} alt="no image here" />
                    </div>
                    <div className="ml-6">
                        <div className="flex items-center">
                            <div className="mr-4"><h2>Marc Spectar</h2></div>
                            <div><Button size="sm" variant="default">Edit profile</Button></div>
                        </div>
                        <div>
                            <p>Lagos</p>
                        </div>
                        <div className="mt-[4px]">
                            <p><span className="mr-4"><strong>10</strong> Posts</span><span className="mr-4"><strong>1M</strong> Followers</span><span className="mr-4"><strong>1M</strong> Following</span></p>
                        </div>
                    </div>
                </div>

                <div className="my-10">
                    <Tabs
                    value={router.query.activeTab}
                    onTabChange={(value) => router.push(`/my/${value}`)}
                    >
                        <Tabs.List>
                            <Tabs.Tab value="work">Work</Tabs.Tab>
                            <Tabs.Tab value="exhibit">Exhibit</Tabs.Tab>
                            <Tabs.Tab value="favorites">Favorites</Tabs.Tab>
                            <Tabs.Tab value="about">About</Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </div>
            </div>

            <Footer/>
        </>
    )

}