import axios from "axios";
import React, { useState, useEffect } from "react";
import ShowSingleProduct from "../../components/TableItem/ShowSingleProduct";
import useAuth from "../../hooks/useAuth";

function ShowProduct() {
    const [show, setShow] = useState(null);
    const { productList,
        setProductList,
        productLoading,
        setProductLoading } = useAuth()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/get-all-product`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then(res => {
            setProductList(res.data)
            setProductLoading(false)
        })
    }, [productList])

    if (productLoading) {
        return (
            <>
                <h1 className="mt-24">Loading</h1>
            </>
        )
    }

    const deleteProduct = (id)=>{
        console.log(id)
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/products/delete/${id}` , {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then(res => {
            // setProductList(res.data)
            // setProductLoading(false)
        })
    }
    return (
        <>
            <div>
                <div className="sm:px-6 w-full mt-24">
                    <div className="px-4 md:px-10 py-4 md:py-7">
                        <div className="flex items-center justify-between">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Shop List</p>
                        </div>
                    </div>
                    <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                        <div className="sm:flex items-center justify-between">
                            <div className="flex items-center">
                                <a href="javascript:void(0)">
                                    <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                        <p>All</p>
                                    </div>
                                </a>
                                <a href="javascript:void(0)">
                                    <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ml-4 sm:ml-8">
                                        <p>Show Latest</p>
                                    </div>
                                </a>
                                <a href="javascript:void(0)">
                                    <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ml-4 sm:ml-8">
                                        <p>Show Oldest</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="mt-7 overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                <tbody>
                                    <tr className="h-16 border border-gray-100 rounded">

                                        <td className>
                                            <div className="flex items-center pl-5">
                                                <p className="text-base font-medium leading-none text-gray-700 mr-2">Product name</p>
                                            </div>
                                        </td>
                                        <td className="pl-24">
                                            <div className="flex items-center">
                                                <p className="text-sm leading-none text-gray-600 ml-2">Price</p>
                                            </div>
                                        </td>
                                        <td className="pl-24">
                                            <div className="flex items-center">
                                                <p className="text-sm leading-none text-gray-600 ml-2">Quantity</p>
                                            </div>
                                        </td>
                                        <td className="pl-24">
                                            <div className="flex items-center">
                                                <p className="text-sm leading-none text-gray-600 ml-2">Shop Name</p>
                                            </div>
                                        </td>
                                        <td className="pl-24">
                                            <div className="flex items-center">
                                                <p className="text-sm leading-none text-gray-600 ml-2">Product Category Name</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="relative px-5 pt-2">
                                                <div className="flex items-center">
                                                    <p className="text-sm leading-none text-gray-600 ml-2">Edit / Delete</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="h-3" />
                                    {productList.map(item => <ShowSingleProduct key={item.id} item={item} deleteProduct={deleteProduct}/>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <style>
                    {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
                </style>
            </div>
        </>
    );
}

export default ShowProduct;
