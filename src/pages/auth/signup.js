import signupImg from "../../images/signup-img.png"
import Image from "next/image"
import { TextInput, PasswordInput, Button } from "@mantine/core"
import Link from "next/link"
import { Cedarville_Cursive } from 'next/font/google'

const cedarville = Cedarville_Cursive({ 
    subsets: ['latin'],
    weight: '400'
})

export default function SignUp() {

    return(
        <>
            <div className="relative">
                <div className="absolute top-0 right-0 py-4 px-8">
                    <Link href="/" className="no-underline text-black"><h4>PIXHIBIT</h4></Link>
                </div>
                <div className="h-[100vh] grid lg:grid-cols-2 gap-0 items-center">
                    <div className="h-full overflow-y-hidden">
                        <Image className="w-full h-full object-cover" src={signupImg}></Image>
                    </div>
                    <div className="overflow-y-auto">
                        <div className="w-[65%] mx-auto">
                            <div className="mb-4">
                                <h1 className={`${cedarville.className} text-[2.6em] italic text-center`}>Sign Up</h1>
                            </div>
                            <div>
                                <TextInput 
                                    size="md"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mt-4">
                                <TextInput 
                                    size="md"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="mt-4">
                                <TextInput 
                                    size="md"
                                    placeholder="First name"
                                />
                            </div>
                            <div className="mt-4">
                                <TextInput 
                                    size="md"
                                    placeholder="Last name"
                                />
                            </div>
                            <div className="mt-4">
                                <PasswordInput
                                    size="md"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div className="mt-4">
                                <Button fullWidth size="md" variant="filled">CREATE ACCOUNT</Button>
                            </div>
                            <div className="mt-4 text-center text-[15px]">
                                <p>Already have an account? <Link href="/auth/login" className="text-black">Sign in</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}