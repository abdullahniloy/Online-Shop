import React, {useEffect} from 'react'
import Footer from '../../components/Footer/Footer'
import Footer2 from '../../components/Footer/Footer2'
import Header from '../../components/Header/Header'
import Hero from '../../components/Header/Hero'
import axios from "axios";
import  {useQuery} from 'react-query'

const Home = () => {
    
    const resuts = useQuery('allShops',()=>{
       return axios.get(`${process.env.REACT_APP_BACKEND_URL}/`)
    })

    return (
        <div>
            <Hero resuts={resuts}/>
            <Footer2 />
        </div>
    )
}

export default Home
