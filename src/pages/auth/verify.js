import { PinInput, Button } from '@mantine/core' 
import { Cedarville_Cursive } from 'next/font/google'
import Link from 'next/link'
import { z } from 'zod'
import { useForm, zodResolver } from '@mantine/form'
import { httpEntry } from "@/services/axios.service"
import { useRouter } from "next/router"
import { useState } from "react"
import { parseError, showSuccess } from "@/services/notification.service"

const cedarville = Cedarville_Cursive({ 
    subsets: ['latin'],
    weight: '400'
})

export default function Verify() {

    const schema = z.object({
        token: z.string().min(6, {message: 'Pin must be six (6) digits'})
    })

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            token: ''
        }
    })

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (values) => {
        setLoading(true)
        const payload = {
            token: values.token,
            email: localStorage.getItem('email')
        }
        httpEntry.post('/auth/verify_token', payload).then(response => {
            showSuccess('Token verified successfully!')
            const { action } = router.query
            if(action === 'change_password') {
                localStorage.setItem('token', payload.token)
                router.push('/auth/change_password')
            }
            else {
                localStorage.removeItem('email')
                router.push('/auth/login')
            }
        }).catch(error => {
            parseError(error)
        }).finally(() => setLoading(false))
    }


    return (
        <>
            <div className="h-[100vh] w-full relative flex justify-center items-center">
                <div className="w-[30%]">
                    <div className='flex justify-center mb-4'>
                        <div className='w-[80px] h-[80px] rounded-full bg-gray-900'></div>
                    </div>
                    <div className='mb-1'>
                        <h1 className={`${cedarville.className} text-[2.6em] italic text-center`}>Verify Email</h1>
                    </div>
                    <div className='mb-6'>
                        <p className='text-center text-[15px]'>Provide the 6 digit pin sent to your email address.</p>
                    </div>
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <div className='mb-4 mx-auto w-fit'>
                            <PinInput length={6} size='xl' {...form.getInputProps('token')} />
                        </div>
                        <div>
                            <Button type='submit' loading={loading} fullWidth size="md" variant="filled">VERIFY EMAIL</Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-[15px]">
                        <Link href="/auth/login" className="text-black">Back to login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}