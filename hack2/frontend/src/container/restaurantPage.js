/****************************************************************************
  FileName      [ restaurantPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ Implement the restaurant page ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/restaurantPage.css'
import Information from './information';
import Comment from './comment';
import { useParams } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const RestaurantPage = () => {
    const { id } = useParams()
    const [info, setInfo] = useState({})
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const getInfo = async () => {
        // TODO Part III-2: get a restaurant's info
        const newInfo = await instance.get('/getInfo', {
            params: {
                id: id
            }
        });
        setInfo(newInfo.data.contents[0])
        return info
    }
    const getComments = async () => {
        // TODO Part III-3: get a restaurant's comments 
        const newComment = await instance.get('/getCommentsByRestaurantId', {
            params: {
                restaurantId: id
            }
        });
        setComments(newComment.data.contents)
        setLoading(false)
        return info
    }
    useEffect(() => {
        if (Object.keys(info).length === 0) {
            getInfo()
        }
    }, [])

    useEffect(() => {
        // TODO Part III-3-c: update the comment display immediately after submission
        getComments()
    }, [loading])

    /* TODO Part III-2-b: calculate the average rating of the restaurant */
    let rating = 0;
    comments.map((c) => {
        rating += c.rating;
    })
    rating = rating / (comments.length === 0 ? 1 : comments.length);

    return (
        <div className='restaurantPageContainer'>
            {Object.keys(info).length === 0 ? <></> : <Information info={info} rating={rating} />}
            <Comment restaurantId={id} comments={comments} setComments={setComments} setLoad={setLoading} />
        </div>
    )
}
export default RestaurantPage