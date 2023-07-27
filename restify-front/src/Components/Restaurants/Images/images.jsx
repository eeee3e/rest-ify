import React, { useEffect, useState, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from '../../../Services/axios';
import "./style.css"
import defaultAvatar from '../../../Assets/profile.png';
import { Form, Button } from 'react-bootstrap';


function RestaurantImages() {

    const [image, setImage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = 'http://127.0.0.1:8000/restaurants/images/add/';
        const formData = new FormData();
        formData.append('image', image);
        console.log(formData)
        axiosInstance.post(url, formData).then((response) => {
            console.log(response.data);


        });

    }




    return <>
        <div class="container">
            <div className="add-image-left">
                <img src='https://images.unsplash.com/photo-1564758564211-cc16d061f020?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGhvbmUlMjBmb29kfGVufDB8fDB8fA%3D%3D&w=1000&q=80' alt="image1" />

            </div>
            <div className="add-image-right">
                <Form className="add-image-form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="Logo">
                        <Form.Label>logo</Form.Label>
                        <Form.Control className='add-image-input' type="file" placeholder="Choose Image" onChange={(e) => setImage((e.target.files ? e.target.files[0] : defaultAvatar))} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add Image
                    </Button>
                </Form>

            </div>



        </div>

    </>

}

export default RestaurantImages;