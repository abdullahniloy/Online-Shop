import React, { useState } from 'react'
import SingelCart from '../../components/Customer/Cart/SingelCart';
import HeroCart from '../../components/Header/HeroCart'
import useAuth from '../../hooks/useAuth';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

const Cart = () => {

    const { user, } = useAuth()
    const history = useHistory()
    const getCart = window.sessionStorage.getItem("cartProduct");
    const currentCart = JSON.parse(getCart)

    const sum = []
    if (currentCart !== null) {
        currentCart.map(item => sum.push(item.price * item.quantity))
    }
    const totalSum = sum.reduce((a, b) => a + b, 0)

    // const placeOrder = async () => {
    //     if (currentCart === null) {
    //         return
    //     }
    //     const data = { total_cost: totalSum, currentCart: currentCart }
    //     await axios.post(`${process.env.REACT_APP_BACKEND_URL}/placeorder`, data, {
    //         headers: {
    //             accessToken: localStorage.getItem("accessToken"),
    //         }
    //     }).then((res) => {
    //         sessionStorage.removeItem('cartProduct')
    //         history.push('/')
    //     });
    // }

    async function handleToken(token, addresses) {
        if (currentCart === null) {
            return
        }
        const data = { total_cost: totalSum, currentCart: currentCart, token: token }

        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/placeorder`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }
        );
        const { status } = response.data;
        if (status === "success") {
            toast("Success! Check email for details", { type: "success" });
            alert('Order Placed')
            sessionStorage.removeItem('cartProduct')
            history.push('/')
            // console.log("From here:");

        } else {
            toast("Something went wrong", { type: "error" });
        }
    }
    return (
        <>
            <HeroCart />
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                <div className="flex justify-start item-start space-y-2 flex-col ">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order #13432</h1>
                    <p className="text-base font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p>
                </div>
                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>

                            {currentCart.map(cart => <SingelCart key={cart.id} cart={cart} />)}
                        </div>



                        <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div className="flex justify-between  w-full">
                                        <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                        <p className="text-base leading-4 text-gray-600">${totalSum}</p>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base leading-4 text-gray-800">Shipping</p>
                                        <p className="text-base leading-4 text-gray-600">$0</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                    <p className="text-base font-semibold leading-4 text-gray-600">${totalSum}</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                <h3 className="text-xl font-semibold leading-5 text-gray-800">Order</h3>
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex justify-center items-center space-x-4">
                                        <div class="w-8 h-8">
                                            <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                        </div>
                                        <div className="flex flex-col justify-start items-center"  >
                                            <p className="text-lg leading-6 font-semibold text-gray-800">
                                                Order Now
                                                <br />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center items-center" >
                                    <StripeCheckout
                                        stripeKey="pk_test_51KxmxpGZcKqiV6Jyk2MhxBxkxPN43DWXb5PUL19b7NK8JXBLk5qCKxLCg6QtdNaJ36eOVtBmOGk9vkECmOrFeZ4Q00x0OQ8O5K"
                                        token={handleToken}
                                        amount={totalSum * 100}
                                        name="Onek Dokan Payment"
                                    // billingAddress
                                    // shippingAddress
                                    />
                                    {/* <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                                        Place your Order now</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                        <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
                        <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                    <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                                    <div className=" flex justify-start items-start flex-col space-y-2">
                                        <p className="text-base font-semibold leading-4 text-left text-gray-800">{user?.name || 'Not Given'}</p>
                                        <p className="text-sm leading-5 text-gray-600">10 Items</p>
                                    </div>
                                </div>

                                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="cursor-pointer text-sm leading-5 text-gray-800">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart