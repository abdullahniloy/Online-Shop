import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const EditProduct = () => {

    const { id } = useParams()

    const history = useHistory()

    const [product, setProduct] = useState({})
    const [shopList, setShopList] = useState({})
    const [productCatagoryList, setProductCatagoryList] = useState({})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/edit-products/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then(res => {
            setProduct(res.data.product)
            setShopList(res.data.shopList)
            setProductCatagoryList(res.data.productCatagoryList)
            setLoading(false)
        })
    }, [])

    /// form releated work
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(4).max(20).required("You must input a Name!"),
        price: Yup.number().integer().required('Please Fill the form'),
        discount: Yup.number().integer().required('Please Fill the form'),
        ShopId: Yup.number().integer().required('Please Fill the form'),
        ProductCatagoryId: Yup.number().integer().required('Please Fill the form'),
    });
    const initialValues = {
        name: product.name || '',
        price: product.price || '',
        discount: product.discount || '',
        image: product.image || '',
        ShopId: product.ShopId || '',
        ProductCatagoryId: product.ProductCatagoryId || ''
    }
    const onSubmit = (data, onSubmitProps) => {
        console.log(data)
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/products/edit-products/${product.id}`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then(res => {
            if (res.data.error) {
                alert("Failed")
            }
            else {
                alert('product Edited')
                history.push('/dashboard/show-all-products')
            }

        })
    }

    console.log(product.name)

    if (loading) {
        return (
            <>
                <div className='mt-24'>
                    <h1 style={{ color: 'red' }} className='text-center font-bold text-2xl'>Please Add Shop AND PRODUCT</h1>

                </div>
            </>
        )
    }

    return (
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form className="mt-24 p-12">
                <h1 className='text-center font-bold text-2xl'>Edit Product</h1>

                <div className="mb-6">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Add Product Name {product.name}
                    </label>
                    <Field type="text" defaultValue={product.name} id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <ErrorMessage style={{ color: 'red' }} name="name" component="span" />
                </div>
                <div className="mb-6">
                    <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Add Price for 1 or Single item
                    </label>
                    <Field type="number" defaultValue={product.price} id="price" name='price' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <ErrorMessage style={{ color: 'red' }} name="price" component="span" />
                </div>

                <div className="mb-6">
                    <label for="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Discount
                    </label>
                    <Field type="number" defaultValue={product.discount} id="discount" name='discount' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <ErrorMessage style={{ color: 'red' }} name="discount" component="span" />
                </div>
                <div className="mb-6">
                    <label for="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Image
                    </label>
                    <Field type="text" id="image" defaultValue={product?.image} name='image' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Image" />
                    <ErrorMessage style={{ color: 'red' }} name="image" component="span" />
                </div>

                <div className="mb-6">
                    <Field as="select" name="ShopId" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        {/* <option value={product.ShopId}>{product.Shop.name}</option> */}
                        {shopList.length > 1 && shopList.map(item =>
                            <>
                                <option value={item.id}>{item.name}</option>

                            </>
                        )}
                    </Field>
                    <ErrorMessage className='mt-2' style={{ color: 'red' }} name="ShopId" component="span" />
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
                <div className="mb-6">
                    <Field as="select" name="ProductCatagoryId" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        {/* <option value={product.ProductCatagoryId}>{product.ProductCatagory.name}</option> */}
                        {productCatagoryList.length > 1 && productCatagoryList.map(item =>
                            <>
                                <option value={item.id}>{item.name}</option>

                            </>
                        )}

                    </Field>
                    <ErrorMessage className='mt-2' style={{ color: 'red' }} name="ProductCatagoryId" component="span" />
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </Form>
        </Formik>
    )
}

export default EditProduct