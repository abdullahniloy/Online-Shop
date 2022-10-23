import React, { useState } from "react";

const Tableitem = ({item})=> {
    // console.log(item)
    return (
        <>
            <tr className="h-16 border border-gray-100 rounded">
                <td className>
                    <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-700 mr-2"> { item.name } </p>
                    </div>
                </td>
                <td className="pl-5">
                    <div className="flex items-center">
                        {/* giving space in betwwen */}
                    </div>
                </td>
            </tr>
            <tr className="h-3" />
        </>
    );
}

export default Tableitem;

