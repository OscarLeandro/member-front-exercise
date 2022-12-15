import { FunnelIcon, MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import { useIndexInfo } from "../../../context/IndexContext";
import DirectoryListModal from "./DirectoryListModal";


export default function DirectoryList() {
  const { 
    propsReactQuery, 
    currentMember, 
    setCurrentMember,
    open, 
    setOpen, 
    setButtonType,
    filter,setFilter,

   } = useIndexInfo();

  const { data: directory, isSuccess, isLoading, isError } = propsReactQuery;

  

  function addMember() {
    setButtonType('add')
    setOpen(true)

  }
  function findMemberByName(){

    const regex = new RegExp('^' +filter,'i')

    const dataFilter = directory.filter( ({name}) => regex.test(name))
    return dataFilter
  }

  const results = !filter ? directory : findMemberByName()
    
  return (
    <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-medium text-gray-900">Directory</h2>
        <p className="mt-1 text-sm text-gray-600">
          Search directory of 3,018 employees
        </p>
        <form className="mt-6 flex space-x-4" action="#">
          <div className="min-w-0 flex-1">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={e => setFilter(e.target.value)}
                //onKeyUp={findMemberByName}
                type="search"
                name="name"
                //value={filter}
                id="name"
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                placeholder="Search"
              />
            </div>
          </div>
          <DirectoryListModal />
          <button
            onClick={(e) => findMemberByName(e)}
            type="submit"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
          <button
            onClick={addMember}
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            <UserPlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="sr-only">Add</span>
          </button>
        </form>
      </div>
      {/* Directory list */}
      <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
        <div className="relative">
          <ul role="list" className="relative z-0 divide-y divide-gray-200">
            {isLoading && <p>Loading</p>}
            {isError && <p>ERROR!</p>}
            {isSuccess &&
              results.map((person) => (
                <li key={person._id}>
                  <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={person.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <a
                        // onClick={() => eliminarMiembro(person.id) }
                        onClick={() => setCurrentMember(person)}
                        href="#"
                        className="focus:outline-none"
                      >
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">
                          {person.name}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {person.role}
                        </p>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
