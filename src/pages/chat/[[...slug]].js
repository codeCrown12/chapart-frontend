import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button, UnstyledButton } from "@mantine/core"
import { FiMessageCircle, FiEdit } from "react-icons/fi"
import { useState } from "react"
import RoomList from "@/components/chat/RoomList"
import MessageRoom from "@/components/chat/MessageRoom"
import { useRouter } from "next/router"

export default function Chat() {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const router = useRouter()

    return (
        <>
            <Navbar />

            <div style={{ border: '1px solid #dee2e6' }} className="rounded-lg w-[90%] mx-auto my-5 h-[80vh] flex">
                
                <div style={{ borderRight: '1px solid #dee2e6' }} className="h-full w-[30%]">
                    <div className="h-[10%] flex justify-between items-center px-3">
                        <p className="font-semibold">Messages</p>
                        <UnstyledButton className="hover:bg-gray-50 flex items-center p-2 rounded-full">
                            <FiEdit size={20}/>
                        </UnstyledButton>
                    </div>
                    <div className="h-[90%] overflow-y-auto">
                        <RoomList />
                    </div>
                </div>

                {
                    router.query.slug ? (
                        <MessageRoom />
                    ) : (
                        <div className="w-[70%] h-full flex flex-col justify-center items-center">
                            <div className="h-[100px] w-[100px] flex justify-center items-center rounded-full bg-gray-800">
                                <FiMessageCircle size={40} color="white" />
                            </div>
                            <p className="text-[20px] font-semibold mt-2">Your Messages</p>
                            <p className="text-gray-500 text-[14px]">Send private messages to your art buddies</p>
                            <Button size="sm" className="mt-2">Send Message</Button>
                        </div>
                    )
                }
                
            </div>

            <Footer />
        </>
    )
}