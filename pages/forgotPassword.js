import { sendPasswordResetEmail } from "firebase/auth";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import ForgotPasswordAlert from "../components/account/ForgotPasswordAlert";
import { auth } from "../lib/firebase";

export default function ForgotPassword() {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    //console.log(email);
    const router = useRouter()
    function resetPassword() {
        const sendPassword = sendPasswordResetEmail(auth, email)
        .then(() => {
            setError('')
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Email sent Successfully',
                text: 'If your email is registered, a link to reset your password will be sent to you.',
                showConfirmButton: false,
                timer: 3500
              }).then(response =>{
                //console.log(response);
                response.isConfirmed = true
                if(response.isConfirmed === true){
                    router.push('/signIn')
                }
              })
        }).catch(error => {
            setError(error.message)
        })

    }
    
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">

        
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                  onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {
                error == 'Firebase: Error (auth/missing-email).' 
                ? <ForgotPasswordAlert error={error} />
                : error == 'Firebase: Error (auth/invalid-email).'
                && <ForgotPasswordAlert error={error} />
                
                
                
              }

              <div>
                <button
                onClick={resetPassword}
                  type="button"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Send 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
