import { BsFillHeartFill } from 'react-icons/bs'
import { capitalizeFirst } from '@/services/utils.service'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { http } from '@/services/axios.service'
import { parseError, showInfo, showSuccess } from '@/services/notification.service'
import { updateUser } from '@/store/slices/authSlice'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ArtWork({ art_data }) {

    const red = "#FF0000"
    const black = "#000"
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const user = useSelector((state) => state.auth.userData)
    const [color, setColor] = useState(black)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if(isLoggedIn) {
            if(user.bookmarks.includes(art_data.slug)) {
                setColor(red)
            }
        }
    }, [])

    const toggleFavoritesAction = () => {
        if(isLoggedIn) {
            if(user.bookmarks.includes(art_data.slug)) {
                setColor(black)
                http.patch('/user/remove_art_from_bookmarks', { id: art_data.slug }).then(response => {
                    dispatch(updateUser({
                        userData: response.data.data.user
                    }))
                    showSuccess('Art removed from favorites!')
                }).catch(error => {
                    parseError(error)
                })
            }
            else {
                setColor(red)
                http.patch('/user/add_art_to_bookmarks', { id: art_data.slug }).then(response => {
                    dispatch(updateUser({
                        userData: response.data.data.user
                    }))
                    showSuccess('Art added to favorites!')
                }).catch(error => {
                    parseError(error)
                })
            }
        }
        else {
            showInfo("Please login to perform action.")
            router.push("/auth/login")
        }
    }

    return (
        <>
            <div>
                <div className="relative">
                    <div>
                        <img alt="art image" className="w-full h-[280px] object-cover" src={art_data.images[0]} />
                    </div>
                    <div className="absolute top-0 right-0 left-0 bottom-0 p-2 flex justify-end">
                        <div onClick={toggleFavoritesAction} className="bg-white rounded-full h-[32px] w-[32px] flex justify-center items-center cursor-pointer">
                            <BsFillHeartFill className="block" color={color} size={20} />
                        </div>
                    </div>
                </div>
                <div className="mt-1 p-1">
                    <p><strong><Link className="no-underline hover:underline text-black" href="/gallery">{ capitalizeFirst(art_data.title) }</Link></strong></p>
                    <p>
                        <Link href="/gallery" className="text-[14px] text-black no-underline hover:underline">{ capitalizeFirst(`${art_data.author.firstname} ${art_data.author.lastname}`) }</Link>
                    </p>
                </div>
            </div>
        </>
    )
}