import React from "react";

import Drawer from 'react-modern-drawer'

import 'react-modern-drawer/dist/index.css'

export default function Header() {

    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <header class="flex justify-between w-full">
            <div className="flex-1 p-8 pl-12">
                <div className="drawer">
                    <div className={`absolute z-30 text-white drawer-content ${isOpen ? 'italic' : ''} peer-checked:fixed`} onClick={toggleDrawer}>
                        <label className="flex text-lg uppercase border-b-2 cursor-pointer gap-x-1 drawer-button w-max active:italic">
                            <span>M</span><span>e</span><span>n</span><span>u</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="relative flex flex-col items-center flex-1 min-[400px]:-ml-8 max-[400px]:-ml-12">
                <h1 className="uppercase text-white text-2xl text-center flex justify-between w-3/4 max-w-[18rem] sm:w-full mx-auto mt-8">
                    <span>G</span><span>a</span><span>l</span><span>l</span><span>e</span><span>r</span><span>y</span>
                </h1>
                <img src="/assets/logo-white.png" alt="NoMe logo" className="w-3/4 max-w-[18rem] sm:w-full mx-auto mt-8 max-[600px]:hidden" />
            </div>
            <div className="flex justify-end flex-1 pt-8 pr-12 gap-x-8 max-[600px]:hidden">
                <a href="https://#/nome_nft" target="_blank" previewlistener="true">
                    <img src="/assets/twitter-icon.png" alt="" className="hover:opacity-80 transition-all opacity-50 w-[1.6rem] h-[1.6rem] invert" />
                </a>
                <a href="https://discord.gg/nome" target="_blank" previewlistener="true">
                    <img src="/assets/discord-icon.png" alt="" className="hover:opacity-80 transition-all opacity-50 w-[1.6rem] h-[1.6rem] invert" />
                </a>
                <a href="https://#/@nome_nft" target="_blank" previewlistener="true">
                    <img src="/assets/youtube-icon.png" alt="" className="hover:opacity-80 transition-all opacity-50 w-[1.6rem] h-[1.6rem] invert" />
                </a>
            </div>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                zIndex={5}
                className='fixed text-white !bg-transparent'
            >
                <label aria-label="close sidebar" for="my-drawer" className="drawer-overlay"></label>
                <ul className="min-h-full pt-24 w-80">
                    <li className="mb-4 ml-12 text-left text-base-content hover:text-gray-200">
                        <a aria-current="page" href="/intro" className="router-link-active router-link-exact-active" previewlistener="true">→ verify</a>
                    </li>
                    <li className="mb-4 ml-12 text-left text-base-content hover:text-gray-200">
                        <a aria-current="page" href="/intro" className="router-link-active router-link-exact-active" previewlistener="true">→ mint</a>
                    </li>
                </ul>
            </Drawer>
        </header>
    );
}
