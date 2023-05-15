import Link from "next/link"
import { FiShoppingCart, FiMenu, FiX, FiUploadCloud, FiLayers, FiSettings, FiPower, FiStar } from "react-icons/fi"
import { Avatar, Button, Menu } from "@mantine/core"
import { useState } from "react"
import { useSelector } from "react-redux"

export default function Navbar () {

    const [showMenu, setShowMenu] = useState(false)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    
    const toggleMenu = (value) => {
        setShowMenu(value)
    }

    return (
        <>
            <div className="flex justify-between items-center py-[10px] px-8 sticky top-0 bg-white/90 backdrop-blur-3xl z-10">
                <div>
                    <h4>PIXHIBIT</h4>
                </div>
                <div className="lg:block md:block hidden">
                    <ul className="flex items-center list-none text-[12px] font-semibold">
                        <li className="mr-4">
                            <Link href="/" className="text-black no-underline">HOME</Link>
                        </li>
                        <li className="mr-4">
                            <Link href="/gallery" className="text-black no-underline">GALLERY</Link>
                        </li>
                        <li className="mr-4">
                            <Link href="/" className="text-black no-underline">SPOTLIGHT</Link>
                        </li>
                        {
                            isLoggedIn ? (
                                <>
                                    <li className="mr-4">
                                        <Link href="/" className="text-black no-underline">
                                            <div className="flex items-center"><FiShoppingCart size={18} /></div>
                                        </Link>
                                    </li>
                                    <li className="cursor-pointer">
                                        <Menu withArrow shadow="md" width={200}>
                                            <Menu.Target>
                                                <Avatar color="green" radius={"xl"} size={30} src={`https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80`} alt="no image here" />
                                            </Menu.Target>

                                            <Menu.Dropdown>
                                                <Menu.Item icon={<FiUploadCloud size={14} />} >Upload art✨</Menu.Item>
                                                <Menu.Item icon={<FiLayers size={14} />}>My art</Menu.Item>
                                                <Menu.Item icon={<FiStar size={14} />}>Favorites</Menu.Item>
                                                <Menu.Item icon={<FiSettings size={14} />}>Settings</Menu.Item>
                                                <Menu.Item icon={<FiPower size={14} />}>Logout</Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="mr-2">
                                        <Link href="/auth/login">
                                            <Button href="/auth/login" size="xs" variant="default">SIGN IN</Button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/auth/signup">
                                            <Button size="xs" variant="filled">GET STARTED</Button>
                                        </Link>
                                    </li>
                                </>
                            )}
                    </ul>
                </div>
                <div className="lg:hidden md:hidden block">
                    <div>
                        <span onClick={() => toggleMenu(true)} className="cursor-pointer"><FiMenu className="text-[20px]" /></span>
                    </div>
                </div>
            </div>

            <div className={`${showMenu ? "show-menu" : "hide-menu"} h-[100vh] ease-in-out flex flex-col transition-all duration-300 w-full fixed top-0 left-0 bg-white z-20`}>
                <div className="flex justify-between items-center py-3 px-6">
                    <div>
                        <h4>PIXHIBIT</h4>
                    </div>
                    <div>
                        <span onClick={() => toggleMenu(false)} className="cursor-pointer">
                            <FiX className="text-[20px]" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}