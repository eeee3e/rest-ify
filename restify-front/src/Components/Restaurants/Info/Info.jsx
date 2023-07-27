import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from '../../../Services/axios';
import "./style.css"
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


function RestaurantInfo() {
    const [restaurantInfo, setRestaurantInfo] = useState([]);
    const [images, setImages] = useState([]);
    const [menu, setMenu] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState("");
    const [loaded, setLoaded] = useState(false)
    const [liked, setLiked] = useState("Like")
    const [followed, setFollowed] = useState("Follow")
    const { id } = useParams()



    const loadData = () => {
        if (!loaded) {
            const url = 'http://127.0.0.1:8000/restaurants/info/' + id;
            axiosInstance.get(url).then((response) => {
                console.log(response.data);
                setRestaurantInfo(response.data)
                setImages(response.data.images)
                setMenu(response.data.menu)
                setComments(response.data.comments)
                setPosts(response.data.blogs)
                setLoaded(true)
            });
        }
    };

    loadData()


    const handleLikeButton = (e) => {
        if (liked === "Like") {
            const url = 'http://127.0.0.1:8000/restaurants/' + id + '/like/'

            axiosInstance.post(url).then((response) => { });
            setLiked("Unlike")
        }
        setLoaded(false)


    };

    const handleFollowButton = (e) => {
        if (followed === "Follow") {
            console.log('follow')
            const url = 'http://127.0.0.1:8000/restaurants/' + id + '/follow/'
            axiosInstance.post(url).then((response) => { });
            setFollowed("Unfollow")
        }
        setLoaded(false)


    };

    const handleComment = (e) => {
        if (comment !== "") {
            const url = 'http://127.0.0.1:8000/restaurants/' + id + '/comment/'
            const formData = new FormData();
            formData.append('description', comment);
            axiosInstance.post(url, formData).then((response) => { setLoaded(false) });
        }


    }









    return <>
        <Container fluid className='rest-header'>
            <Row className='img'>
                <Col>
                    <div className="header-pic">
                        <img src={restaurantInfo.logo}
                            alt="Mcdonalds" />
                    </div>
                </Col>

            </Row>
            <Row className='name'>
                <Col> <h1>{restaurantInfo.name}</h1> </Col>


            </Row>
            <Row className='info'>
                <div>
                    <ul>
                        <li className="likes">
                            <h5>{restaurantInfo.likes} <small className="text-muted">Likes</small></h5>
                        </li>
                        <li className="followers">
                            <h5>{restaurantInfo.followers} <small className="text-muted">Followers</small></h5>
                        </li>
                        <li className="likes-button">
                            <Button variant="primary" onClick={handleLikeButton}>{liked}</Button>{' '}
                        </li>
                        <li className="follow-button">
                            <Button variant="primary" onClick={handleFollowButton}>{followed}</Button>{' '}
                        </li>
                    </ul>

                </div>

            </Row>
            <hr></hr>
            <Row className='tabs'>
                <div >
                    <Tabs className='tabs-list' defaultActiveKey="first">
                        <Tab className='tab-item' eventKey="first" title="General">
                            <Row xs={1} md={1} className="g-4">
                                <Card className="restaurant-general">
                                    <Card.Body>
                                        <Card.Text className='general-description'>
                                            <b>Description:</b> {restaurantInfo.description}
                                        </Card.Text>
                                        <Card.Text className='general-description'>
                                            <b>Phone Number: </b> {restaurantInfo.phone_number}
                                        </Card.Text>
                                        <Card.Text className='general-owner'>
                                            <b>Owner:</b> {restaurantInfo.owner}
                                        </Card.Text>
                                        <Card.Text className='general-address'>
                                            <b>Address:</b> {restaurantInfo.address}
                                        </Card.Text>
                                        <Card.Text className='general-postalcode'>
                                            <b>Postal Code:</b> {restaurantInfo.postal_code}
                                        </Card.Text>
                                        <Card.Text className='general-schedule'>
                                            <b>Schedule:</b> {restaurantInfo.schedule}
                                        </Card.Text>

                                    </Card.Body>


                                </Card>

                            </Row>

                        </Tab>
                        <Tab className='tab-item' eventKey="second" title="Images">
                            <Row xs={1} md={4} className="g-4">
                                {images.map((rest) => (
                                    <Col>
                                        <Card className="restaurant-img">
                                            <Card.Img src={rest.image} />

                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                        </Tab>
                        <Tab className='tab-item' eventKey="third" title="Menu">
                            <Row xs={1} md={1} className="g-4">
                                {menu.map((item) => (
                                    <Col>
                                        <Card className="restaurant-menu-item">
                                            <Row>
                                                <Col xs={6} md={4} className='img-col'>
                                                    <Card.Img src={item.image} />
                                                </Col>
                                                <Col xs={12} md={8} className='text-col'>
                                                    <Card.Body>
                                                        <Card.Title><b>{item.name}</b></Card.Title>
                                                        <Card.Text className='menu-price'>
                                                            <small class="text-muted">${item.price}</small>
                                                        </Card.Text>
                                                        <Card.Text className='menu-description'>
                                                            {item.description}
                                                        </Card.Text>

                                                    </Card.Body>
                                                </Col>

                                            </Row>




                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                        </Tab>
                        <Tab className='tab-item' eventKey="forth" title="Posts">
                            <Row xs={1} md={1} className="g-4">
                                {posts.map((post) => (
                                    <Col>
                                        <Card className="restaurant-post">
                                            <Row>
                                                <Col>
                                                    <Card.Img src={post.image} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Card.Title><b>{post.title}</b></Card.Title>
                                                </Col>
                                            </Row>
                                            <hr></hr>
                                            <Row>
                                                <Col>
                                                    <Card.Text className='post-content'>
                                                        {post.content}
                                                    </Card.Text>
                                                </Col>
                                            </Row>


                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                        </Tab>
                        <Tab className='tab-item' eventKey="fifth" title="Comments">
                            <Row xs={1} md={1} className="g-4">
                                {comments.map((comment) => (
                                    <Col>
                                        <Card className="restaurant-comment">
                                            <Card.Body>
                                                <Card.Text className='comment-description'>
                                                    {comment.description}
                                                </Card.Text>
                                                <hr></hr>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            <Row xs={1} md={1} className="g-4">
                                <Col>
                                    <Card className="restaurant-comment">
                                        <Card.Body>
                                            <form onSubmit={handleComment}>
                                                <input type="text" name="name" value={comment} onChange={(e) => setComment(e.target.value)} />
                                                <input type="submit" value="Post" />
                                            </form>
                                            <hr></hr>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            </Row>

                        </Tab>
                    </Tabs>
                </div>


            </Row>

        </Container>





    </>



}

export default RestaurantInfo;