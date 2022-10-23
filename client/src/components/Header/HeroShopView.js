import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from '../../images/logo.png'
import SingleShop from "../SingleShop/SingleShop";
import { useHistory } from "react-router-dom";
import ShowAllProduct from "../Customer/ShowAllProduct/ShowAllProduct";
const HeroShopView = ({ results }) => {
    const [show, setShow] = useState(false);
    const { user, logOut, userType } = useAuth()
    const { isLoading, data } = results


    const history = useHistory()

    // show cart page logic
    const getCart = window.sessionStorage.getItem("cartProduct");
    const currentCart = JSON.parse(getCart)
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
                            {/* <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm">Sign In</button> */}
                        </div>
                    </nav>
                </dh-component>
                <h1 className="text-lg font-semibold p-5 m-5">All Product</h1>
                {isLoading ? <h1 className="text-lg font-semibold p-5 m-5 text-red-600">Loading</h1> :

                    <>

                        <ShowAllProduct results={results} />
                    </>

                }
                {/* Code block ends */}
            </div>
        </div >
    )
}

export default HeroShopView


// https://www.nicepng.com/png/detail/443-4431327_png-file-fa-fa-product-icon.png