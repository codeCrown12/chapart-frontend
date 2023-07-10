import { TextInput, Button } from '@mantine/core' 
import { Cedarville_Cursive } from 'next/font/google'
import Link from 'next/link'
import { z } from 'zod'
import { useForm, zodResolver } from "@mantine/form"
import { httpEntry } from "@/services/axios.service"
import { useRouter } from "next/router"
import { useState } from "react"
import { showError, showSuccess } from "@/services/notification.service"

const cedarville = Cedarville_Cursive({ 
    subsets: ['latin'],
    weight: '400'
})

export default function ForgotPassword() {

    const schema = z.object({
        email: z.string().email({ message: 'Invalid email address' })
    })

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email: ''
        }
    })

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const payload = values
            await httpEntry.post('/auth/get_token', payload)
            showSuccess('Token sent successfully to the email provided!')
            localStorage.setItem('email', values.email)
            router.push('/auth/verify?action=change_password')
        } catch (error) {
            showError(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="h-[100vh] w-full relative flex justify-center items-center">
                <div className="w-[30%]">
                    <div className='flex justify-center mb-4'>
                        <div className='w-[80px] h-[80px] rounded-full bg-gray-900'></div>
                    </div>
                    <div className='mb-4'>
                        <h1 className={`${cedarville.className} text-[2em] italic text-center`}>Forgot Password ?</h1>
                    </div>
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <div className='mb-4 mx-auto w-full'>
                            <TextInput {...form.getInputProps('email')} placeholder='Enter email address' size='md' />
                        </div>
                        <div className='mb-4'>
                            <Button type='submit' loading={loading} fullWidth size="md" variant="filled">RESET PASSWORD</Button>
                        </div>
                    </form>
                    <div className="mt-2 text-center text-[15px]">
                        <Link href="/auth/login" className="text-black">Back to login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}