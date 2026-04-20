import { useState } from 'react';


import Logo from '../assets/images/logo.svg';
import Clog from '../assets/images/icon-units.svg';
import DropDown from '../assets/images/icon-dropdown.svg';
import CheckMark from '../assets/images/icon-checkmark.svg';

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);


    return (
        <div className="flex justify-between py-4">
            <a href="/">
                <img src={Logo} alt="Weather app logo" />
            </a>
            
            <div className="relative text-neutral-0">

                <button onClick={() => setShowMenu(prev => !prev)} 
                    className={`
                        flex items-center gap-2 px-4 py-2 text-sm font-display rounded-sm bg-neutral-700 text-neutral-0 border
                        ${showMenu ? "border-neutral-500" : "border-transparent"}
                    `}>
                    <img src={Clog} alt="clog icon" />
                    Units
                    <img src={DropDown} alt="clog icon" />
                </button>

                {showMenu && (
                    <div className="absolute top-[calc(100%+4px)] right-0 flex flex-col p-1 bg-neutral-700 w-[175%] rounded text-sm border border-neutral-500">
                        <button className='flex item-center justify-between px-3 py-2 hover:bg-neutral-600 transition rounded'>Switch to Imperial</button>

                        <div className="flex flex-col border-b border-neutral-600">
                            <h4 className="text-sm text-neutral-300 px-3 pt-1.5 pb-1">Temperature</h4>
                            <div className="flex flex-col gap-0.5">
                                <button className='flex item-center justify-between px-3 py-2 bg-neutral-600 hover:bg-neutral-600 transition rounded'>
                                    Celsius (°C)
                                    <img src={CheckMark} alt="" />
                                </button>
                                <button className='flex item-center justify-between px-3 py-2 hover:bg-neutral-600 transition rounded'>
                                    Fahrenheit  (°F)
                                    {/* <img src={CheckMark} alt="" /> */}
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex flex-col border-b border-neutral-600">
                            <h4 className="text-sm text-neutral-300 px-3 pt-1.5 pb-1">Wind Speed</h4>
                            <div className="flex flex-col gap-0.5">
                                <button className='flex item-center justify-between px-3 py-2 bg-neutral-600 hover:bg-neutral-600 transition rounded'>
                                    km/h
                                    <img src={CheckMark} alt="" />
                                </button>
                                <button className='flex item-center justify-between px-3 py-2 hover:bg-neutral-600 transition rounded'>
                                    mph
                                    {/* <img src={CheckMark} alt="" /> */}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h4 className="text-sm text-neutral-300 px-3 pt-1.5 pb-1">Precipitation</h4>
                            <div className="flex flex-col gap-0.5">
                                <button className='flex item-center justify-between px-3 py-2 bg-neutral-600 hover:bg-neutral-600 transition rounded'>
                                    Millimiters (mm)
                                    <img src={CheckMark} alt="" />
                                </button>
                                <button className='flex item-center justify-between px-3 py-2 hover:bg-neutral-600 transition rounded'>
                                    Inches (in)
                                    {/* <img src={CheckMark} alt="" /> */}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                
                
            </div>
        </div>
    )
}

export default Navbar
