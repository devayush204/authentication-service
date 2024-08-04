"use client"
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/register", user);
      console.log("Signup success", response.data);
      router.push("/login");

    } catch (error) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (


    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">


            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Heyy Signup here
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
              quibusdam aperiam voluptatum.
            </p>
          </div>
        </section>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">


              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                Heyy Signup here
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                quibusdam aperiam voluptatum.
              </p>
            </div>

            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <h1>{loading ? "Processing" : "Signup"}</h1>
              <div className="w-full col-span-6">
                <label
                  htmlFor="Username"
                  className="w-full text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="Username"
                  name="Username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  placeholder='username'
                  className="mt-1 w-full p-3 rounded-xl border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>


              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Email"
                  className="mt-1 w-full p-3 rounded-xl border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-6 ">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Password"
                  className="mt-1 w-full p-3 rounded-xl border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>


              <div className="col-span-6">
                {/* <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                  />

                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    I want to receive emails about events, product updates and company announcements.
                  </span>
                </label> */}
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By creating an account, you agree to our
                  <a href="#" className="text-gray-700 underline dark:text-gray-200">
                    terms and conditions
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline dark:text-gray-200"> privacy policy </a>.
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button disabled={buttonDisabled} onClick={onSignup}
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                >
                  {buttonDisabled ? "No Signup" : "Click here to Signup"}
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                  Already have an account?
                  <Link href="/login" className="text-gray-700 underline dark:text-gray-200">Log in</Link>.
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}

export default RegisterPage