import { useState, useEffect } from "react"
import { UnstyledButton, Avatar, Loader, Text } from "@mantine/core"
import { http } from "@/services/axios.service"
import { showError } from "@/services/notification.service"
import { useSelector } from 'react-redux'
import { capitalizeFirst } from "@/services/utils.service"
import Link from "next/link"
import { useRouter } from "next/router"


function RoomListItem({ details }) {

    const user = useSelector((state) => state.auth.userData)
    const otherUser = Array.from(details.users).filter(member => {
        return member.id != user.id
    })[0]
    const router = useRouter()

    return (
        <>
            <UnstyledButton component={Link} href={`/chat/${details.slug}`} className={`p-3 block w-full ${router.query.slug && router.query.slug[0] == details.slug ? 'bg-gray-100 hover:bg-gray-100' : 'hover:bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                    <Avatar src={otherUser.profile_image} radius={100} size={45} color="yellow" />
                    <div>
                        <p><span className="text-[14px] font-semibold">{ `${capitalizeFirst(otherUser.firstname)} ${capitalizeFirst(otherUser.lastname)}` }</span><small className="text-[11px] text-gray-400 ml-[3px]">({ capitalizeFirst(otherUser.username) })</small></p>
                        <div className="w-[90%]">
                            <Text truncate className="text-[12px] text-gray-600">{ details.messages[0].message }</Text>
                        </div>
                    </div>
                </div>
            </UnstyledButton>
        </>
    )
}


export default function RoomList() {

    const [rooms, setRooms] = useState({ list: [], cursor: null, limit: 50 })
    const [loading, setLoading] = useState(false)

    const fetchRooms = async () => {
        setLoading(true)
        try {
            const response = await http.get(`/chat/room/get${rooms.cursor ? `?cursor=${rooms.cursor}` : ''}`)
            setRooms({
                ...rooms,
                list: response.data.data.results,
                limit: response.data.data.limit,
                cursor: response.data.cursor
            })
        } catch (error) {
            showError(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRooms()
    }, [])

    return (
        <>
            {
                loading && (
                    <div className="h-full flex justify-center items-center">
                        <Loader size="sm" variant="bars" />
                    </div>
                )
            }
            {
                rooms.list.map(room => (
                    <RoomListItem key={room.id} details={room} />
                ))
            }
            {
                rooms.cursor && (
                    <UnstyledButton className="p-3 w-full text-center text-[13px] text-gray-500 font-semibold hover:bg-gray-100 rounded-bl-lg">
                        Load more conversations 
                    </UnstyledButton>
                )
            }
        </>
    )

}