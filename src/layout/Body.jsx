import React, { useState } from 'react'
import { getAddress, signTransaction, signMessage } from "sats-connect";

import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { useUserContext } from "../Context/UserContext";

import getBtcInfo from '../utils/GetBtcInfo';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const TEST_VERSION = true;

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

export default function Body() {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [walletOpen, setWalletOpen] = useState(false);
    const [verified, setVerified] = useState(true);
    const [mint, setMint] = useState(false);

    if (userSession.isUserSignedIn()) {
        const cardinalAddress = userSession.loadUserData().profile.btcAddress.p2wpkh.mainnet;
        const ordinalAddress = userSession.loadUserData().profile.btcAddress.p2tr.mainnet;
    }

    const {
        paymentAddress,
        setPaymentAddress,
        setOrdinalsAddress,
        setPaymentDerivationPath,
        setOrdinalDerivationPath,
        setUseWallet,
        setPaymentPublicKey,
        setOrdinalsPublicKey,
    } = useUserContext();

    const handleOpen = () => setWalletOpen((cur) => !cur);
    const disconnect = () => {
        setPaymentAddress("");
        setOrdinalsAddress("");
        setPaymentDerivationPath("");
        setOrdinalDerivationPath("");
        setUseWallet(0);
    };

    const connectLeatherWallet = async () => {
        try {
            const userAddresses = await window.btc?.request('getAddresses');

            const usersNativeSegwitAddress = userAddresses.result.addresses
                .find(address => address.type === 'p2wpkh');

            console.log('usersNativeSegwitAddress ==> ', usersNativeSegwitAddress);
            // let judge = await getBtcInfo(usersNativeSegwitAddress.address, 'MEMZ');
            let judge = 1000;

            if (judge != 0) {
                setOrdinalsAddress(usersNativeSegwitAddress.address);
                setOrdinalsPublicKey(usersNativeSegwitAddress.publicKey);
                setPaymentAddress(usersNativeSegwitAddress.address);
                setPaymentPublicKey(usersNativeSegwitAddress.publicKey);
                setVerified(true);
                onCloseModal();

                toast.success("Connecting successfully");
            } else {
                toast.warn("Not enough NOME tokens");
            }
        } catch (error) {
            console.log('error ==> ', error);
            toast.warn("Please install the leather wallet in your browser");
        }
    }

    const connectUnisatWallet = async () => {
        try {
            let accounts = await window.unisat.requestAccounts();
            console.log('connect success', accounts);

            // const judge = await getBtcInfo(accounts[0], 'MEMQ');
            let judge = 1000;
            if (judge) {
                toast.success("Connecting successfully");
                setPaymentAddress(accounts[0]);
                setOrdinalsAddress(accounts[0]);
                setVerified(true);
                onCloseModal();
            } else {
                toast.warn("Not enough NOME tokens");
                setVerified(false);
            }

        } catch (e) {
            console.log('connect failed', e);
            toast.warn("Please install the unisat wallet in your browser");
        }
    }

    const connectXverseWallet = async () => {
        try {
            console.log('Xverse wallet connection ==> ')
            const getAddressOptions = {
                payload: {
                    purposes: ["ordinals", "payment"],
                    message: "Address for receiving Ordinals",
                    network: {
                        type: TEST_VERSION ? "Testnet" : "Mainnet",
                    },
                },
                onFinish: async (response) => {
                    console.log('response ==> ', response);

                    // const judgeCount = await getBtcInfo(response.addresses[0].address, 'MEMQ')
                    let judgeCount = 1000;
                    if (judgeCount) {
                        setOrdinalsAddress(response.addresses[0].address);
                        setOrdinalsPublicKey(response.addresses[0].publicKey);
                        setPaymentAddress(response.addresses[1].address);
                        setPaymentPublicKey(response.addresses[1].publicKey);
                        setUseWallet(1);
                        handleOpen();
                        onCloseModal();
                        toast.success("Connecting successfully");
                        setVerified(true);
                    } else {
                        toast.warn("Not enough NOME tokes");
                    }
                },
                onCancel: () => {
                    // alert("Request canceled");
                    toast.warn("Connecting canceled");
                },
                onError: (err) => {
                    toast.warn(err);
                },
            };
            await getAddress(getAddressOptions).catch((err) => {
                toast.error(err.message);
            });
        } catch (error) {
            console.log('connect error => ', error);
            toast.warn("Please insatll the Xverse wallet!!");
        }
    };

    // Carousel
    const [popup, setPopup] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const setOpenPopup = (index) => {
        setPopup(true);
        setActiveIndex(index);
    }

    const responsive = {
        0: { items: 1 },
        568: { items: 3 },
        1024: { items: 5 },
    };

    const items = [
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(1)}
            data-value="1"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/1.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(2)}
            data-value="2"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/2.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(3)}
            data-value="3"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/3.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(4)}
            data-value="4"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/4.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(5)}
            data-value="5"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/5.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(6)}
            data-value="6"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/6.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(7)}
            data-value="7"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/7.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(8)}
            data-value="8"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/8.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(9)}
            data-value="9"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/9.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(10)}
            data-value="10"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/10.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(11)}
            data-value="1"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/11.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(12)}
            data-value="2"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/12.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(13)}
            data-value="3"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/13.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(14)}
            data-value="4"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/14.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(15)}
            data-value="5"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/15.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(16)}
            data-value="6"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/16.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(17)}
            data-value="7"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/17.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(18)}
            data-value="8"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/18.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(19)}
            data-value="9"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/19.webp'></img>
            </div>
        </div>,
        <div
            className="item bg-neutral-800 w-[180px] rounded-xl mx-auto"
            onClick={() => setOpenPopup(20)}
            data-value="10"
        >
            <div className='w-[100px] h-[220px] mx-auto py-[10px]'>
                <img className='w-[100px] h-[200px]' src='/assets/Collection/20.webp'></img>
            </div>
        </div>,
    ];

    const Carousel = () => (
        <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            controlsStrategy="alternate"
        />
    );

    return (
        <div className='w-full'>
            <div className='mx-auto'>
                <img src="/assets/logo-white.png" alt="NoMe logo" className="w-3/4 max-w-[18rem] sm:w-full mx-auto mt-8 min-[600px]:hidden" />
            </div>
            {!verified ?
                <>
                    <div className="max-w-4xl px-8 mx-auto min-[600px]:mt-12 text-xl italic text-center text-white sm:text-3xl sm:mt-28 font-sans-serif">
                        <h2 className="leading-[1.7] tracking-[0.055em]"> Welcome to the NōME gallery – a space for premium 1/1 art and unique digital experiences </h2>
                        <h2 className="mt-9 leading-[1.7] tracking-[0.055em]"> $NOME BRC-20 gives access to gallery <br /> exhibitions and art tools. Verify or buy tokens to enter </h2>
                    </div>
                    <div className="flex flex-col items-center pb-32 mt-16 sm:mt-40" bis_skin_checked="1">
                        <div className="flex flex-col gap-4 sm:flex-row" bis_skin_checked="1">
                            <button className="bg-transparent text-white rounded-lg border border-pink-600 transition-all hover:bg-pink-600 pl-6 py-1 pr-4 tracking-[0.3em] disabled:opacity-50 w-32" onClick={onOpenModal}>
                                VERIFY
                            </button>
                            <a href="https://unisat.io/market/brc20?tick=N0ME" target="_blank" className="bg-transparent text-white rounded-lg border border-pink-600 transition-all hover:bg-pink-600 pl-6 py-1 pr-4 tracking-[0.3em] disabled:opacity-50 w-32 text-center"> BUY </a>
                        </div>
                    </div>
                    <Modal open={open} onClose={onCloseModal} center>
                        <div className="flex flex-col items-center w-full max-w-xs p-8 text-black bg-white rounded shadow opacity-90">
                            <h2 className="mb-8 text-3xl italic font-sans-serif">Select a wallet</h2>
                            <button className="flex items-center w-full px-4 py-2 mb-2 font-semibold transition-all rounded hover:bg-gray-300 gap-x-4" onClick={() => connectXverseWallet()}>
                                <img src="/assets/xverse-icon-0bdef1d4.png" className="h-8" /> Xverse
                            </button>
                            <button className="flex items-center w-full px-4 py-2 mb-2 font-semibold transition-all rounded hover:bg-gray-300 gap-x-4" onClick={() => connectUnisatWallet()}>
                                <img src="/assets/unisat-icon-df84ba56.png" className="h-8" /> Unisat
                            </button>
                            <button className="flex items-center w-full px-4 py-2 mb-2 font-semibold transition-all rounded hover:bg-gray-300 gap-x-4" onClick={() => connectLeatherWallet()}>
                                <img src="/assets/leather-icon-9a4d5194.png" className="h-8" /> Leather
                            </button>
                        </div>
                    </Modal>
                    <ToastContainer />
                </>
                :
                <div className='px-10'>
                    <div className='flex min-[750px]:flex-row max-[750px]:flex-col w-full justify-between bg-black text-white mt-40 max-[600px]:mt-10 min-[1350px]:px-40 min-[1000px]:px-20 mb-10'>
                        {/* Left Side */}
                        <div className='flex flex-col text-white text-left min-[750px]:w-1/2 max-[750px]:w-full'>
                            <p className='text-[36px] max-[750px]:mx-auto'>
                                CIRCLE WALLS
                            </p>
                            <p className="text-[20px] max-[750px]:mx-auto text-justify">
                                Walls - collectible phone wallpapers
                            </p>
                            {/* List */}
                            <ul className='mt-10 list-disc ml-4 text-[20px] max-[750px]:mx-auto'>
                                <li className='mt-2 text-justify'>
                                    10 unique designs / delegated editions
                                </li>
                                <li className='mt-2 text-justify'>
                                    24 hours each image / supply on demand
                                </li>
                                <li className='mt-2 text-justify'>
                                    0.0002 $BTC / 1,000 $N0ME (~$10)
                                </li>
                            </ul>
                            <div className='flex flex-col w-1/2 ml-10 mt-20 min-[750px]:mb-32 max-[750px]:w-full max-[750px]:mx-auto'>
                                <p className='text-gray-600 text-[28px] text-center'>
                                    {!mint ? <>#1 MINT TIME LEFT</> : <>MINT IS OPEN IN</>}
                                </p>
                                {/* Counter */}
                                <div className='flex flex-row text-white min-[750px]:w-full max-[750px]:w-1/2 max-[750px]:mx-auto justify-center'>
                                    {/* Hour */}
                                    <div className='flex flex-col gap-4'>
                                        <p className='text-[60px]'>48</p>
                                        <p className='-mt-5 text-center text-[24px]'>hours</p>
                                    </div>
                                    <p className='text-[40px] mt-4 mx-6'>:</p>
                                    {/* Minutes */}
                                    <div className='flex flex-col gap-4'>
                                        <p className='text-[60px]'>00</p>
                                        <p className='-mt-5 text-center text-[24px]'>minutes</p>
                                    </div>
                                </div>
                                {/* buttons */}
                                <div className='flex flex-col gap-4 min-[750px]:w-full max-[750px]:w-1/2 max-[400px]:w-2/3 text-white my-20 mx-auto'>
                                    {mint ?
                                        <>
                                            <div className='border border-white rounded-md hover:text-slate-500 p-1 text-center duration-300 cursor-pointer hover:border-slate-500'>
                                                e m a i l
                                            </div>
                                            <div className='border border-white rounded-md hover:text-slate-500 p-1 text-center duration-300 cursor-pointer hover:border-slate-500'>
                                                RECEIVE NOTIFICATION
                                            </div>
                                        </> :
                                        <>
                                            <div className='border border-white rounded-md text-black bg-white hover:text-slate-500 p-1 text-center duration-300 cursor-pointer hover:border-slate-500' onClick={() => onOpenModal()}>
                                                BUY with $N0ME
                                            </div>
                                            <div className='border border-white rounded-md text-black bg-white hover:text-slate-500 p-1 text-center duration-300 cursor-pointer hover:border-slate-500' onClick={() => onOpenModal()}>
                                                BUY with $BTC
                                            </div>
                                        </>}
                                </div>
                            </div>
                        </div>
                        {/* Right Side */}
                        <div className='flex flex-col min-[500px]:w-1/2 max-[500px]:w-3/4 max-[400px]:w-full mx-auto'>
                            <img className='min-[1180px]:min-w-[500px] max-[1180px]:min-w-[400px] max-[870px]:min-w-[300px] max-[700px]:min-w-[0px] scale-100' src='/assets/mobile.png'></img>
                            <div className='w-full mt-8'>
                                {mint ?
                                    <p className='w-2/3 text-white text-center p-1 mx-auto border border-white'>
                                        Minted - 11 editions:
                                    </p> :
                                    <></>
                                }
                            </div>
                        </div>
                    </div>
                    {/* carousel */}
                    <div className='flex flex-col'>
                        <p className='text-white mb-6'>
                            Explre the full collection
                        </p>
                        {/* carousel */}
                        <Carousel />
                        <a
                            className='text-gray-500 text-right'
                            href='https://magiceden.io/ordinals/marketplace/nomeart'
                        >
                            1110 pices Airdropped - Magic Eden
                        </a>
                    </div>
                    {/* Our partners */}
                    <div className='flex flex-col mt-20'>
                        <div className='w-full h-1 border border-t-2 border-b-0 border-l-0 border-r-0 border-gray-600'></div>
                        <p className='text-white italic -mt-4 ml-8'>
                            OUR PARTNERS
                        </p>
                        <div className='flex min-[820px]:flex-row max-[820px]:flex-col items-center justify-between px-4 mb-10'>
                            {/* Left partner */}
                            <div className='flex min-[660px]:flex-row max-[660px]:flex-col justify-start gap-4 my-4'>
                                <div className='flex items-center border border-white px-12 py-2'>
                                    <img src='/assets/Partners/xverse.png' className='w-[60px]'></img>
                                </div>
                                <div className='flex items-center border border-white px-12 py-2'>
                                    <img src='/assets/Partners/unisat.png' className='w-[60px]'></img>
                                </div>
                                <div className='flex items-center border border-white px-12 py-2'>
                                    <img src='/assets/Partners/ordinalsbot.png' className='w-[100px]'></img>
                                </div>
                            </div>
                            {/* Right partner */}
                            <div className="flex flex-row gap-4">
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
                        </div>
                    </div>
                    <Modal open={open} onClose={onCloseModal} center>
                        <div className="flex flex-col items-center w-full max-w-xs p-8 text-black bg-white rounded shadow opacity-90">
                            <h2 className="mb-8 text-3xl italic font-sans-serif">Select a wallet</h2>
                            <button className="flex items-center w-full px-4 py-2 mb-2 font-semibold transition-all rounded hover:bg-gray-300 gap-x-4" onClick={() => connectXverseWallet()}>
                                <img src="/assets/xverse-icon-0bdef1d4.png" className="h-8" /> Xverse
                            </button>
                            <button className="flex items-center w-full px-4 py-2 mb-2 font-semibold transition-all rounded hover:bg-gray-300 gap-x-4" onClick={() => connectUnisatWallet()}>
                                <img src="/assets/unisat-icon-df84ba56.png" className="h-8" /> Unisat
                            </button>
                            <button className="flex items-center w-full px-4 py-2 mb-2 font-semibold transition-all rounded hover:bg-gray-300 gap-x-4" onClick={() => connectLeatherWallet()}>
                                <img src="/assets/leather-icon-9a4d5194.png" className="h-8" /> Leather
                            </button>
                        </div>
                    </Modal>
                    <Modal open={popup} onClose={() => setPopup(false)} center>
                        <img
                            src={`/assets/Collection/${activeIndex}.webp`}
                            className='mt-10'
                        >
                        </img>
                    </Modal>
                    <ToastContainer />
                </div>}
        </div>
    )
}
