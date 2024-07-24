import { DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const Header = () => {
    const router = useRouter();
    const { data: sessionData } = useSession();

    return (
        <nav className="bg-white px-2 sm:px-4 py-5 dark:bg-gray-800 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <Navbar fluid={true} rounded={true}>
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <Navbar.Brand href="/">
                        <span className="self-center whitespace-nowrap text-xl font-semibold text-blue-600">
                            Salesforce JS Demo
                        </span>
                    </Navbar.Brand>

                    <div className="flex md:order-2 gap-5">
                        <DarkThemeToggle />
                        <Dropdown
                            arrowIcon={true}
                            inline={true}
                            label={
                                <div className="flex py-2">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </div>
                            }>
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {sessionData?.user?.name}
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    {sessionData?.user?.email}
                                </span>
                            </Dropdown.Header>
                            <Dropdown.Item
                                onClick={() =>
                                    router.push(
                                        'https://github.com/kormco/bd24-demo2'
                                    )
                                }>
                                Github
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => signOut()}>
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>
                        <Navbar.Toggle />
                    </div>
                </div>
            </Navbar>
        </nav>
    );
};

export default Header;
