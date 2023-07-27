import React, { useState, useEffect  } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../Services/axios';



import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';



function BlogPost() {

  const path = useLocation();
  const blogid = path.pathname.split('/')[2];
  console.log(blogid)

  const [blog, setBlog] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`blogs/${blogid}`)
      .then((res) => {
        console.log(res.data);
        if (res.data === undefined) {
          throw 'Server not responding.';
        }
        else{
          setBlog(res.data);
        }
      })
      .catch(err => {
        alert(err)
      })
  }, [blogid, setBlog])


  const handleLike = () => {
    axiosInstance
      .post(`blogs/${blogid}/like/`)
      .then(res => {
        if (res) {
          console.log(res);
          setLiked(true);
        }
        else {
          setLiked(true);
          throw 'You have already liked this blog';
        }

      })
      .catch(function (err) {
        alert(err);
      })
  }

  const handleUnlike = () => {
    axiosInstance
      .delete(`blogs/${blogid}/unlike/`)
      .then(res => {
        setLiked(false);
      })
      .catch(function (err) {
        alert(err.data.detail);
      })
  }


  console.log(blog);

  return (
    <>    
      <Row className="mt-5">
        <center>
          <h1 className="text-white border-bottom p-3">
            {blog.title}
          </h1>
        </center>
      </Row>
      <Row>

        <Col>
          <p className="text-white p-3 "> {blog.content} </p>
        </Col>

        <Col className='justify-content-md-center'>
          <img 
            className="flex mt-4" 
            src={`${blog.image}`} 
            width='95%'
            height='75%'
          />
        </Col>

        <Row>
          { liked ? 
          <IconButton 
            onClick={handleUnlike}
            sx={{ color: '#ff7f7f'}}> 
              <FavoriteIcon /> 
          </IconButton> :
          <IconButton 
            onClick={handleLike}> 
              <FavoriteBorderIcon /> 
          </IconButton>
          }
          
        </Row>


      </Row>
    </>

  );
}

export default BlogPost;