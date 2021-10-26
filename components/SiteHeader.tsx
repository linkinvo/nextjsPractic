import { useState } from "react";
import Link from 'next/link'
import PropertiCreate from "./propertiesComponent/PropertiCreate";

export default function Header( {props} ) {
  const NOT_AUTHORIZED = props.id === '';
  let firstName = props.firstName;
  const lastName = props.lastName;
  const role = props.role
  const identity = props
  
  const [isOpenSandwich, setIsOpenSandwich] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  return (
    <header className="bg-gray-900 sm:flex sm:items-center sm:justify-between xl:bg-white">
      <div className="flex justify-between py-4 px-3 xl:w-72 xl:bg-gray-900 xl:justify-center xl:py-5">
      <Link href="/">
        <a>
          <svg className="h-8 w-auto" width="185" height="32" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M121.09 28.336c2.352 0 4.392-1.248 5.424-3.12l-2.688-1.536c-.48.984-1.512 1.584-2.76 1.584-1.848 0-3.216-1.368-3.216-3.264 0-1.92 1.368-3.288 3.216-3.288 1.224 0 2.256.624 2.736 1.608l2.664-1.56c-.984-1.848-3.024-3.096-5.376-3.096-3.648 0-6.336 2.76-6.336 6.336 0 3.576 2.688 6.336 6.336 6.336zM137.084 16v1.416c-.864-1.08-2.16-1.752-3.912-1.752-3.192 0-5.832 2.76-5.832 6.336 0 3.576 2.64 6.336 5.832 6.336 1.752 0 3.048-.672 3.912-1.752V28h3.096V16h-3.096zm-3.336 9.384c-1.896 0-3.312-1.368-3.312-3.384s1.416-3.384 3.312-3.384c1.92 0 3.336 1.368 3.336 3.384s-1.416 3.384-3.336 3.384zM149.851 18.976V16h-2.712v-3.36l-3.096.936V16h-2.088v2.976h2.088v4.992c0 3.24 1.464 4.512 5.808 4.032v-2.808c-1.776.096-2.712.072-2.712-1.224v-4.992h2.712zM153.57 14.56c1.056 0 1.92-.864 1.92-1.896s-.864-1.92-1.92-1.92c-1.032 0-1.896.888-1.896 1.92s.864 1.896 1.896 1.896zM152.034 28h3.096V16h-3.096v12zM163.676 28.336c3.528 0 6.36-2.76 6.36-6.336 0-3.576-2.832-6.336-6.36-6.336-3.528 0-6.336 2.76-6.336 6.336 0 3.576 2.808 6.336 6.336 6.336zm0-3.024c-1.824 0-3.24-1.368-3.24-3.312 0-1.944 1.416-3.312 3.24-3.312 1.848 0 3.264 1.368 3.264 3.312 0 1.944-1.416 3.312-3.264 3.312zM178.886 15.664c-1.608 0-2.856.6-3.576 1.68V16h-3.096v12h3.096v-6.48c0-2.088 1.128-2.976 2.64-2.976 1.392 0 2.376.84 2.376 2.472V28h3.096v-7.368c0-3.192-1.992-4.968-4.536-4.968z" fill="#A3BFFA"
            />
            <path d="M61.063 28h3.768l3.144-11.088L71.143 28h3.768l4.704-16.8h-3.48L72.92 23.656 69.391 11.2H66.56l-3.504 12.456L59.84 11.2h-3.48L61.063 28zM85.674 28.336c3.528 0 6.36-2.76 6.36-6.336 0-3.576-2.832-6.336-6.36-6.336-3.528 0-6.336 2.76-6.336 6.336 0 3.576 2.808 6.336 6.336 6.336zm0-3.024c-1.824 0-3.24-1.368-3.24-3.312 0-1.944 1.416-3.312 3.24-3.312 1.848 0 3.264 1.368 3.264 3.312 0 1.944-1.416 3.312-3.264 3.312zM97.308 18.064V16h-3.096v12h3.096v-5.736c0-2.52 2.04-3.24 3.648-3.048V15.76c-1.512 0-3.024.672-3.648 2.304zM113.831 28l-4.968-6.072L113.687 16h-3.696l-4.128 5.28V11.2h-3.096V28h3.096v-5.448L110.231 28h3.6z" fill="#fff"
            />
            <path fillRule="evenodd" clipRule="evenodd" d="M43.911 12.604L36.213 8.16v20.645h9v2h-44v-2h4v-12.72l-3.728.933L1 15.078l21.09-5.273h3.122a9.552 9.552 0 00-.68 2.559l-.483 3.975 5.164-2.982v15.448h5V8.161l-7.696 4.444a7.502 7.502 0 012.565-4.8h-4.12a7.489 7.489 0 016.646-2.973l-5.591-3.228a7.488 7.488 0 016.696.402c1.039.6 1.88 1.41 2.5 2.347a7.461 7.461 0 012.5-2.347 7.49 7.49 0 016.698-.402l-5.593 3.228a7.488 7.488 0 016.646 2.973h-4.12a7.498 7.498 0 012.567 4.8zM25.213 28.805v-10h-6v10h6zm-11-8a2 2 0 11-4 0 2 2 0 014 0z" fill="#A3BFFA"
            />
          </svg>
        </a>
        </Link>
        <div className="flex sm:hidden">
          <button type="button" className="px-2" onClick={() => { setIsOpenSandwich(!isOpenSandwich) }}>
            <svg className="h-5 w-5 fill-current text-gray-500 hover:text-white focus:outline-none focus:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14"
            >
              {
                isOpenSandwich ?
                  <path d="M12.778 11.364a1 1 0 01-1.414 1.414L6.536 7.95l-4.829 4.828a1 1 0 01-1.414-1.414L5.12 6.536.293 1.707A1 1 0 011.707.293L6.536 5.12 11.364.293a1 1 0 111.414 1.414L7.95 6.536l4.828 4.828z" />
                  :
                  <path d="M0 1a1 1 0 011-1h16a1 1 0 110 2H1a1 1 0 01-1-1zm0 6a1 1 0 011-1h16a1 1 0 110 2H1a1 1 0 01-1-1zm1 5a1 1 0 100 2h16a1 1 0 100-2H1z" />
              }
            </svg>
          </button>
        </div>
      </div>
      <nav className={`${!isOpenSandwich ? 'hidden' : 'block'} sm:flex sm:items-center xl:flex-1 xl:justify-between`}>
        <div className="hidden xl:block xl:px-5">
          <div className="relative max-w-xs w-full ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-6 w-6 fill-current text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M14.32 12.906l1.096 1.096c.412-.023.83.123 1.145.437l3 3a1.5 1.5 0 01-2.122 2.122l-3-3a1.497 1.497 0 01-.437-1.145l-1.096-1.096a8 8 0 111.414-1.414zM8 14A6 6 0 108 2a6 6 0 000 12z" />
              </svg>
            </div>
            <input
              className="block w-full bg-gray-200 border border:transparent focus:outline-none focus:bg-white focus:text-gray-900 text-gray-900 rounded-lg pl-10 pr-2 py-2 focus:border-gray-700"
              placeholder="Search by keywords"
            />
          </div>
        </div>

        <div className="sm:flex sm:items-center">
          <div className="px-2 pt-2 pb-5 border-b border-gray-800 sm:flex sm:border-b-0 sm:py-0">
            {
              NOT_AUTHORIZED ?
                <>
                  <Link href={"/login"} >
                    <a className="block px-3 py-1 mt-1 hover:bg-gray-700 rounded font-medium text-white sm:mt-0 sm:text-sm sm:px-2 sm:ml-2 xl:text-gray-900 xl:hover:bg-gray-200 ">Login</a>
                  </Link>
                  <Link href={"/registration"} >
                    <a className="block px-3 py-1 mt-1 hover:bg-gray-700 rounded font-medium text-white sm:mt-0 sm:text-sm sm:px-2 sm:ml-2 xl:text-gray-900 xl:hover:bg-gray-200 ">Register</a>
                  </Link>
                </>
                :
                <>
                  {/* <Link href={"/logout"} >
                    <a className="block px-3 py-1 mt-1 hover:bg-gray-700 rounded font-medium text-white sm:mt-0 sm:text-sm sm:px-2 sm:ml-2 xl:text-gray-900 xl:hover:bg-gray-200 ">Logout</a>
                  </Link> */}
                  <span className="block px-3 py-1 mt-1 hover:bg-gray-700 rounded font-medium text-white sm:mt-0 sm:text-sm sm:px-2 sm:ml-2 xl:text-gray-900 xl:hover:bg-gray-200 ">{firstName} {lastName}: __"{role}"__</span>
                  <div onClick={() => { setIsOpenProfile(!isOpenProfile) }} className="flex items-center">
              <img className="h-10 w-10 object-cover rounded-full border-2 border-gray-600 cursor-pointer sm:w-8 sm:h-8 xl:border-gray-200 " src='https://img.freepik.com/free-icon/important-person_318-10744.jpg?size=338&ext=jpg' alt="person_icon" />
              <span className="ml-4 font-medium text-gray-200 sm:hidden">{firstName} {lastName}  </span>
            </div>
                </>

            }

          </div>
          <div className="relative px-5 py-5 sm:py-0">
            {/* <div onClick={() => { setIsOpenProfile(!isOpenProfile) }} className="flex items-center">
              <img className="h-10 w-10 object-cover rounded-full border-2 border-gray-600 cursor-pointer sm:w-8 sm:h-8 xl:border-gray-200 " src='https://img.freepik.com/free-icon/important-person_318-10744.jpg?size=338&ext=jpg' alt="person_icon" />
              <span className="ml-4 font-medium text-gray-200 sm:hidden">{firstName} {lastName}</span>
            </div> */}
            <div className={`${!isOpenProfile ? 'sm:hidden' : 'block'} mt-5 sm:bg-white sm:rounded-lg sm:fixed sm:mt-4 sm:right-0 sm:w-48 sm:py-2 sm:shadow-xl sm:mx-3 sm:z-50`}>
              {/* <Link href={"/addProperty"} >
              <a className="mt-3 block text-gray-400 hover:text-white sm:text-gray-800 sm:px-4 sm:mt-0 sm:py-2 sm:hover:bg-indigo-500">Add Property</a>
              </Link> */}
              <button className="block text-gray-400 hover:text-white sm:text-gray-800 sm:px-4 sm:mt-0 sm:py-2 sm:hover:bg-indigo-500">
                <PropertiCreate identity={identity}/>
                </button>
                              {/* <Link href={"/"} >
                <a className="mt-3 block text-gray-400 hover:text-white sm:text-gray-800 sm:px-4 sm:mt-0 sm:py-2 sm:hover:bg-indigo-500">Login</a>
              </Link> */}
              {/* <Link href={"/"} > */}
              <a href="/" className="mt-3 block text-gray-400 hover:text-white sm:text-gray-800 sm:px-4 sm:mt-0 sm:py-2 sm:hover:bg-indigo-500">Account settings</a>
              {/* </Link> */}
              {/* <Link href={"/"} > */}
              <a href="/" className="mt-3 block text-gray-400 hover:text-white sm:text-gray-800 sm:px-4 sm:mt-0 sm:py-2 sm:hover:bg-indigo-500">Sign Out</a>
              {/* </Link> */}
            </div>
            <button type="button" onClick={() => { setIsOpenProfile(!isOpenProfile) }} className={`${!isOpenProfile ? 'sm:hidden' : 'sm:block'} sm:fixed sm:opacity-1 sm:inset-0 sm:w-full sm:h-full sm:z-40`}></button>

          </div>
        </div>
      </nav>
    </header>
  );
}