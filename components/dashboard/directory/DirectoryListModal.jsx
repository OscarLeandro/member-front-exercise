import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useIndexInfo } from '../../../context/IndexContext'
import DirectoryListModalForm from './DirectoryListModalForm'
import { useMutation, useQueryClient } from 'react-query'
import {KEY_MEMBERS} from '../../../helpers/query-keys'
export default function DirectoryListModal() {

  const queryClient = useQueryClient();

  
  async function postData(url='',body={}){

    
    const response = await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(body),
    });
    return response.json();
  }

  const mutationPost = useMutation(body => postData('api/members', body), {
    onSuccess: data => {
      const oldMembers = queryClient.getQueryData([KEY_MEMBERS]);
      
      queryClient.setQueryData([KEY_MEMBERS], [...oldMembers, data])
    },
  })


  async function updateData(url='',body={}){
    const response = await fetch(url, {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(body)
    });
    return response.json();
  }
  const mutationUpdate = useMutation(body => updateData('api/members', body), {
    onSuccess: data => {
      //console.log(data)
      const updatedMember = data;
      const oldMember = queryClient.getQueryData([KEY_MEMBERS]);

      const updatedMembers = oldMember.map( member => {
        if(member._id == updatedMember._id){
          return updatedMember
        }else{
          return member
        }
      })
      console.log(updatedMembers)
      queryClient.setQueryData([KEY_MEMBERS], updatedMembers)
      //queryClient.setQueryData([KEY_MEMBERS], [...oldMember.map(member => member._id === data._id ? {...member, ...data}: member)])
    }
  })




  const {
    data,setData,
    open, setOpen,
    currentMember,
    setCurrentMember,
    buttonType,
    name, setName,
    phone, setPhone,
    email, setEmail,
    title, setTitle,
    team, setTeam,
    location, setLocation,
    sits, setSits,
    salary, setSalary,
    birthday, setBirthday,
    about, setAbout,
    imageUrl, setImageUrl,
    coverImageUrl, setCoverImageUrl
  } = useIndexInfo();


  async function onSubmit(e) {
    e.preventDefault();

    let newDataMember = {
      name,
      fields: {
        email,
        phone,
        sits,
        title,
        team,
        location,
        salary,
        birthday,
      },
      imageUrl,
      coverImageUrl,
      about,
    };

    
    if (buttonType == "add") {
      setName('')
      setPhone('')
      setEmail('')
      setTitle('')
      setTeam('')
      setLocation('')
      setSits('')
      setSalary('')
      setBirthday('')
      setAbout('')
      
      try {
        mutationPost.mutate(newDataMember)
      } catch (error) {
        console.log(error);
      }
        setOpen(false);
    } else if(buttonType =='update'){
      try {
        let updateDataMember = {
          id:currentMember._id,
          name,
          fields: {
            email,
            phone,
            sits,
            title,
            team,
            location,
            salary,
            birthday,
          },
          imageUrl,
          coverImageUrl,
          about,
        };

        mutationUpdate.mutate(updateDataMember)
        
        setCurrentMember(updateDataMember)
      } catch (error) {
        console.log(error);
        
      }
      

      setOpen(false);
    }
  }


  const cancelButtonRef = useRef(null)



  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <DirectoryListModalForm />
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={(e)=>onSubmit(e)}
                  >
                    {buttonType == "add" ? "Add" : "Update"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            
          </div>
        </div>
        
      </Dialog>
    </Transition.Root>
  )
}
