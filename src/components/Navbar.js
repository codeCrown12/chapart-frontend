import Link from "next/link"
import { FiShoppingCart } from "react-icons/fi"
import { Avatar, Button } from "@mantine/core"

export default function Navbar () {
    return (
        <>
            <div className="flex justify-between items-center py-3 px-6">
                <div>
                    <h4>CHAPART</h4>
                </div>
                <div>
                    <ul className="flex items-center list-none text-[12px] font-semibold">
                        <li className="mr-4">
                            <Link href="/" className="text-black no-underline">HOME</Link>
                        </li>
                        <li className="mr-4">
                            <Link href="/" className="text-black no-underline">SHOP</Link>
                        </li>
                        <li className="mr-4">
                            <Link href="/" className="text-black no-underline">ABOUT</Link>
                        </li>
                        <li className="mr-4">
                            <Link href="/" className="text-black no-underline">CONTACT</Link>
                        </li>
                        <li className="mr-2">
                            <Button size="xs" variant="default">SIGN IN</Button>
                        </li>
                        <li>
                            <Button size="xs" variant="filled">CREATE ACCOUNT</Button>
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
            </div>
        </>
    )
}