import { UnstyledButton, Group, Avatar, Loader } from "@mantine/core"
import { FiMoreHorizontal, FiSend, FiSmile } from "react-icons/fi"
import { useState, useEffect } from "react"
import { http } from "@/services/axios.service"
import { showError } from "@/services/notification.service"
import { useRouter } from "next/router"
import { useSelector } from 'react-redux'
import { capitalizeFirst } from "@/services/utils.service"


export default function MessageRoom() {

    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState({ list: [], cursor: null, limit: 50 })
    const [otherUser, setOtherUser] = useState(null)
    const router = useRouter()
    const user = useSelector((state) => state.auth.userData)
    const [message, setMessage] = useState("")

    const fetchMessages = async () => {
        setLoading(true)
        try {
            const response = await http.get(`/chat/message/room/${router.query.slug[0]}${messages.cursor ? `?cursor=${messages.cursor}` : ''}`)
            setMessages({
                ...messages,
                list: response.data.data.results,
                limit: response.data.data.limit,
                cursor: response.data.cursor
            })
            setOtherUser(Array.from(response.data.data.room.users).filter(member => {
                return member.id != user.id
            })[0])
        } catch (error) {
            showError(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(router.query.slug) {
            fetchMessages()
        }
    }, [router.query.slug])

    const handleSendMessage = async() => {
        try {
            const payload = {
                message,
                room_id: router.query.slug[0]
            }
            const response = await http.post('/chat/message/send', payload)
            console.log(response.data)
            setMessage("")
        } catch (error) {
            showError(error.message)
        }
    }

    return (
        <>
            <div className="h-full w-[70%]">
                {
                    loading ? (
                        <div className="h-full w-full flex justify-center items-center">
                            <Loader size="sm" variant="bars" />
                        </div>
                    ) : (
                        <>
                            {
                                otherUser && (
                                    <div style={{ borderBottom: '1px solid #dee2e6' }} className="h-[12%] w-full flex items-center justify-between px-3">
                                        <UnstyledButton>
                                            <Group spacing={8}>
                                                <Avatar src={otherUser.profile_image} radius={100} size={40} color="yellow" />
                                                <div>
                                                    <p className="text-[14px] font-semibold">{ `${capitalizeFirst(otherUser.firstname)} ${capitalizeFirst(otherUser.lastname)}` }</p>
                                                    <p><small className="text-[11px] text-gray-400">({ capitalizeFirst(otherUser.username) })</small></p>
                                                </div>
                                            </Group>
                                        </UnstyledButton>
                                        <UnstyledButton className="hover:bg-gray-100 flex items-center p-2 rounded-full">
                                            <FiMoreHorizontal size={20} />
                                        </UnstyledButton>
                                    </div>
                                )
                            }

                            {
                                <div className="h-[76%] w-full p-5 overflow-y-auto">
                                    {
                                        messages.list.map(message => (
                                            <div key={message.id}>
                                                {
                                                    message.sender_id != user.slug ? (
                                                        <div className="flex gap-2 mb-4">
                                                            <div className="bg-gray-100 max-w-[80%] text-black w-fit p-3 mt-2 rounded-tr-md rounded-b-md text-[13px]">
                                                                <p>{ message.message }</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex justify-end mb-4">
                                                            <div className="bg-slate-700 max-w-[80%] text-white w-fit p-3 mt-2 rounded-bl-xl rounded-t-xl text-[13px]">
                                                                <p>{ message.message }</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            }

                            <div style={{ borderTop: '1px solid #dee2e6' }} className="h-[12%] rounded-br-lg px-3 flex items-center">
                                <div className="w-full flex px-3 py-[8px] justify-between rounded-full" style={{ border: '1px solid #dee2e6' }}>
                                    <div>
                                        <UnstyledButton className="flex items-center">
                                            <FiSmile size={20} />
                                        </UnstyledButton>
                                    </div>
                                    <input value={message} onChange={(e) => setMessage(e.target.value)} style={{ border: '0' }} placeholder="Message..." className="w-[90%] focus:outline-none text-[14px]" />
                                    <UnstyledButton onClick={handleSendMessage} className="flex items-center">
                                        <FiSend size={20} />
                                    </UnstyledButton>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}