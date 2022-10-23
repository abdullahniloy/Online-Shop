import React from 'react'

const ShowSingelProduct = ({ product, deleteProduct }) => {
    return (
        <>
            <tr className="h-16 border border-gray-100 rounded">

                <td className>
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{product.name}</p>
                    </div>
                </td>

                
                <td className>
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{product.ProductCatagory.name}</p>
                    </div>
                </td>

                <td className>
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{product?.Shop?.name}</p>
                    </div>
                </td>

                <td className>
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{product.User.email }</p>
                    </div>
                </td>

                <td className>
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{product.User.username === ('' || null) ? 'Not Given' : product.User.username}</p>
                    </div>
                </td>
                <td className>
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{product.User.id}</p>
                    </div>
                </td>
                <td>
                    <div className="relative px-5 pt-2">

                        <div className="  ">
                            <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white" onClick={() => deleteProduct(product.id)} >
                                <p >Delete</p>
                            </div>
                        </div>

                    </div>
                </td>
            </tr>
            <tr className="h-3" />
        </>
    )
}

export default ShowSingelProduct