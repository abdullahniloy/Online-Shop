import { useState, useEffect } from "react"

import axios from "axios";

const useAllState = () => {
    const [user, setUser] = useState({});
    const [userType, setUserType] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [userAllInfo, setUserAllInfo] = useState({});
    const [shopList, setShopList] = useState({});
    const [shopLoading, setShopLoading] = useState(true);
    const [productCatagoryList, setProductCatagoryList] = useState({});
    const [productCatagoryLoading, setProductCatagoryLoading] = useState(true);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [productList, setProductList] = useState({});
    const [productLoading, setProductLoading] = useState(true);

    const [userList, setUserList] = useState({});
    const [userLoading, setUserLoading] = useState(true);

    const logOut = () => {
        localStorage.removeItem('accessToken')
        sessionStorage.removeItem('cartProduct')
        setUser({})
        setUserType('')
        setIsLoading(false)
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (response.data.error) {
                setUser({});
                setUserType('')
            } else {
                setUser(response.data);
                setUserType(response.data.type)
            }
        });
        setIsLoading(false)

    }, []);

    return {
        user,
        setUser,
        userType,
        setUserType,
        logOut,
        isLoading,
        setIsLoading,
        userAllInfo,
        setUserAllInfo,
        shopList,
        setShopList,
        shopLoading,
        setShopLoading,
        productCatagoryList,
        setProductCatagoryList,
        productCatagoryLoading,
        setProductCatagoryLoading,
        showAddProduct,
        setShowAddProduct,
        productList, 
        setProductList,
        productLoading, 
        setProductLoading,
        userList, 
        setUserList,
        userLoading,
        setUserLoading
    }
}

export default useAllState