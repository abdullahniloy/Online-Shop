import React from 'react'
import SingleShopProduct from './SingleShopProduct'

const ShowAllProduct = ({ results }) => {
    const { isLoading, data } = results

    return (
        <>
            <div className="bg-gray-100 ">
                {/* Remove py-8 */}
                <div className="mx-auto container py-8">
                    <div className="flex flex-wrap items-center lg:justify-between justify-center">
                        {data.data.Products.length === 0 ?
                            <>
                                <h1 className="text-lg font-semibold p-5 m-5 text-red-600">No product Here</h1>
                            </>
                            :
                            data.data.Products.map(products => <SingleShopProduct key={products.id} products={products} />)
                        }


                    </div>

                </div>
            </div>
        </>
    )
}

export default ShowAllProduct


