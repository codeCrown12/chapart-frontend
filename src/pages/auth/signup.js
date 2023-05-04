import signupImg from "../../images/signup-img.png"
import Image from "next/image"
import { TextInput, PasswordInput, Button } from "@mantine/core"
import Link from "next/link"
import { Cedarville_Cursive } from 'next/font/google'
import { z } from "zod"
import { useForm, zodResolver } from "@mantine/form"
import { httpEntry } from "@/services/axios.service"
import { useRouter } from "next/router"
import { useState } from "react"
import { parseError, showSuccess } from "@/services/notification.service"

const cedarville = Cedarville_Cursive({ 
    subsets: ['latin'],
    weight: '400'
})

export default function SignUp() {

    const schema = z.object({
        email: z.string().email({ message: 'Invalid email address' }),
        firstname: z.string().min(1, { message: 'First name is required' }),
        lastname: z.string().min(1, { message: 'Last name is required' }),
        username: z.string().min(1, { message: 'Username is required' }),
        password: z.string().min(8, {message: 'Password should have at least 8 characters'}),
    })

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: ''
        }
    })
    
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (values) => {
        setLoading(true)
        const payload = values
        httpEntry.post('/auth/signup', payload).then(response => {
            showSuccess('Signup successful!')
            localStorage.setItem('email', payload.email)
            router.push('/auth/verify')
        }).catch(error => {
            parseError(error)
        }).finally(() => setLoading(false))
    }

    return(
        <>
            <div className="relative">
                <div className="absolute top-0 right-0 py-4 px-8">
                    <Link href="/" className="no-underline text-black"><h4>PIXHIBIT</h4></Link>
                </div>
                <div className="h-[100vh] grid lg:grid-cols-2 gap-0 items-center">
                    <div className="h-full overflow-y-hidden">
                        <Image alt="signup-bg" className="w-full h-full object-cover" src={signupImg}></Image>
                    </div>
                    <div className="overflow-y-auto">
                        <div className="w-[65%] mx-auto">
                            <div className="mb-4">
                                <h1 className={`${cedarville.className} text-[2.6em] italic text-center`}>Sign Up</h1>
                            </div>
                            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                                <div>
                                    <TextInput 
                                        size="md"
                                        placeholder="Email"
                                        {...form.getInputProps('email')}
                                    />
                                </div>
                                <div className="mt-4">
                                    <TextInput 
                                        size="md"
                                        placeholder="Username"
                                        {...form.getInputProps('username')}
                                    />
                                </div>
                                <div className="mt-4">
                                    <TextInput 
                                        size="md"
                                        placeholder="First name"
                                        {...form.getInputProps('firstname')}
                                    />
                                </div>
                                <div className="mt-4">
                                    <TextInput 
                                        size="md"
                                        placeholder="Last name"
                                        {...form.getInputProps('lastname')}
                                    />
                                </div>
                                <div className="mt-4">
                                    <PasswordInput
                                        size="md"
                                        placeholder="Enter password"
                                        {...form.getInputProps('password')}
                                    />
                                </div>
                                <div className="mt-4">
                                    <Button loading={loading} type="submit" fullWidth size="md" variant="filled">CREATE ACCOUNT</Button>
                                </div>
                            </form>
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