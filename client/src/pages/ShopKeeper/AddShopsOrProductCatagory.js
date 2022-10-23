import React, { useState } from "react";
import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import axios from "axios";
import { useLocation } from "react-router-dom"

function AddShopsOrProductCatagory() {

    const location = useLocation()

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(4).max(20).required("You must input a Name!"),
    });
    const initialValues = {
        name: '',
    }
    const onSubmit = (data, onSubmitProps) => {

        if (location.pathname === '/dashboard/add-shops') {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/shop/add-shop`, data, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then(res => {
                if (res.data.error) {
                    alert("Shop Name Must be uniqe")
                }
                else {
                    alert('Shop Added')
                    onSubmitProps.resetForm()
                }

            })
        }
        else {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/product-catagory/add-product-catagory`, data, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then(res => {
                console.log(res)
                if (res.data.error) {
                    alert("Please try again")
                }
                else {
                    alert('Product Catagory Added')
                    onSubmitProps.resetForm()
                }

            })
        }

    }

    return (
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form className="mt-24 p-12">
                <div className="mb-6">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {location.pathname === '/dashboard/add-shops' ? 'Add Shop Name' : 'Add Product Catagory'}
                    </label>
                    <Field type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please Give a Name" />
                    <ErrorMessage style={{ color: 'red' }} name="name" component="span" />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </Form>
        </Formik>

    );
}

export default AddShopsOrProductCatagory;
