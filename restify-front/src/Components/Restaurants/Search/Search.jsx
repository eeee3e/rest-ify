import React, { useEffect, useState, useRef} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from '../../../Services/axios';
import "./style.css"
import TextField from "@mui/material/TextField";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

import InputGroup from 'react-bootstrap/InputGroup'
import { Form, Button } from 'react-bootstrap';


function SearchRestaurant() {

    const [restaurantList, setRestaurantList] = useState([]);
    const listRef = useRef(restaurantList);
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(inputText);
    const [fetching, setFetching] = useState(false);
    const fetchingRef = useRef(fetching);
    let pageNumber = '1';

    function handlescroll(e) {
        const {scrollHeight, scrollTop, clientHeight} = e.target.scrollingElement;
        const isBottom = scrollHeight - scrollTop <= clientHeight;
        if (isBottom && fetchingRef.current) {
            console.log('hi')
            pageNumber = +pageNumber + +'1'
            console.log(pageNumber)
            
            loadData(inputRef.current, pageNumber)
            

        } else {
            

        }

        
    }

    useEffect(() => {
        document.addEventListener('scroll', handlescroll)

        return () => document.removeEventListener('scroll', handlescroll);
    }, [])








    useEffect(() => {
        pageNumber = '1'
        console.log(inputText)
        console.log(pageNumber)
        inputRef.current = inputText
        if (inputText !== '') {
            setRestaurantList([]);
        
            loadData(inputText, pageNumber)
            listRef.current = restaurantList;
        } else {
            
            setRestaurantList([]);
        }
    }, [inputText])


    const loadData = (query, num) => {
        setFetching(true);
        fetchingRef.current = true
        const url = 'http://127.0.0.1:8000/restaurants/search/';
        axiosInstance.get(url, {
            params: {
                search: query,
                page: num
            }
        }).then((response) => {
            
            setFetching(response.data.next !== null);
            fetchingRef.current = response.data.next !== null
            console.log(response.data);
            
            
            setRestaurantList(oldlist => [...oldlist, ...response.data.results])
        });
    
    };

    const inputHandler = (e) => {
        
        setInputText(e.target.value)
    };

    return <>
        <div className="search-page">


            <div className="search-bar">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    label="Search"
                    onChange={inputHandler}
                />
            </div>

            <div className='restaurant-list'>
                <Row xs={1} md={3} className="g-4">
                    {restaurantList.map((restaurant) => (
                        <Col>
                            <Card className="restaurant-card" controlId={restaurant.id}>
                                <Card.Img variant="top" src={restaurant.logo} />
                                <Card.Body>
                                    <Card.Title>{restaurant.name}</Card.Title>
                                    <Card.Text className='restaurant-description'>
                                        Description: {restaurant.description}
                                    </Card.Text>
                                    <Card.Text className='restaurant-followers'>
                                        Followers : {restaurant.followers}
                                    </Card.Text>
                                    <Card.Text className='restaurant-address'>
                                        Address : {restaurant.address}
                                    </Card.Text>
                                    
                                    <Button href={`/restaurant/info/${restaurant.id}`}>Visit Restaurant Page</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>

    </>
}
export default SearchRestaurant;