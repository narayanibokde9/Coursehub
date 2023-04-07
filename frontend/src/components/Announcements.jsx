import React from 'react'
import BlogList from './BlogList';
import useFetch from './usefetch';

const Announcements = () => {
 const {data: blogs, isPending, error} = useFetch("http://localhost:8000/blogs");
    return(
        <>
        <div className='announcements'>
            {/* <h1 style={color='black'}>All Events</h1> */}
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs = {blogs} title='All Events'/>}
            
        </div>
        </>
    );
}

export default Announcements
