import { useIndexInfo } from "../../../context/IndexContext";


export default function DirectoryListModalForm() {
  const {
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
    coverImageUrl, setCoverImageUrl,
  } = useIndexInfo();


  function handleFileInput(e){

    const type = e.target.files[0].type.toLowerCase();
    console.log(type)
    if (
      type != "image/webp" &&
      type != "image/png" &&
      type != "image/gif" &&
      type != "image/jpeg"
    ) {
      console.log("Error al subir la imágen. Formatos permitidos webp,png,gif o jpeg")
      
      return;
    }

    if (e.target.files[0].size > 10485760) {
      console.log("Error al subir la imágen. Tamaño máx 10mb");
      return;
    }

    let imgName = e.target.files[0].name;

    let dotIndex = imgName.lastIndexOf(".");
    console.log('dotIndex',dotIndex);
    let cutDot = imgName.slice(0, dotIndex);
    let maxLength = cutDot.slice(0, 25);

    // setName(maxLength);
    // setSize(e.target.files[0].size);

    // setSelectedFile(e.target.files[0]);

    let url = URL.createObjectURL(e.target.files[0]);
    console.log(url);
    //setLocalUrlImage(url);
    //setStep(1);
  };

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Ingresa tu nombre completo"
                id="name"
                onChange={(e) => setName(e.target.value)}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <hr />
            <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={phone}
                placeholder="Ingresa tu nombre completo"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <hr />
            <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="email"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                placeholder="Ingresa tu Email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <hr />
            <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="sits"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Sits
              </label>
              <input
                type="text"
                name="sits"
                id="sits"
                value={sits}
                placeholder="Ingresa tu Direccion"
                onChange={(e) => setSits(e.target.value)}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <hr />
            <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="location"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={location}
                placeholder="Ingresa tu Direccion"
                onChange={(e) => setLocation(e.target.value)}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <hr />
            <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="title"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Ingresa tu Profesion"
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <hr />
            <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="team"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Team
              </label>
              <input
                type="text"
                name="team"
                id="team"
                value={team}
                placeholder="Ingresa tu Profesion"
                onChange={(e) => setTeam(e.target.value)}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <hr />
            <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="salary"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Salary
              </label>
              <input
                type="text"
                name="salary"
                id="salary"
                value={salary}
                placeholder="Ingresa tu Profesion"
                onChange={(e) => setSalary(e.target.value)}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <hr />
            <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="birthday"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Birthday
              </label>
              <input
                type="text"
                name="birthday"
                id="birthday"
                value={birthday}
                placeholder="Ingresa tu Profesion"
                onChange={(e) => setBirthday(e.target.value)}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <hr />
            <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <label
                htmlFor="about"
                className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                About
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <textarea
                  id="about"
                  name="about"
                  value={about}
                  rows={3}
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setAbout(e.target.value)}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
            <hr />

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Photo
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="imageUrl"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          type="file"
                          onChange={handleFileInput}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <button
                    onClick={(e) =>
                      fileInput.current && fileInput.current.click()
                    }
                  />
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Cover photo
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="coverImageUrl"
                          name="coverImageUrl"
                          type="file"
                          value={coverImageUrl}
                          className="sr-only"
                          onChange={(e) => setCoverImageUrl(e.target.value)}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}