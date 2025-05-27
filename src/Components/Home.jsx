import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../Styles/New.css'

const Home = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getalldata()
    }, [])

    const getalldata = () => {
        axios
            .get("http://localhost:8000/api/users")
            .then((res) => {
                console.log(res.data, 'res')
                setData(res.data.users)
            })
            .catch((err) => {
                console.log(err, 'err')
            })
    }

    return (
        <>
            <table className='home'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead >
                <tbody>
                    {data?.map((product) => (
                        <>
                            <tr>
                                <td>{product?.name}</td>
                                <td>{product?.email}</td>
                                <td>{product?.phone}</td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Home
