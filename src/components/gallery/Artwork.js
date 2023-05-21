import { BsFillHeartFill } from 'react-icons/bs'
import { capitalizeFirst } from '@/services/utils.service'
import Link from 'next/link'

export default function ArtWork({ art_data }) {

    const red = "#FF0000"
    const white = "#FFF"

    return (
        <>
            <div>
                <div className="relative">
                    <div>
                        <img alt="art image" className="w-full max-h-[280px] object-cover" src={art_data.images[0]} />
                    </div>
                    <div className="absolute top-0 right-0 left-0 bottom-0 p-2 flex justify-end">
                        <div><BsFillHeartFill className="cursor-pointer" color={white} size={25} /></div>
                    </div>
                </div>
                <div className="mt-2 p-1">
                    <p><strong><Link className="no-underline hover:underline text-black" href="/gallery">{ capitalizeFirst(art_data.title) }</Link></strong></p>
                    <p>
                        <Link href="/gallery" className="text-[14px] text-black no-underline hover:underline">{ capitalizeFirst(`${art_data.author.firstname} ${art_data.author.lastname}`) }</Link>
                    </p>
                </div>
            </div>
        </>
    )
}