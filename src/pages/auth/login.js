import loginImg from "../../images/login-img.png"
import Image from "next/image"
import { TextInput, PasswordInput, Button } from "@mantine/core"
import Link from "next/link"
import { Cedarville_Cursive } from 'next/font/google'
import { z } from "zod"
import { useForm, zodResolver } from "@mantine/form"
import { httpEntry } from "@/services/axios.service"
import { useRouter } from "next/router"
import { useState } from "react"
import { showError, showSuccess } from "@/services/notification.service"
import { useDispatch } from "react-redux"
import { loginUser } from "@/store/slices/authSlice"

const cedarville = Cedarville_Cursive({ 
    subsets: ['latin'],
    weight: '400'
})

export default function Login() {

    const schema = z.object({
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(1, { message: 'Password is required' })
    })

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: ''
        }
    })

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const payload = values
            const response = await httpEntry.post('/auth/login', payload)
            dispatch(loginUser({
                userData: response.data.data.user,
                userToken: response.data.data.token
            }))
            showSuccess('Login successful')
            router.push('/')
        } catch (error) {
            showError(error.message)
            if(error.message.toLowerCase() === 'email not verified') {
                localStorage.setItem('email', payload.email)
                router.push('/auth/verify')
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="relative">
                <div className="absolute top-0 right-0 py-4 px-8">
                    <Link href="/" className="no-underline text-black"><h4>PIXHIBIT</h4></Link>
                </div>
                <div className="h-[100vh] grid lg:grid-cols-2 grid-cols-1 gap-0 items-center">
                    <div className="h-full lg:block hidden overflow-y-hidden">
                        <Image alt="login-bg" className="w-full h-full object-cover" src={loginImg}></Image>
                    </div>
                    <div className="overflow-y-auto">
                        <div className="lg:w-[65%] md:w-[60%] w-[90%] mx-auto">
                            <div className="mb-4">
                                <h1 className={`${cedarville.className} text-[2.6em] italic text-center`}>Sign In</h1>
                            </div>
                            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                                <div>
                                    <TextInput 
                                        size="md"
                                        placeholder="Enter email address"
                                        {...form.getInputProps('email')}
                                    />
                                </div>
                                <div className="mt-4">
                                    <PasswordInput
                                        size="md"
                                        placeholder="Enter password"
                                        {...form.getInputProps('password')}
                                    />
                                </div>
                                <div className="mt-2 text-right text-[15px]">
                                    <Link href="/auth/forgot_password" className="text-black">Forgot password?</Link>
                                </div>
                                <div className="mt-2">
                                    <Button type="submit" loading={loading} fullWidth size="md" variant="filled">SIGN IN</Button>
                                </div>
                            </form>
                            <div className="mt-4 text-center text-[15px]">
                                <p>Don't have an account? <Link href="/auth/signup" className="text-black">Create account</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}