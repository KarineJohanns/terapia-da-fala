import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import Hamburger from 'hamburger-react';
import { Link } from 'react-router-dom';

interface MenuItem {
    title: string;
    subItems?: { title: string; color: string; path: string }[];
}

const menuItems: MenuItem[] = [
    { title: 'Home' },
    {
        title: 'Respiração',
        subItems: [
            { title: 'Exercício 3-12-6', color: 'bg-gray-100', path: '/Respiracao3126' },
        ],
    },
    {
        title: 'Sílabas',
        subItems: [
            { title: 'Pra-Tra-Cra', color: 'bg-gray-100', path: '/Pratracra' },
            { title: 'Bra-Dra-Gra', color: 'bg-gray-100', path: '/Bradragra' },
        ],
    },
];

// Componente para o Submenu
const Submenu: React.FC<{ subItems: { title: string; color: string; path: string }[]; closeMenu: () => void }> = ({ subItems, closeMenu }) => (
    <Transition
        show={true}
        enter="transition-all duration-300"
        enterFrom="max-h-0 opacity-0"
        enterTo="max-h-40 opacity-100"
        leave="transition-all duration-300"
        leaveFrom="max-h-40 opacity-100"
        leaveTo="max-h-0 opacity-0"
    >
        <ul className="overflow-hidden">
            {subItems.map((subItem, subIndex) => (
                <li key={subIndex} className={`py-2 pl-4 ${subItem.color} text-gray-800`}>
                    <Link to={subItem.path} className="block" onClick={closeMenu}>
                        {subItem.title}
                    </Link>
                </li>
            ))}
        </ul>
    </Transition>
);

const Menu: React.FC = () => {
    const [isOpen, setOpen] = useState(false);
    const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

    const toggleMenu = () => {
        setOpen(!isOpen);
    };

    const toggleSubmenu = (index: number) => {
        setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    return (
        <div className="flex">
            {/* Botão Hamburger */}
            <div className="m-4">
                <Hamburger
                    rounded
                    direction="right"
                    toggled={isOpen}
                    toggle={setOpen}
                    label="Show menu"
                />
            </div>

            {/* Sidebar */}
            <Transition
                show={isOpen}
                enter="transition-transform transform duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform transform duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
                className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30"
            >
                <div className="flex flex-col h-full p-4">
                    <div className="flex items-center justify-between h-16 p-4">
                        <h2 className="text-lg font-semibold">Menu</h2>
                        <Hamburger
                            rounded
                            direction="right"
                            toggled={isOpen}
                            toggle={setOpen}
                            label="Close menu"
                            size={16}
                        />
                    </div>

                    <nav className="mt-4">
                        <ul>
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    {item.subItems ? (
                                        <>
                                            <button
                                                onClick={() => toggleSubmenu(index)}
                                                className="cursor-pointer text-gray-800 hover:text-blue-600 py-2 flex items-center justify-between w-full text-left"
                                                aria-haspopup="true"
                                                aria-expanded={openSubmenuIndex === index}
                                            >
                                                <span>{item.title}</span>
                                                <svg
                                                    className={`w-4 h-4 transition-transform duration-300 ${openSubmenuIndex === index ? 'rotate-90' : 'rotate-0'}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                            {openSubmenuIndex === index && <Submenu subItems={item.subItems} closeMenu={closeMenu} />}
                                        </>
                                    ) : (
                                        <Link
                                            to="/"
                                            className="cursor-pointer text-gray-800 hover:text-blue-600 py-2 flex items-center justify-between"
                                            onClick={closeMenu}
                                        >
                                            <span>{item.title}</span>
                                            {/* A seta não é mostrada para o item "Home" */}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </Transition>

            {/* Background Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-20"
                    onClick={toggleMenu}
                />
            )}
        </div>
    );
};

export default Menu;
