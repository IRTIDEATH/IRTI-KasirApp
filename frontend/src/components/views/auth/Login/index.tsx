import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || '/';

  const [error, setError] = useState('')
  const [isLoading, setIsloading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('')
    setIsloading(true)
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl
      })

      if(!res?.error) {
        setIsloading(false)
        form.reset()
        push(callbackUrl)
      } else {
        setIsloading(false)
        setError("Email or Password is incorrect")
      }
    } catch (error) {
      setIsloading(false)
      setError("Email or Password is incorrect")
      console.log(error)
      
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-[100vh] w-[100vw]">
      <h1 className="text-[32px] mb-[10px] font-semibold">Login</h1>
      {error && <p className="text-red mb-[10px]">{error}</p>}
      <div className="w-[30%] p-[20px] border-2 shadow-xl mb-[20px]">
        <form onSubmit={handleSubmit} className="mx-[20px] space-y-5">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className="p-[10px] bg-[#eee] mt-[5px] border-none outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className="p-[10px] bg-[#eee] mt-[5px] border-none outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full text-center py-2 bg-black text-white"
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
      <p>
        Don{"'"}t have an account? Sign Up{" "}
        <Link className="text-blue-400" href={"/auth/register"}>
          here
        </Link>
      </p>
    </div>
  );
};

export default LoginView;
