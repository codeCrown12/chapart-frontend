import { PasswordInput, Button } from '@mantine/core' 
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

export default function ChangePassword () {

    const schema = z.object({
        password: z.string().min(8, {message: 'Password should have at least 8 characters'}),
        confirm_password: z.string().min(8, {message: 'Password should have at least 8 characters'})
    }).refine(data => data.password === data.confirm_password, {message: "Password and Confirm Password do not match", path: ["confirm_password"]});

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            password: '',
            confirm_password: ''
        }
    })

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const payload = {
                email: localStorage.getItem('email'),
                token: localStorage.getItem('token'),
                password: values.password
            }
            await httpEntry.put('/auth/change_password', payload)
            showSuccess('Password updated successfully!')
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            router.push('/auth/login')
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
                        <h1 className={`${cedarville.className} text-[2em] italic text-center`}>Change Password</h1>
                    </div>
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <div className='mb-4 mx-auto w-full'>
                            <PasswordInput {...form.getInputProps('password')} placeholder='Enter new password' size='md' />
                        </div>
                        <div className='mb-4 mx-auto w-full'>
                            <PasswordInput {...form.getInputProps('confirm_password')} placeholder='Confirm new password' size='md' />
                        </div>
                        <div className='mb-4'>
                            <Button type='submit' loading={loading} fullWidth size="md" variant="filled">CHANGE PASSWORD</Button>
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