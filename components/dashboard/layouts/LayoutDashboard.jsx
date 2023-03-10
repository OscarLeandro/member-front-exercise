import {
    CalendarIcon,
    CogIcon,
    HomeIcon,
    MagnifyingGlassCircleIcon,
    MapIcon,
    MegaphoneIcon,
    SquaresPlusIcon,
    UserGroupIcon,
  } from "@heroicons/react/24/outline";
import IndexContextProvider from "../../../context/IndexContext";
import PrivateRoute from "../../../routes/PrivateRoute";
import DashboardHeaderMobile from "../commons/DashboardHeaderMobile";
import DashboardSidebarDesktop from "../commons/DashboardSidebarDesktop";
import DashboardSidebarMobile from "../commons/DashboardSidebarMobile";
import DirectoryList from "../directory/DirectoryList";
import DirectoryMember from "../directory/DirectoryMember";

  
  const user = {
    name: "Tom Cook",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  const navigation = [
    { name: "Directory", href: "/directory", icon: MagnifyingGlassCircleIcon, current: true },
    //{ name: "Calendar", href: "#", icon: CalendarIcon, current: false },
    //{ name: "Teams", href: "#", icon: UserGroupIcon, current: false },
    // {
    //   name: "Directory",
    //   href: "/dashboard/directory",
    //   icon: MagnifyingGlassCircleIcon,
    //   current: true,
    // },
    //{ name: "Announcements", href: "#", icon: MegaphoneIcon, current: false },
    //{ name: "Office Map", href: "#", icon: MapIcon, current: false },
  ];
  const secondaryNavigation = [
    //{ name: "Apps", href: "#", icon: SquaresPlusIcon },
    { name: "Settings", href: "#", icon: CogIcon },
  ];
  const tabs = [
    { name: "Profile", href: "#", current: true },
    { name: "Calendar", href: "#", current: false },
    { name: "Recognition", href: "#", current: false },
  ];
  export const profile = {
    name: "Ricardo Cooper",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    coverImageUrl:
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    about: `
      <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
      <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
    `,
    fields: {
      Phone: "(555) 123-4567",
      Email: "ricardocooper@example.com",
      Title: "Senior Front-End Developer",
      Team: "Product Development",
      Location: "San Francisco",
      Sits: "Oasis, 4th floor",
      Salary: "$145,000",
      Birthday: "June 8, 1990",
    },
  };
  const team = [
    {
      name: "Leslie Alexander",
      handle: "lesliealexander",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Michael Foster",
      handle: "michaelfoster",
      role: "Co-Founder / CTO",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Dries Vincent",
      handle: "driesvincent",
      role: "Manager, Business Relations",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Lindsay Walton",
      handle: "lindsaywalton",
      role: "Front-end Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];
  
  export default function LayoutDashboard({children}) {
    return (
      <IndexContextProvider>
      <>
        <PrivateRoute>
        <DashboardSidebarMobile
          navigation={navigation}
          secondaryNavigation={secondaryNavigation}
          user={user}
        />
        <div className="flex h-screen">
          {/* Static sidebar for desktop */}
          <DashboardSidebarDesktop
            navigation={navigation}
            secondaryNavigation={secondaryNavigation}
            user={user}
          />
  
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <DashboardHeaderMobile />
  
            <div className="relative z-0 flex flex-1 overflow-hidden">
        <DirectoryMember profile={profile} tabs={tabs} team={team} />
        <DirectoryList />

        </div>
              {/* {children} */}
              {/* <DirectoryMember profile={profile} tabs={tabs} team={team} />
              <DirectoryList /> */}
           
          </div>
        </div>
        </PrivateRoute>
      </>
      </IndexContextProvider>
    );
  }