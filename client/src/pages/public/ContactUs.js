import React, { useState } from "react";
import emailjs from 'emailjs-com';
import logo from '../../images/logo2.png'

import { Link } from "react-router-dom";

const Result = () => {
    return (
        <p>Your Message has been Successfully sent.We will Contact You Soon</p>
    )
}

function ContactUs() {
    const [show, setShow] = useState(false);
    const [result, setResult] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();



        emailjs.sendForm(
            'service_rib4vza',
            'template_nwa6bnn',
            e.target,
            'user_MoLNCZl00zCwszKGitBBv').then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }

            )
        e.target.reset();
        setResult(true)
    };

    setTimeout(() => {
        setResult(false);
    }, 5000)
    return (
        <div className="bg-gradient-to-b from-purple-600 to-indigo-700 h-96 w-full">
            <div className="md:px-20 px-4 py-8">
                <div className="flex items-center justify-between">
                    <div>
                        <img className="w-16" src={logo} alt="" />

                    </div>
                    <div className="hidden lg:flex items-center">
                        <p tabIndex={0} role="button" className="text-base focus:outline-none focus:ring-1 p-2 focus:ring-offset-1 focus:ring-white hover:text-gray-300 font-medium mr-10 leading-4 text-white">
                            <Link to='/'>Home</Link>
                        </p>

                        <p tabIndex={0} role="button" className="text-base focus:outline-none focus:ring-1 p-2 focus:ring-offset-1 focus:ring-white hover:text-gray-300 font-medium mr-10 leading-4 text-white">
                            <Link to='/login'>Login</Link>
                        </p>
                        <p tabIndex={0} role="button" className="text-base focus:outline-none focus:ring-1 p-2 focus:ring-offset-1 focus:ring-white hover:text-gray-300 font-medium mr-10 leading-4 text-white">
                            <Link to='/dashboard'>Dashboard</Link>
                        </p>


                    </div>
                    <div className="lg:hidden text-white" onClick={() => setShow(!show)}>
                        {show ? (
                            <div id="close" className=" close-m-menu" onclick="MenuHandler(false)">
                                <svg aria-label="Close" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={18} y1={6} x2={6} y2={18} />
                                    <line x1={6} y1={6} x2={18} y2={18} />
                                </svg>
                            </div>
                        ) : (
                            <svg id="open" onclick="MenuHandler(true)" aria-haspopup="true" aria-label="Main Menu" xmlns="http://www.w3.org/2000/svg" className="show-m-menu icon icon-tabler icon-tabler-menu" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1={4} y1={8} x2={20} y2={8} />
                                <line x1={4} y1={16} x2={20} y2={16} />
                            </svg>
                        )}
                    </div>
                </div>
                {show && (
                    <nav className="lg:hidden relative z-40">
                        <div className="w-full">
                            <div className="visible flex items-center">
                                <ul id="list" className=" p-2 bg-white absolute rounded top-0 left-0 right-0 shadow mt-6">


                                    <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                        <Link to='/'>Home</Link>
                                    </li>

                                    <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                        <Link to='/login'>Login</Link>
                                    </li>
                                    <li className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center" onclick="dropdownHandler(this)">

                                    </li>
                                    <li className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center" onclick="dropdownHandler(this)">

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                )}
            </div>
            <form onSubmit={sendEmail}>
                <div className="w-full flex items-center justify-center my-12">
                    <div className="absolute top-40 bg-white shadow rounded py-12 lg:px-28 px-8">
                        <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">Let’s chat and get a quote!</p>
                        <div className="md:flex items-center mt-12">
                            <div className="md:w-72 flex flex-col">
                                <label className="text-base font-semibold leading-none text-gray-800">Name</label>
                                <input tabIndex={0} arial-label="Please input name" type="name" name='name' className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input  name" required />
                            </div>
                            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="text-base font-semibold leading-none text-gray-800">Email Address</label>
                                <input tabIndex={0} arial-label="Please input email address" type="name" name='email' className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input email address" required />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-8">
                            <div className="md:w-72 flex flex-col">
                                <label className="text-base font-semibold leading-none text-gray-800">Company name</label>
                                <input tabIndex={0} role="input" arial-label="Please input company name" type="name" name="company_name" className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 " placeholder="Please input company name" />
                            </div>
                            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="text-base font-semibold leading-none text-gray-800">Phone</label>
                                <input tabIndex={0} arial-label="Please input country name" type="number" name='phone' className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input country name" />
                            </div>
                        </div>
                        <div>
                            <div className="w-full flex flex-col mt-8">
                                <label className="text-base font-semibold leading-none text-gray-800">Message</label>
                                <textarea tabIndex={0} aria-label="leave a message" role="textbox" type="name" name='message' className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none" defaultValue={""} />
                            </div>
                        </div>
                        {/* <p className="text-xs leading-3 text-gray-600 mt-4">By clicking submit you agree to our terms of service, privacy policy and how we use data as stated</p> */}

                        <div className='row'>
                            {result ? <Result /> : null}
                        </div>

                        <div className="flex items-center justify-center w-full">
                            <button type="submit" value='send' className="mt-9 text-base hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded  focus:outline-none">SUBMIT</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ContactUs;














































// import React, { useState } from 'react';
// import emailjs from 'emailjs-com'
// import img from '../../images/img.jpg'
// import Footer2 from '../../components/Footer/Footer2';




// const Result = () => {
//     return (
//         <p>Your Message has been Successfully sent.We will Contact You Soon</p>
//     )
// }

// function ContactUs() {

//     const [result, setResult] = useState(false);
//     const sendEmail = (e) => {
//         e.preventDefault();



//         emailjs.sendForm(
//             'service_rib4vza',
//             'template_nwa6bnn',
//             e.target,
//             'user_MoLNCZl00zCwszKGitBBv').then(
//                 (result) => {
//                     console.log(result.text);
//                 },
//                 (error) => {
//                     console.log(error.text);
//                 }

//             )
//         e.target.reset();
//         setResult(true)
//     };

//     setTimeout(() => {
//         setResult(false);
//     }, 5000)
//     return (
//         <>


//             <div className="container mx-auto pt-16 px-4 h-full">
//                 <div className="flex content-center items-center justify-center h-full">
//                     <div className="w-full lg:w-6/12   px-4">
//                         <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
//                             <div className="rounded-t mb-0 px-6 py-6">
//                                 <div className="text-center mb-3">
//                                     <h3 class="text-blueGray-500  font-bold">
//                                         Contact US
//                                     </h3>
//                                 </div>

//                                 <hr className="mt-6 border-b-1 border-blueGray-300" />
//                             </div>
//                             <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

//                                 <form onSubmit={sendEmail}>
//                                     <div className="relative w-full mb-3">
//                                         <label
//                                             className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                                             htmlFor="grid-password"
//                                         >
//                                             Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name='name'
//                                             className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                             placeholder="Name"
//                                             required
//                                         />
//                                     </div>

//                                     <div className="relative w-full mb-3">
//                                         <label
//                                             className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                                             htmlFor="grid-password"
//                                         >
//                                             Email
//                                         </label>
//                                         <input
//                                             type="email"
//                                             name='email'
//                                             className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                             placeholder="Email"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="relative w-full mb-3">
//                                         <label
//                                             className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                                             htmlFor="grid-password"
//                                         >
//                                             Phone
//                                         </label>
//                                         <input
//                                             type="number"
//                                             name='phone'
//                                             className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                             placeholder="Phone"
//                                             required
//                                         />
//                                     </div>

//                                     <div className="relative w-full mb-3">
//                                         <label
//                                             className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                                             htmlFor="grid-password"
//                                         >
//                                             Message
//                                         </label>
//                                         <textarea
//                                             type="text"
//                                             name='message'
//                                             rows='4'
//                                             className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                             placeholder='Write Your Message'
//                                             required

//                                         />


//                                     </div>
//                                     <div class="mt-8">
//                                         <button
//                                             type='submit'
//                                             value='send'
//                                             class="uppercase hover:bg-green-700 focus:ring-4 focus:ring-blue-300 text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
//                                             Send Message
//                                         </button>
//                                     </div>
//                                     <br />
//                                     <div className='row'>
//                                         {result ? <Result /> : null}



//                                     </div>
//                                 </form>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <Footer2 />





//         </>
//     );
// };

// export default ContactUs