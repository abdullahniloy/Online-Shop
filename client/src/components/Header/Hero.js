import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from '../../images/logo.png'
import SingleShop from "../SingleShop/SingleShop";
import { useHistory } from "react-router-dom";
import AllShop from "../SingleShop/AllShop";
const Hero = ({ resuts }) => {
    const [show, setShow] = useState(false);
    const { user, logOut, userType } = useAuth()
    const [q, setQ] = useState('')
    const { isLoading, data } = resuts


    const history = useHistory()
    const takeToShop = (id) => {
        history.push(`shop-no/${id}`)
    }

    // show cart page logic
    const getCart = window.sessionStorage.getItem("cartProduct");
    const currentCart = JSON.parse(getCart)

    const search = (data) => {
        console.log(data.filter(item=> item.name.toLowerCase().indexOf(q) > -1 ) )
        return data.filter(item=> item.name.toLowerCase().indexOf(q) > -1 )
    }

    return (
        <div>
            <div className="bg-gray-100 overflow-y-hidden" style={{ minHeight: 700 }}>
                {/* Code block starts */}
                <dh-component>
                    <nav className="w-full border-b">
                        <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
                            <div aria-label="Home. logo" role="img" onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
                                <img className="w-16" src={logo} alt="logo" />
                            </div>
                            <div>
                                <button onClick={() => setShow(!show)} className={`${show ? 'hidden' : ''} sm:block md:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500`}>
                                    <svg aria-haspopup="true" aria-label="open Main Menu" xmlns="http://www.w3.org/2000/svg" className="md:hidden icon icon-tabler icon-tabler-menu" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={4} y1={8} x2={20} y2={8} />
                                        <line x1={4} y1={16} x2={20} y2={16} />
                                    </svg>
                                </button>
                                <div id="menu" className={` ${show ? '' : 'hidden'} md:block lg:block `}>
                                    <button onClick={() => setShow(!show)} className={`block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 top-0 mt-6`}>
                                        <svg aria-label="close main menu" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <line x1={18} y1={6} x2={6} y2={18} />
                                            <line x1={6} y1={6} x2={18} y2={18} />
                                        </svg>
                                    </button>
                                    <ul className="flex text-3xl md:text-base items-center py-10 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent z-20">
                                        {user?.email ?
                                            <li className="font-bold text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0">
                                                Welcome <Link to='/dashboard'>  {user.username || user.email}</Link>
                                            </li>
                                            :
                                            <>
                                                <li className="font-bold text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0">
                                                    <Link to='/login'>Login</Link>
                                                </li>
                                                <li className="font-bold text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                                                    <Link to='/register'>Register</Link>
                                                </li>
                                            </>
                                        }
                                        <li className="font-bold text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                                            <input placeholder="Search" type='text' value={q} onChange={(e) => setQ(e.target.value)} />
                                        </li>
                                        <li className="font-bold text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                                            <Link to='/dashboard'>Dashboard</Link>
                                        </li>
                                        <li className=" font-bold text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                                            <Link to='/contactUs'>Contact Us</Link>
                                        </li>
                                        {(user?.email && currentCart !== null && userType === 'Customer') &&
                                            <li style={{ color: 'blue' }} className=" font-bold text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10" >
                                                <Link to='/cart'>Cart</Link>
                                            </li>
                                        }
                                        {user?.email &&
                                            <li style={{ color: 'red' }} className=" font-bold text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10" onClick={logOut}>
                                                Log Out
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="bg-gray-100">
                        <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
                            <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
                                    <span className="text-indigo-700">Onek Dokan</span>
                                    <span className="text-indigo-700"> {isLoading && 'Loading'} </span>

                                    {/* single shop component  */}

                                    <div className="pb-16">
                                        <div className="flex justify-center items-center">
                                            <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
                                                <div className="flex flex-col jusitfy-center items-center space-y-10">
                                                    <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 md:gap-x-8 h-full  w-full">
                                                        {!isLoading &&
                                                            <AllShop resuts={search(resuts?.data?.data)} takeToShop={takeToShop} />

                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </h3>

                            </div>
                        </div>
                    </div>
                </dh-component>
                {/* Code block ends */}
            </div>
        </div >
    )
}

export default Hero
