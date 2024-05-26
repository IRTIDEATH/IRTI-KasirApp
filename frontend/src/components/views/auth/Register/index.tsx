import React, { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const RegisterView = () => {
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      push("/auth/login");
      console.log("berhasilnih");
    } else {
      console.log("error");
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-[100vh] w-[100vw]">
      <h1 className="text-[32px] mb-[10px] font-semibold">Register</h1>
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
            <label htmlFor="fullname">Fullname</label>
            <input
              name="fullname"
              id="fullname"
              type="text"
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
            Register
          </button>
        </form>
      </div>
      <p>
        Have an Account? Sign in{" "}
        <Link className="text-blue-400" href={"/auth/login"}>
          here
        </Link>
      </p>
    </div>
  );
};

export default RegisterView;
