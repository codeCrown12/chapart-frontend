import Link from "next/link"
import { FiSettings, FiMenu, FiX, FiGrid, FiSun, FiPower, FiStar, FiUploadCloud } from "react-icons/fi"
import { Avatar, Button, Menu } from "@mantine/core"
import { useState } from "react"
import { useSelector } from "react-redux"
import ProfileImg from "../images/profile-img.png"
import { useDispatch } from "react-redux"
import { logoutUser } from "@/store/slices/authSlice"
import { useRouter } from "next/router"

export default function Navbar () {

    const [showMenu, setShowMenu] = useState(false)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    
    const toggleMenu = (value) => {
        setShowMenu(value)
    }

    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogOut = () => {
        dispatch(logoutUser())
        router.push('/auth/login')
    }

    return (
        <>
            <div className="flex justify-between items-center py-4 px-8 sticky top-0 bg-white/90 backdrop-blur-3xl z-10">
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
                                    <li className="cursor-pointer mr-4">
                                        <Menu trigger="hover" withArrow shadow="md" width={200}>
                                            <Menu.Target>
                                                <Avatar color="green" radius={"xl"} size={40} src={ProfileImg} alt="profile image" />
                                            </Menu.Target>

                                            <Menu.Dropdown>
                                                <Menu.Item component={Link} href="/my/work" icon={<FiGrid size={14} />} >My work</Menu.Item>
                                                <Menu.Item icon={<FiSun size={14} />}>Exhibit</Menu.Item>
                                                <Menu.Item icon={<FiStar size={14} />}>Favorites</Menu.Item>
                                                <Menu.Item icon={<FiSettings size={14} />}>Account settings</Menu.Item>
                                                <Menu.Item onClick={handleLogOut} icon={<FiPower size={14} />}>Logout</Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </li>
                                    <li>
                                        <Button size="xs" rightIcon={<FiUploadCloud size={14} />} variant="filled">UPLOAD</Button>
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