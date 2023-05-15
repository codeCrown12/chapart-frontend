import Link from "next/link"

export default function Footer() {

    return (
        <>
            <div className="bg-black text-white py-6">
                <div className="lg:w-[50%] md:w-[50%] w-[80%] mx-auto">
                    <div>
                        <h4 className="text-center">PIXHIBIT</h4>
                    </div>
                    <p className="text-center text-[14px] mt-4">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <div className="flex justify-center items-center text-[12px] mt-4">
                        <div className="mr-2"><Link className="text-white" href="/">Feedback</Link></div>
                        <div className="mr-2"><Link className="text-white" href="/">Terms</Link></div>
                        <div><Link className="text-white" href="/">Policies</Link></div>
                    </div>
                </div>
            </div>
        </>
    )
    
}