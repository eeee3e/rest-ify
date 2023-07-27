import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from '../../../Services/axios';
import "./style.css"

import defaultAvatar from '../../../Assets/profile.png';
import { Form, Button } from 'react-bootstrap';


function RestaurantMenu() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = 'http://127.0.0.1:8000/restaurants/menu/add/';
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        console.log(formData)

        axiosInstance.post(url, formData).then((response) => {
            console.log(response.data);


        });

    }

    return <>
        <div class="container">
            <div className="add-menu-left">
                <img src="https://images.unsplash.com/photo-1564759298141-cef86f51d4d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVudSUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8&w=1000&q=80" />

            </div>
            <div className="add-menu-right">
                <Form className="add-menu-form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control className='add-menu-input' type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control className='add-menu-input' type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control className='add-menu-input' type="text" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Image">
                        <Form.Label>logo</Form.Label>
                        <Form.Control className='add-menu-input' type="file" placeholder="Choose Image" onChange={(e) => setImage((e.target.files ? e.target.files[0] : defaultAvatar))} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add Item
                    </Button>
                </Form>

            </div>



        </div>


    </>

}

export default RestaurantMenu;