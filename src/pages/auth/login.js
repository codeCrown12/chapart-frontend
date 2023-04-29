import loginImg from "../../images/login-img.png"
import Image from "next/image"
import { TextInput, PasswordInput, Button } from "@mantine/core"
import Link from "next/link"
import { Cedarville_Cursive } from 'next/font/google'

const cedarville = Cedarville_Cursive({ 
    subsets: ['latin'],
    weight: '400'
  })

export default function Login() {

    return (
        <>
            <div className="relative">
                <div className="absolute top-0 right-0 py-4 px-8">
                    <Link href="/" className="no-underline text-black"><h4>PIXHIBIT</h4></Link>
                </div>
                <div className="h-[100vh] grid lg:grid-cols-2 gap-0 items-center">
                    <div className="h-full overflow-y-hidden">
                        <Image className="w-full h-full object-cover" src={loginImg}></Image>
                    </div>
                    <div>
                        <div className="w-[65%] mx-auto">
                            <div className="mb-4">
                                <h1 className={`${cedarville.className} text-[2.6em] italic text-center`}>Sign In</h1>
                            </div>
                            <div>
                                <TextInput 
                                    size="md"
                                    placeholder="Enter email or username"
                                />
                            </div>
                            <div className="mt-4">
                                <PasswordInput
                                    size="md"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div className="mt-2 text-right text-[14px]">
                                <Link href="/" className="text-black">Forgot password?</Link>
                            </div>
                            <div className="mt-2">
                                <Button fullWidth size="md" variant="filled">SIGN IN</Button>
                            </div>
                            <div className="mt-4 text-center text-[14px]">
                                <p>Don't have an account? <Link href="/" className="text-black">Create account</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}