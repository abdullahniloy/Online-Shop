import React from 'react';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup'
import axios from "axios";
import { useHistory, useLocation } from 'react-router'
import { Link } from 'react-router-dom';

const Register = () => {
    const initialValues = {
        email: '',
        password: '',
        type: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("You must input a Email!"),
        password: Yup.string().min(4).required(),
        type: Yup.string().required('You Must select a Role'),
    })

    const history = useHistory()
    const location = useLocation()

    const redirect_uri = location.state?.from || '/'

    const onSubmit = (data) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth`, data).then((res) => {
            if (res.data.error) {
                alert(res.data.error);
            } else {
                history.push('/login')
            }
        });
    }
    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                    <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Register Your Account</div>

                    <div className="relative mt-10 h-px bg-gray-300">
                        <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                            <span className="bg-white px-4 text-xs text-gray-500 uppercase">Or Register With Email</span>
                        </div>
                    </div>
                    <div className="mt-10">
                        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                            <Form>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>

                                        <Field id="email" type="email" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address" />
                                        <ErrorMessage className='mt-2' style={{color:'red'}} name="email" component="span" />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                            <span>
                                                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </span>
                                        </div>

                                        <Field id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" />
                                        <ErrorMessage className='mt-2' style={{color:'red'}} name="email" component="span" />
                                    </div>
                                </div>


                                <div class="flex flex-col w-full px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                        Role
                                    </label>
                                    <div class="relative">
                                        <Field as="select" name="type" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                            <option value=''>Please Select A role</option>
                                            <option value={'ShopKeeper'}>Shop Keeper</option>
                                            <option value={'Customer'}>Customer</option>
                                        </Field>
                                        <ErrorMessage className='mt-2' style={{color:'red'}} name="type" component="span" />
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center mb-6 mt-4">
                                    <div className="flex ml-auto">
                                        <a href="#" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</a>
                                    </div>
                                </div>

                                <div className="flex w-full">
                                    <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-purple-600 hover:bg-purple-700 rounded py-2 w-full transition duration-150 ease-in">
                                        <span className="mr-2 uppercase">Register</span>
                                        <span>
                                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <Link to='/login' className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                            <span>
                                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </span>
                            <span className="ml-2">Have An Account? Log In now.</span>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <Link to='/'> GO Back</Link>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Register;