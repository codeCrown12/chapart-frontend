import Link from "next/link"
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi"
import { Avatar, Button } from "@mantine/core"
import { useState } from "react"

export default function Navbar () {

    const [showMenu, setShowMenu] = useState(false)
    
    const toggleMenu = (value) => {
        setShowMenu(value)
    }

    return (
        <>
            <div className="flex justify-between items-center py-4 px-8 sticky top-0 bg-white z-10">
                <div>
                    <h4>PIXHIBIT</h4>
                </div>
                <div className="lg:block md:block hidden">
                    <ul className="flex items-center list-none text-[12px] font-semibold">
                        <li className="mr-4">
                            <Link href="/" className="text-black no-underline">HOME</Link>
                        </li>
                        <li className="mr-4">
                            <Link href="/shop" className="text-black no-underline">SHOP</Link>
                        </li>
                        <li className="mr-4">
                            <Link href="/" className="text-black no-underline">ABOUT</Link>
                        </li>
                        <li className="mr-4">
                            <Link href="/" className="text-black no-underline">SPOTLIGHT</Link>
                        </li>
                        <li className="mr-4">
                            <Link href="/" className="text-black no-underline">CONTACT</Link>
                        </li>
                        <li className="mr-2">
                            <Link href="/auth/login">
                                <Button href="/auth/login" size="xs" variant="default">SIGN IN</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/auth/signup">
                                <Button size="xs" variant="filled">CREATE ACCOUNT</Button>
                            </Link>
                        </li>
                        {/* <li className="mr-4">
                            <Link href="/" className="text-black no-underline">
                                <div className="text-[16px] flex items-center"><FiShoppingCart/></div>
                            </Link>
                        </li>
                        <li className="">
                            <Link href="/" className="text-black no-underline">
                                <Avatar color="teal" radius={"xl"} size={"sm"} src={null} alt="no image here" />
                            </Link>
                        </li> */}
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