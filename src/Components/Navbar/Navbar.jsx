import { useAuth } from "@/Context/AuthContext";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "About", href: "#", current: false },
  { name: "Services", href: "#", current: false },
  { name: "Media", href: "#", current: false },
  { name: "Contact Us", href: "#", current: false },
  { name: "Bank Details", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <Disclosure as="nav" className="bg-gray-100">
      {({ open }) => (
        <>
          {/* Top Bar */}
          <div className="bg-gray-50 py-2 px-4 text-sm">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex gap-4">
                <a href="mailto:info@example.com" className="text-gray-600">
                  info@example.com
                </a>
                <a href="tel:123456789" className="text-gray-600">
                  +123 456 789
                </a>
              </div>
              <div className="flex gap-4">
                <span>Visit our other websites:</span>
                <div className="flex gap-2">
                  <button className="text-gray-600 hover:text-blue-500">🇬🇧</button>
                  <button className="text-gray-600 hover:text-blue-500">🇺🇸</button>
                  <button className="text-gray-600 hover:text-blue-500">🇨🇦</button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navbar */}
          <div className="container mx-auto">
            <div className="flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <img
                  src="https://saylaniwelfare.com/static/media/logo_saylaniwelfare.22bf709605809177256c.png"
                  alt="Logo"
                  className="h-12"
                />
              </div>
              <div className="hidden md:flex items-center gap-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-[#0d6db7] px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </a>
                ))}
                {user && (
                  <div className="flex items-center gap-4">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="flex items-center bg-[#0d6db7] text-white py-2 px-4 rounded-full">
                        <span>{user.name}</span>
                      </Menu.Button>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => console.log("Profile")}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "w-full text-left px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Profile
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={logout}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "w-full text-left px-4 py-2 text-sm text-red-600"
                                  )}
                                >
                                  Logout
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <Link to="/dashboard">
                      <button className="bg-[#0d6db7] text-white px-4 py-2 rounded-md hover:bg-[#0d6db7]">
                        Dashboard
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-[#0d6db7] hover:text-white hover:bg-[#0d6db7]">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#0d6db7] hover:bg-[#0d6db7] hover:text-white"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {user && (
                <div className="space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-[#0d6db7] hover:bg-[#0d6db7] hover:text-white"
                  >
                    Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    onClick={logout}
                    className="block w-full text-base px-3 py-2 rounded-md font-medium text-red-600 hover:bg-red-700 hover:text-gray-300"
                  >
                    Logout
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-[#0d6db7] hover:bg-[#0d6db7] hover:text-white"
                  >
                    Dashboard
                  </Disclosure.Button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
