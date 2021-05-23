import React, { useState } from 'react';
import Post from '../Profile/Posts/Post/Post';
import './News.scss';

const News = (props) => {
    const [params, setParams] = useState('');
    let newsToSort = [];

    props.users.map(user=>{
        if(props.isAuth) {
            if(props.user.id!==user.id) newsToSort = [...newsToSort, ...user.posts]
        } else {
            newsToSort = [...newsToSort, ...user.posts];
        }
    })

    newsToSort.sort((a,b) => {
        return new Date(b.date) - new Date(a.date);
    });

    if(params) {
        const words = params.split(' ');
        newsToSort = newsToSort.filter(news=>words.some(word=>news.title.toLowerCase().includes(word.toLowerCase()) || news.place.toLowerCase().includes(word.toLowerCase()) || news.appointment.toLowerCase().includes(word.toLowerCase())));
    }
    return(
        <div className='news'>
            <input placeholder='Write data to seek' className='seeking-input' value={params} onChange={(e)=>setParams(e.target.value)}/>
            {
                newsToSort.length 
                ? newsToSort.map(news=> {
                    return (<Post 
                        key = {news.id}
                        activeUserId={props.myProfile}
                        isAuth={props.isAuth}
                        post={news}
                        isOwn={false}
                        users={props.users}
                        isLink={true}
                        addCommentThunk={props.addCommentThunk}/>
                    )
                })
                : <h1>There are no news to show</h1>
            }
        </div>
    )
}

export default News;