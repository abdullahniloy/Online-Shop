import React from 'react'
import SingleShop from './SingleShop'

const AllShop = ({ resuts , takeToShop }) => {
    // const { data } = resuts
    return (
        <>
            {resuts.map(item => <SingleShop id={item.id} shop={item} takeToShop={takeToShop} />)}

        </>
    )
}

export default AllShop