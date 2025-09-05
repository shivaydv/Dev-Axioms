"use client"
import { LogoIcon } from '@/components/global/Logo'
import { Button } from '@/components/ui/button'
import { signIn } from '@/lib/auth-client'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { toast } from 'sonner'

const page = () => {

  const [loading, setLoading] = useState({
    state: false,
    provider: "" as "google" | "github" | ""
  });
  const router = useRouter();

  const handleSignIn = async (provider: "google" | "github") => {
    setLoading({ state: true, provider });
    await signIn.social({
      provider,
      callbackURL: "http://localhost:3000",
      fetchOptions: {
        onError: () => {
          toast.error("Sign-in failed. Please try again.");
          setLoading({ state: false, provider: "" });
        },
      }
    })
  }

  return (
    <div className='flex md:items-center max-md:pt-20 justify-center h-svh'>
      <div className='flex flex-col items-center gap-4'>
        <LogoIcon className='h-12 w-12' />
        <h1 className='text-2xl font-bold mb-2'>Login to your account</h1>

        <Button variant={'outline'} size={"lg"} onClick={() => handleSignIn("google")} disabled={loading.state}>
          {loading.provider === "google" ? <Loader className='h-5 w-5 animate-spin' /> : <FaGoogle className='h-5 w-5' />}
          Login with Google
        </Button>
        <Button variant={'outline'} size={"lg"} onClick={() => handleSignIn("github")} disabled={loading.state}>
          {loading.provider === "github" ? <Loader className='h-5 w-5 animate-spin' /> : <FaGithub className='h-5 w-5' />}
          Login with GitHub
        </Button>

      </div>
    </div>
  )
}

export default page

