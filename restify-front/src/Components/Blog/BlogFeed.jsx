import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Services/axios';
import { useNavigate } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './BlogFeed.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

import FavoriteIcon from '@mui/icons-material/Favorite';



function BlogFeed() {
  const colours = ['#ffffe0', '#e0ffff', '#fafad2'];

  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    axiosInstance
      .get('blogs/feed')
      .then(res => {
        setBlogs(res.data.results)
      })

  }, [setBlogs])


  const handleEdit = () => {
    navigate('../blog/add')
  }

  return (
    <>
      
        <Row>
          
          <Col>
            <h1 className="text-light p-4 border-bottom mt-5 ">Latest blogs</h1>
            <Button 
              onClick={handleEdit} 
              style={{ marginLeft: '4.2rem'}} 
              className='btn btn-primary mt-3'
            > Create a blog... </Button>
            
          </Col>        

        </Row>
        <Row>
          {blogs.map((blog) => (
            <Col className="mt-5" key={blog.id} class="grid-item">
              <Card style={{
                backgroundColor: '#181414', 
                borderRadius: '15px',
                height: '100',
                width: '240px',
                marginLeft: '4rem'}}>
                <Card.Body style={{background: `${colours[Math.floor(Math.random() * 3)]}`}}>
                  <div className="text-dark text-center">
                    <a className="cap" href={`blogs/${blog.id}`}>
                      <h5 className="card-title">{blog.title}</h5>
                    </a> by <a className="cap" href={`restaurants/${blog.restaurant}`}>{blog.restaurant}</a>
                    <p className="card-text">{blog.date_created}</p>
                    <div style={{ fontSize: 16.5 }}>{blog.likes} <FavoriteIcon fontSize='small'/></div>
                  </div>
                </Card.Body>
                <Card.Img className="card-img-bottom" src={`${blog.image}`}
                  alt="Card image"/>
              </Card>
            </Col>
          ))}
        </Row>
      
    
    
    </>
  );
}

export default BlogFeed;