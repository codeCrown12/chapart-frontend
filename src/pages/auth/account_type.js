import { Cedarville_Cursive } from 'next/font/google'
import { Radio, Button } from '@mantine/core'
import { useState } from 'react'
import { useRouter } from "next/router"
import { httpEntry } from '@/services/axios.service'
import { parseError, showSuccess } from "@/services/notification.service"

const cedarville = Cedarville_Cursive({ 
    subsets: ['latin'],
    weight: '400'
})

export default function AccountType() {

    const [value, setValue] = useState('artist')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    
    const handleSubmit = async () => {
        setLoading(true)
        const payload = {
            email: localStorage.getItem('email'),
            is_artist: value === 'artist'
        }
        httpEntry.post('/auth/set_account_type', payload).then(response => {
            showSuccess('Account type set successfully!')
            localStorage.removeItem('email')
            router.push('/auth/login')
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
                        <h1 className={`${cedarville.className} text-[2em] italic text-center`}>Account Type</h1>
                    </div>
                    <div className='mb-6'>
                        <p className='text-center text-[15px]'>What is the primary use of your account?</p>
                    </div>
                    <Radio.Group
                        value={value}
                        onChange={setValue}
                    >
                        <div className='rounded-[4px] p-5 flex flex-row items-center' style={{ border: `1px solid ${value === 'artist'? 'black': '#ccc'}`}}>
                            <Radio size='md'
                                label="I'm an artist"
                                value="artist"
                                description="You're a creator, and you're primarily here to share/sell unique artworks you created yourself."
                            />
                        </div>
                        <div className='rounded-[4px] mt-3 p-5 flex flex-row items-center' style={{ border: `1px solid ${value === 'enthusiast'? 'black': '#ccc'}`}}>
                            <Radio size='md'
                                label="I'm an art enthusiast"
                                value="enthusiast"
                                description="You love art, and you're primarily here to collect/purchase beautiful artworks."
                            />
                        </div>
                    </Radio.Group>
                    <div className='mt-4'>
                        <Button onClick={handleSubmit} loading={loading} fullWidth size="md" variant="filled">CONTINUE</Button>
                    </div>
                </div>
            </div>
        </>
    )
}