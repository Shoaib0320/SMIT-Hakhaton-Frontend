import { useAuth } from '@/Context/AuthContext';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import Style from '@/Styles/styles.module.css'
import { Avatar, Button } from "antd";
import { Mail, Phone } from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {/* <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="size-6" />
                        </button>


                        {user ? (
                            <>
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <Avatar
                                                style={{ background: "#fff", color: "#0782e0" }}
                                                className="flex items-center justify-center"
                                                size={"large"}
                                            >
                                                {user?.name.slice(0, 2).toUpperCase()}
                                            </Avatar>
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <MenuItem>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                {
                                                    user.name
                                                }
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                Your Profile
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                Settings
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            {/* <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                Sign out
                                            </a> 
                                            <button
                                                className="text-white bg-red-500 font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                                                onClick={logout}
                                            >
                                                Logout
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </>
                        ) : (
                            <Link
                                to={"/login"}
                                className={Style.generelButton}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel> */}

            {/* Top Bar */}
            <div className="bg-gray-100 py-2 px-4 text-sm">
                <div className="container mx-auto flex flex-wrap justify-between items-center">
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="mailto:info@saylaniwelfare.com"
                            className="flex items-center gap-2 text-gray-600 hover:text-[#0D6DB7]"
                        >
                            <Mail className="h-4 w-4" />
                            info@saylaniwelfare.com
                        </a>
                        <a
                            href="tel:021-111-729-526"
                            className="flex items-center gap-2 text-gray-600 hover:text-[#0D6DB7]"
                        >
                            <Phone className="h-4 w-4" />
                            021-111-729-526
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Visit Our other websites:</span>
                        <div className="flex gap-2">
                            {["🇬🇧", "🇺🇸", "🇨🇦", "🇹🇷"].map((flag) => (
                                <button
                                    key={flag}
                                    className="hover:opacity-75 transition-opacity"
                                >
                                    {flag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <header className="sticky top-0 bg-white border-b shadow-sm z-50">
                <div className="container mx-auto py-4 px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-12">
                            <img
                                src="https://saylaniwelfare.com/static/media/logo_saylaniwelfare.22bf709605809177256c.png"
                                alt="Saylani Welfare Logo"
                                width={200}
                                height={60}
                                className="h-12 w-auto"
                            />
                            <nav className="hidden md:flex gap-8">
                                <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
                                    About
                                </a>
                                <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
                                    Services
                                </a>
                                <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
                                    Media
                                </a>
                                <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
                                    Contact Us
                                </a>
                                <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
                                    Bank Details
                                </a>
                                <a href="#" className="text-[#8DC63F] hover:text-[#7ab32f]">
                                    Other Websites
                                </a>
                            </nav>
                        </div>
                        {/* <div className="flex gap-4">
                            <Button className="bg-[#0D6DB7] hover:bg-[#0b5a9a]">DONATE NOW</Button>
                            <Button
                                variant="outline"
                                className="border-[#8DC63F] text-[#8DC63F] hover:bg-[#8DC63F] hover:text-white"
                            >
                                BE A SPONSOR
                            </Button>
                        </div> */}
                        {
                            user ?

                                <p>{user.name}</p>

                                :
                                <Link to={'/login'}>
                                    <Button>Login</Button>
                                </Link>
                        }
                    </div>
                </div>
            </header>
        </Disclosure>
    )
}
