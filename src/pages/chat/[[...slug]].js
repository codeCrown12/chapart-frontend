import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button, UnstyledButton } from "@mantine/core"
import { FiMessageCircle, FiEdit } from "react-icons/fi"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import RoomList from "@/components/chat/RoomList"
import MessageRoom from "@/components/chat/MessageRoom"
import { useRouter } from "next/router"
import { io } from "socket.io-client"

export default function Chat() {

    const router = useRouter()
    const user = useSelector((state) => state.auth.userData)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const socket = useRef()

    useEffect(() => {
        if(isLoggedIn) {
            socket.current = io('http://localhost:3000')
            socket.current.emit("add-user", user.id)
        }
    }, [])

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
                        <RoomList socket={socket} />
                    </div>
                </div>

                {
                    router.query.slug ? (
                        <MessageRoom socket={socket} />
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