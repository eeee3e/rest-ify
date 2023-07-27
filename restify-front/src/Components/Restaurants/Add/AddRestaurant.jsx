import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from '../../../Services/axios';
import "./style.css"
import defaultAvatar from '../../../Assets/profile.png';



function AddRestaurant() {

    const [name, setName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [address, setAdddress] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState(null);
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = 'http://127.0.0.1:8000/restaurants/create/';
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone_number', phone_number);
        formData.append('address', address);
        formData.append('postal_code', postal_code);
        formData.append('description', description);
        formData.append('logo', logo);

        console.log(formData)
        
        axiosInstance.post(url, formData).then((response) => {
            console.log(response.data);
            

        });

    }
    

    




    return <>
        <div class="container">
            <div className="add-restaurant-left">
                <img src='https://images.otstatic.com/prod/27178331/3/huge.jpg' alt="image1" />

            </div>
            <div className="add-restaurant-right">
                <Form className="add-restaurant-form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control className='add-restaurant-input' type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control className='add-restaurant-input' type="Address" placeholder="Enter Address" value={address} onChange={(e) => setAdddress(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Phone Number">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control className='add-restaurant-input' type="Phone Number" placeholder="Enter Phone Number" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Postal Code">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control className='add-restaurant-input' type="Phone Number" placeholder="Enter Postal Code" value={postal_code} onChange={(e) => setPostalCode(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control className='add-restaurant-input' type="Description" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Schedule">
                        <Form.Label>Schedule</Form.Label>
                        <Form.Control className='add-restaurant-input' type="Schedule" placeholder="Enter Schedule" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Logo">
                        <Form.Label>logo</Form.Label>
                        <Form.Control className='add-restaurant-input' type="file" placeholder="Choose Logo" onChange={(e) => setLogo((e.target.files ? e.target.files[0] : defaultAvatar))} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add Restaurant
                    </Button>
                </Form>

            </div>



        </div>



    </>

}


export default AddRestaurant;