import React, { useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from "axios";

const Index = () => {
    const { userAllInfo, setUserAllInfo } = useAuth()
    const initialValues = {
        username: userAllInfo.username || '',
        email: userAllInfo.email || '',
        first_name: userAllInfo.first_name || '',
        last_name: userAllInfo.last_name || '',
        phone_number: userAllInfo.phone_number || '',
        address: userAllInfo.address || '',
        nid: userAllInfo.nid || '',
        bkash_number: userAllInfo.bkash_number || '',
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(4).max(20).required('Please Fill the form'),
        email: Yup.string().email().max(20).required('Please Fill the form'),
        first_name: Yup.string().min(2).max(20).required('Please Fill the form'),
        last_name: Yup.string().min(2).max(20).required('Please Fill the form'),
        phone_number: Yup.number().integer().required('Please Fill the form'),
        address: Yup.string().min(4).max(200).required('Please Fill the form'),
        nid: Yup.number().integer().required('Please Fill the form'),
        bkash_number: Yup.number().integer().required('Please Fill the form'),
    })
    const onSubmit = (data) => {
        // console.log(data)
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/profile/edit-profile`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then(res => {
            if(res.data.error){
                alert('Name Must Be unique')
            }
            else{
                alert('updated')
            }
           
        })

    }
    return (
        <Formik enableReinitialize={true} onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
            <Form id="login" >
                <div className="bg-white dark:bg-gray-800">
                    <div className="container mx-auto bg-white dark:bg-gray-800 rounded">
                        <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5 bg-white dark:bg-gray-800">
                            <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                                <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Profile</p>
                                <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                        <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto">
                            <div className="xl:w-9/12 w-11/12 mx-auto xl:mx-0">
                                <div className="rounded relative mt-8 h-48">
                                    <img src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg" alt className="w-full h-full object-cover rounded absolute shadow" />
                                    <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded" />
                                    <div className="flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer">
                                        <p className="text-xs text-gray-100">Change Cover Photo</p>
                                        <div className="ml-2 text-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={18} height={18} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                                <line x1={16} y1={5} x2={19} y2={8} />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center">
                                        <img src="https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg" alt className="absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0" />
                                        <div className="absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0" />
                                        <div className="cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                                <line x1={16} y1={5} x2={19} y2={8} />
                                            </svg>
                                            <p className="text-xs text-gray-100">Edit Picture</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-16 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full">
                                    <label htmlFor="username" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Username
                                    </label>
                                    <Field type="text" id="username" name="username" defaultValue={userAllInfo.username} className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                                    <ErrorMessage className='mt-2' name="username" style={{ color: 'red' }} component="span" />
                                </div>
                                <div className="mt-8 flex flex-col xl:w-3/5 lg:w-1/2 md:w-1/2 w-full">
                                    <label htmlFor="about" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Address
                                    </label>
                                    <Field as='textarea' id="about" defaultValue={userAllInfo.address} name="address" className="bg-transparent border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-500 dark:text-gray-400" rows={5} />
                                    <p className="w-full text-right text-xs pt-1 text-gray-500 dark:text-gray-400">Character Limit: 200</p>
                                    <ErrorMessage className='mt-2' name="address" style={{ color: 'red' }} component="span" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
                        <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                            <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                                <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Personal Information</p>
                                <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                        <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto pt-4">
                            <div className="container mx-auto">
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                    <label htmlFor="FirstName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        First Name
                                    </label>
                                    <Field type="text" id="FirstName" defaultValue={userAllInfo.first_name} name="first_name" className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                                    <ErrorMessage className='mt-2' name="first_name" style={{ color: 'red' }} component="span" />

                                </div>
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                    <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Last Name
                                    </label>
                                    <Field type="text" id="LastName" defaultValue={userAllInfo.last_name} name="last_name" className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                                    <ErrorMessage className='mt-2' name="last_name" style={{ color: 'red' }} component="span" />

                                </div>
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                    <label htmlFor="Email" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Email
                                    </label>
                                    <div className="border border-green-400 shadow-sm rounded flex">
                                        <div className="px-4 py-3 dark:text-gray-100 flex items-center border-r border-green-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <rect x={3} y={5} width={18} height={14} rx={2} />
                                                <polyline points="3 7 12 13 21 7" />
                                            </svg>
                                        </div>
                                        <Field type="text" id="Email" defaultValue={userAllInfo.email} name="email" className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400" />
                                        <ErrorMessage className='mt-2' name="email" style={{ color: 'red' }} component="span" />

                                    </div>
                                </div>

                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                    <label htmlFor="Country" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Phone Number
                                    </label>
                                    <Field type="number" id="Country" defaultValue={userAllInfo.phone_number} name="phone_number" className="border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                                    <ErrorMessage className='mt-2' name="phone_number" style={{ color: 'red' }} component="span" />

                                </div>
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                    <label htmlFor="State/Province" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        NID
                                    </label>
                                    <Field type="number" id="State/Province" defaultValue={userAllInfo.nid} name="nid" className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                                    <ErrorMessage className='mt-2' name="nid" style={{ color: 'red' }} component="span" />

                                </div>
                                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                    <label htmlFor="Country" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                        Bikash Number
                                    </label>
                                    <Field type="number" id="Country" defaultValue={userAllInfo.bkash_number} name="bkash_number" className="border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" />
                                    <ErrorMessage className='mt-2' name="bkash_number" style={{ color: 'red' }} component="span" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto w-11/12 xl:w-full">
                        <div className="w-full py-4 sm:px-0 bg-white dark:bg-gray-800 flex justify-end">
                            <button className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 dark:bg-gray-700 rounded text-indigo-600 dark:text-indigo-600 px-6 py-2 text-xs mr-4">Cancel</button>
                            <button type="submit" className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm" >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};
export default Index;
