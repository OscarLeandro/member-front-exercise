import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import FormData from "form-data";
import { useGlobalInfo } from "../../../context/GlobalContext";
import { auth } from "../../../lib/firebase";
import { classNames } from "../../../lib/Helper";
import axios from "axios";
import { useUserInfo } from "../../../context/UserContext";

export default function DashboardSidebarDesktop({
  navigation,
  secondaryNavigation,
  user,
}) {
  
  const {currentUser, setCurrentUser} = useUserInfo();
  
//console.log('USUARIO',currentUser);
  const router = useRouter()


  const signState = onAuthStateChanged(auth, (user) => {
    //console.log('user', user);
    if (user) setCurrentUser(user);
    
  });

  function signOutUser(){
    signOut(auth).then(()=>{
      router.push('/signin')
      
    })

  }
  

  
  // async function showToken(){
  //   const user = auth.currentUser;
  //   const idTokenResult = await user.getIdTokenResult();
  //   console.log(idTokenResult)

  // }

  //const showToken = async () => {

    //try {
      //const authSaludo = await authCheck(req);
      //const authtoken = await auth.currentUser.getIdToken();
      //console.log('token from client',authtoken)


      // await axios.post('http://localhost:8000/api/users/token/',{
      //   headers: 'aasdasadas',
      // })

      // await fetch( 'http://localhost:8000/api/users/token/',{
      //   method: 'POST',
      //   headers: {
      //     'authtoken':authtoken
      //   }
      // }).then(response => {
      //   response.json()
      // })
      // .then(data => console.log(data));

    //   await fetch('http://localhost:8000/api/users/token/',{
    //     method: 'POST',
    //     headers: {
    //       'authtoken':authtoken
    //     }
    //   })
    // .then(response => response.json())
    // .then(data => console.log(data))

      // const body = new FormData();
      // body.append("requireSignedURLs", "false");
  
      // // KEYS
      // const AUTH_TOKEN = process.env.NEXT_PUBLIC_TOKEN_CLOUDFLARE;
      // const GENERATE_LINK = process.env.NEXT_PUBLIC_CLOUDFLARE_GENERATE_LINK_UPLOAD;
  
      // // Generate link from cloudinary
      // const  data  = await axios.post(GENERATE_LINK, body, {
      //   headers: {
      //     Authorization: AUTH_TOKEN,
      //   },
      // });
  
      // console.log(data)
     
  
      //return data;
    //} catch (error) {
      //console.log(error);
      
    //}
  //};





  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex w-64 flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=500"
                alt="Your Company"
              />
            </div>
            <nav className="mt-5 flex-1" aria-label="Sidebar">
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.href == router.asPath
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.href == router.asPath
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
              <hr
                className="my-5 border-t border-gray-200"
                aria-hidden="true"
              />
              <div className="flex-1 space-y-1 px-2">
                {secondaryNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <item.icon
                      className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <div className="group block w-full flex-shrink-0">
                <div>
                  {/* <button 
                  className="border bg-cyan-300 p-3 "
                  onClick={showToken}
                  >
                    TOKEN
                  </button> */}
                </div>
                <div className="flex items-center">
                  <div>
                    {
                      currentUser.photoURL
                      ?(
                        <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={currentUser.photoURL}
                      alt=""
                    />
                      ) :(
                        <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={'/images/custom-user.png'}
                      alt=""
                    />
                        
                      )

                    }
                    
                  </div>

                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {currentUser.displayName}
                    </p>
                    <Link href='#' className="text-xs font-medium text-gray-500 hover:text-gray-700">
                      View profile
                    </Link>
                    <p  className="text-xs font-medium text-gray-500 ">
                    <ArrowLeftOnRectangleIcon  onClick={signOutUser}  className="hover:text-gray-900 cursor-pointer w-6 h-6" />
                    </p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
