import axios from "axios";
import React, { useState, useEffect } from "react";
import TableItem from "../../components/TableItem/TableItem";
import useAuth from "../../hooks/useAuth";

function ShowProductCatagory() {
    const { productCatagoryList, setProductCatagoryList,productCatagoryLoading, setProductCatagoryLoading} = useAuth()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product-catagory`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then(res => {
            setProductCatagoryList(res.data)
            setProductCatagoryLoading(false)
        })
    }, [])

    if (productCatagoryLoading) {
        return (
            <>
                <h1>Loading</h1>
            </>
        )
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
                                    {productCatagoryList.map(item => <TableItem key={item.id} item={item}/>)}
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

export default ShowProductCatagory;
