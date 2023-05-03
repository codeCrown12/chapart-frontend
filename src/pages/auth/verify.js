import { PinInput, Button } from '@mantine/core' 
import { Cedarville_Cursive } from 'next/font/google'
import Link from 'next/link'

const cedarville = Cedarville_Cursive({ 
    subsets: ['latin'],
    weight: '400'
})

export default function Verify() {
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
                    <div className='mb-4 mx-auto w-fit'>
                        <PinInput length={6} size='xl' />
                    </div>
                    <div>
                        <Button fullWidth size="md" variant="filled">VERIFY EMAIL</Button>
                    </div>
                    <div className="mt-6 text-center text-[15px]">
                        <Link href="/auth/login" className="text-black">Back to login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}