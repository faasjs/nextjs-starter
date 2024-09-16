import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4'>
      <div className='w-full max-w-md flex flex-col bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6 space-y-6'>
        <h1 className='text-3xl font-bold text-center text-white'>
          Welcome to <br /> FaasJS & Next.js
        </h1>
        <Button asChild className='bg-purple-600 hover:bg-purple-700'><Link href='/todo'>Open todo-list Demo</Link></Button>
      </div>
    </div>
  )
}
