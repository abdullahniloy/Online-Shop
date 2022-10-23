import React from 'react'
import HeroShopView from '../../components/Header/HeroShopView'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ShopProduct = () => {

    const { id } = useParams()
    const results = useQuery('selectedShop', () => {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/selectedshop/${id}`)
    })
    return (
        <>
            <HeroShopView results={results} />
        </>
    )
}

export default ShopProduct