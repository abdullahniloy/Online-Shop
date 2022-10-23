import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'


const SingleShopProduct = ({ products }) => {

    const [quantity, setQuantity] = useState(products.quantity)
    const [currentQuntity, setCurrentQuntity] = useState(products.quantity)
    const history = useHistory()
    const { user, userType } = useAuth()
    function prettyDate(date) {

        let previousDate = Date(date).split(' ')

        return (previousDate[1] + ' ' + previousDate[2] + ' ' + previousDate[3])
    }

    const getCart = window.sessionStorage.getItem("cartProduct");
    const currentCart = JSON.parse(getCart)
    useEffect(() => {
        if (currentCart === null) {
            return
        }
        const exist = currentCart.some(item => {
            if (item.id === products.id) {
                return true
            }
            return false
        })
        if (exist) {
            const loadedCart = currentCart.filter(item => item.id === products.id)
            // console.log(loadedCart)
            setQuantity(currentQuntity - loadedCart[0].quantity)
        }
    }, [])


    const addToCart = (product) => {

        if(!user?.email || userType !== 'Customer'){
            history.push('/login')
            return
        }
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
        else {
            alert('Out Of stock')
            return
        }

        // get accurate quantity
        product.quantity = currentQuntity - quantity + 1
        // logic for cart
        if (!currentCart) {
            window.sessionStorage.setItem("cartProduct", JSON.stringify([product]));
        }
        else {
            const exist = currentCart.some(item => {
                if (item.id === product.id) {
                    return true
                }
                return false
            })

            if (exist) {
                const newCart = currentCart.filter(item => item.id !== product.id)
                newCart.push(product)
                window.sessionStorage.setItem("cartProduct", JSON.stringify(newCart));
            }
            else {
                currentCart.push(product)
                window.sessionStorage.setItem("cartProduct", JSON.stringify(currentCart));
            }

        }
    }


    return (
        <div className="w-72 mx-2 lg:mb-0 mb-8">
            <div>
                <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/344/external-product-sales-flaticons-lineal-color-flat-icons-3.png" className="w-full h-44" />
            </div>
            <div className="bg-white">
                <div className="flex items-center justify-between px-4 pt-4">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                        </svg>
                    </div>
                    <div className="bg-yellow-200 py-1.5 px-6 rounded-full" onClick={() => addToCart(products)}>
                        <p className="text-xs text-yellow-500 " style={{ cursor: 'pointer' }}>Buy 1 unit</p>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold">{products.name}</h2>
                        <p className="text-xs text-gray-600 pl-5">Last Update
                            <span className='text-l font-semibold'>{prettyDate(products.updatedAt)}</span> </p>
                    </div>
                    <div className="flex items-center justify-between py-4">
                        <h2 className="text-indigo-700 text-xs font-semibold">Stock</h2>
                        <h6 className="text-indigo-700 text-xl font-semibold">{quantity}</h6>
                    </div>
                    <div className="flex items-center justify-between py-4">
                        <h2 className="text-indigo-700 text-xs font-semibold">Bay Area, San Francisco</h2>
                        <h3 className="text-indigo-700 text-xl font-semibold">${products.price}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleShopProduct