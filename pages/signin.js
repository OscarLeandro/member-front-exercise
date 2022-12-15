import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import {  useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoginErrorAlert from "../components/account/LoginErrorAlert";
import { AuthContext } from "../context/authContext";

import { useGlobalInfo } from "../context/GlobalContext";
import { useUserInfo } from "../context/UserContext";
import { KEY_USERS } from "../helpers/query-keys";
import { auth } from "../lib/firebase";
import PublicRoute from "../routes/PublicRoute";

export default function Signin() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();


  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);


  const {propsReactQuery} = useUserInfo()

  const { data } = propsReactQuery;

  async function postUsers(url='',body={}){

    
    const response = await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',

      },
      body: JSON.stringify(body),
    });
    return response.json();
  }

  const mutationPost = useMutation(body => postUsers('api/users', body), {

    onSuccess: data => {
      const oldUsers = queryClient.getQueryData([KEY_USERS]);
      
      queryClient.setQueryData([KEY_USERS], [...oldUsers, data])
    },
  })

  async function signIn() {
    try {
      setError("");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const {user} = userCredential;
      const idTokenResult = await user.getIdTokenResult();
      setLoading(false);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      });


      router.push('/directory')
    } catch (error) {
      setError(error.message);
    }
  }
  // const signState = onAuthStateChanged(auth, (user) => {
  //   if (user) router.push("/");
  // });

  async function signWithGoogle() {
    const signGoogle = await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;


        setCurrentUser(user);

        const newUser = {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photoUrl: user.photoURL,
          uid:user.uid
        }

        data.map(user => {
          if(user.uid === newUser.uid){
            return
          }else{
            mutationPost.mutate(newUser)
          }
        })


      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
      });
    console.log(provider);
  }



  

  return (
    <>
    <PublicRoute>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href={"/register"}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register new account
            </Link>
          </p>
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
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    value={password}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/forgotPassword"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              {error == "Firebase: Error (auth/missing-email)." ? (
                <LoginErrorAlert error={error} />
              ) : error == "Firebase: Error (auth/invalid-email)." ? (
                <LoginErrorAlert error={error} />
              ) : error == "Firebase: Error (auth/internal-error)." ? (
                <LoginErrorAlert error={error} />
              ) : (
                error == "Firebase: Error (auth/wrong-password)." && (
                  <LoginErrorAlert error={error} />
                )
              )}

              <div>
                <button
                  onClick={signIn}
                  type="button"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Log in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-1">
                

                <div>
                  <a
                    onClick={signWithGoogle}
                    //href="#"
                    className=" cursor-pointer inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 bi bi-google"
                      fill="currentColor"
                      
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />{" "}
                    </svg>
                  </a>
                </div>

                {/* <div>
                  <a
                    href="#"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with GitHub</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      </PublicRoute>
    </>
  );
}
