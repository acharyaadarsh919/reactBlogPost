import React from 'react';
import { useParams, Link , useNavigate} from 'react-router-dom';
// import { useContext } from 'react';
// import DataContext from './context/DataContext';
// import api from './api/posts';
import { useStoreState , useStoreActions } from 'easy-peasy';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deletePosts = useStoreActions((actions) => actions.deletePosts);
  const getPostsById = useStoreState((state) => state.getPostsById);
  const post = getPostsById(id);

  // const {posts, setPosts} = useContext(DataContext);

  const handleDelete = (id) => {
    deletePosts(id);
    navigate('/');
  }

  return (
    <main className='PostPage'>
      <article className="Post">
        { 
          post && 
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`edit/${post.id}`}>
              <button className='editButton' >Edit Post</button>
            </Link>
            <button className='deleteButton' onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }

        {
        !post && 
        <>
          <h2>Post not Found</h2>
          <p>Well, that's disappointing</p>
          <p>
            <Link to = '/'>Visit Our Homepage</Link>
          </p>
        </>
        }
      </article>
    </main>
  )
}

export default PostPage