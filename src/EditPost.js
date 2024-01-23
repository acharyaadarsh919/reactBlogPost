import React from 'react';
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useStoreState , useStoreActions } from 'easy-peasy';
// import api from './api/posts';
// import DataContext from './context/DataContext';
// import { useEffect, useContext, useState } from 'react';

const EditPost = () => {
    // const {posts,setPosts} = useContext(DataContext);
    // const [editTitle, setEditTitle] = useState('');
    // const [editBody, setEditBody] = useState('');

    const {id} = useParams();
    const navigate = useNavigate();

    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    const getPostsById = useStoreState(state => state.getPostsById);

    const editPosts = useStoreActions(actions => actions.editPosts);
    const setEditTitle = useStoreActions(actions => actions.setEditTitle);
    const setEditBody = useStoreActions(actions => actions.setEditBody);

    const post = getPostsById(id);

    useEffect(() =>{
        if(post ){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post, setEditBody,setEditTitle])

    const handleEdit = (id)=>{
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {id, title: editTitle, datetime, body: editBody};
        editPosts(updatedPost);
        navigate(`/post/${id}`);
    }

    return (
        <main className='NewPost'>
            { editTitle && 
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input 
                        type="text"
                        id='postTitle'
                        required
                        value={editTitle}
                        onChange={(e)=> setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e)=> setEditBody(e.target.value)}
                        />
                        <button type='button' onClick={() => handleEdit(post.id)}>Submit</button>
                        </form>
                </>
            }

            {
                !editTitle &&
                <>
                    <h2>Post not Found</h2>
                    <p>Well, that's disappointing</p>
                    <p>
                        <Link to = '/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
    </main>
    )
}

export default EditPost