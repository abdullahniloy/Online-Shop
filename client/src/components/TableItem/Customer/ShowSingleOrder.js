import React from 'react'
import useAuth from '../../../hooks/useAuth'

const ShowSingleOrder = ({ item }) => {
    const { user } = useAuth()
    return (
        <>
            <tr className="h-16 border border-gray-100 rounded">

                <td className>
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{item.OrderUniqueId}</p>
                    </div>
                </td>

            

                <td className>
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{item.amount_paid}</p>
                    </div>
                </td>

                <td className>
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{item.total_cost }</p>
                    </div>
                </td>

                <td className>
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{user.email}</p>
                    </div>
                </td>
                <td className>
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{user?.name || 'Not Given'}</p>
                    </div>
                </td>
            </tr>
            <tr className="h-3" />
        </>
    )
}

export default ShowSingleOrder