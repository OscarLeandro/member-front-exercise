import { createContext, useContext, useEffect, useState } from "react";
import { directory, profile } from "../pages";
import {useQuery, useMutation, queryClient} from 'react-query'
export const IndexContext = createContext()

const IndexContextProvider = ({children}) => {

    async function getData(url = ''){
      //console.log('URL',url);
        const response = await fetch(url,{
            method:'GET',
            headers:{
              'Content-Type':'application/json',
            }
        });
        return response.json();
    }

    const propsReactQuery = useQuery(['members'], () =>
      getData('api/members')
    )
    //console.log(propsReactQuery);

    
    //fetch
    const [filter, setFilter] = useState('')
  
    //modal member buttontype sidebar
    const [open, setOpen] = useState(false)
    const [currentMember, setCurrentMember] = useState(null)
    const [buttonType, setButtonType] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    //FORMULARIO
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [sits, setSits] = useState("");
    const [title, setTitle] = useState("");
    const [team, setTeam] = useState("");
    const [salary, setSalary] = useState("");
    const [birthday, setBirthday] = useState("");
    const [about, setAbout] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [coverImageUrl, setCoverImageUrl] = useState("");
  
    return (
      <IndexContext.Provider
        value={{
          propsReactQuery,
          getData,
          filter,setFilter,
          open,setOpen,
          sidebarOpen,setSidebarOpen,
          name, setName,
          phone, setPhone,
          email, setEmail,
          location, setLocation,
          sits, setSits,
          title, setTitle,
          team, setTeam,
          salary, setSalary,
          birthday, setBirthday,
          about, setAbout,
          imageUrl, setImageUrl,
          coverImageUrl, setCoverImageUrl,
          buttonType, setButtonType,
          currentMember, setCurrentMember
        }}
      >
        {children}
      </IndexContext.Provider>
    );
  };

export default IndexContextProvider;

export const useIndexInfo = () => {
    const values = useContext(IndexContext);

    return {...values };
}

