import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaWifi, FaParking, FaWheelchair, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { AiFillFire } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiBath } from 'react-icons/bi';
import { IoIosBed } from 'react-icons/io';
import { FaRegUserCircle, FaTrashAlt } from "react-icons/fa";

import { Button, Container, Row, Col, Form, Modal, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/BookingPage.css';


const BookingPage = ({ user, csrfToken }) => {
  const navigate = useNavigate();

  const { property_id } = useParams();
  // const { guest_id } = useParams()

  const [property, setProperty] = useState(null);
  const [num_guests, setNumGuests] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState('Reserved');
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const isAuthenticated = user !== null; // Check if user is authenticated

  console.log(property_id)

  useEffect(() => {    
      // Fetch property details
      fetch(`/listings/${property_id}`)
        .then(response => response.json())
        .then(data => setProperty(data))
        .catch(error => console.error('Error fetching property data:', error));

      // Fetch reviews
      fetch(`/reviews?property_id=${property_id}`)      
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
          setReviews(data);
          } else {
            console.error('Invalid data format for reviews:', data);
          }
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
        });
    
  }, [property_id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // If user is not authenticated, redirect to signup page      
      navigate('/signup');
    }
    postReview(); 
   
  };

  const postReview = () => {
    const newReview = {
      property_id: property_id,
      rating: rating,
      comment: review
    };
       
  
    // Simulate posting review to server and receiving response
    fetch(`/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify(newReview),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to post review');
      }
      return response.json();
    })
    .then(data => {
      // Fetch guest userID for the new review
      fetch(`/user/${user.id}`)
        .then(response => response.json())        
        .then(userData => {
          // Update the reviews state with the new review and guest username
          setReviews([...reviews, { ...data, guest_username: userData.username }]);
          setRating(1);
          setReview('');
          setShowModal(false); // Close the review modal
      })
        .catch(error => {
          console.error('Error fetching guest username:', error);
        });
    })
    .catch(error => {
      console.error('Error posting review:', error);
      // Handle error, e.g., display an error message to the user
    });
  };
  
  const handleDeleteReview = (reviewId) => {
    fetch(`/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      // Filter out the deleted review from the reviews state
      setReviews(reviews.filter(review => review.id !== reviewId));
    })
    .catch(error => {
      console.error('Error deleting review:', error);
      // Handle error, e.g., display an error message to the user
    });
  };
  

  const handleReserveNow = () => {
    if (!isAuthenticated) {
      // If user is not authenticated, show the alert
      setShowModal(false); // Close the reservation modal
      setShowAlert(true); // Show the alert
    } else {
      // Calculate total price based on number of guests and property's price per night
      const totalPrice = num_guests * property.price;
      const bookingDetails = {
        guest_id: user.id,
        property_id: property_id,
        num_guests: num_guests,     
        start_date: startDate, 
        end_date: endDate,
        total_price: totalPrice, // Assuming you have totalPrice state variable
        status: status
      };  
      // Save booking details to the server or local storage
      saveBooking(bookingDetails); 
      setShowModal(false);   
    }
  };

  const saveBooking = (bookingDetails) => {
    // Save booking details to the server
    fetch(`/bookings/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify(bookingDetails),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to reserve booking');
      }
      return response.json();
    })
    .then(data => {
      alert("Success! Your booking has been reserved. Get ready for an unforgettable experience!\nYou can view the booking in the dashboard.");
      // Redirect to dashboard or update UI as needed
    })
    .catch(error => {
      console.error('Error reserving booking:', error);
      // Handle error, e.g., display an error message to the user
    });
  };

  return (
    <div className="booking-page">
      <Container> 
        <Row>
          <Col lg={8} md={12}>
            <div className="main-card futuristic-animation">
              <div className="card-body">
                {property ? (
                  <>
                    <h2 className="card-title">{property.title}</h2>
                    <h3 className="mb-2 text-muted">{property.location}</h3>
                    <p>
                      {property.description}
                    </p>
                    <div className="rating">
                      <FaStar className="star-icon" /> {rating} ({property.reviews} Reviews)
                    </div>
                    <div className="host-info">
                      <BsFillPersonFill className="person-icon" /> Hosted by <span style={{color: 'orange'}}>{property.host_username}</span> {property.superhost && <span className="superhost-badge futuristic-badge">Superhost</span>}
                    </div>
                    <div className="location-info">
                      <FaMapMarkerAlt className="location-icon" /> Great location - {property.locationRating}% of recent guests gave the location a 5-star rating.
                    </div>
                    <div className="amenities">
                      <h5>Amenities</h5>
                      <ul>
                        <li><IoIosBed /> {property.bedrooms} Bedrooms</li>
                        <li><BiBath /> {property.bathrooms} Bathrooms</li>
                        <li><BsFillPersonFill /> Sleeps {property.sleeps}</li>
                        <li><FaWifi /> {property.wifi ? 'Free Wi-Fi' : 'No Wi-Fi'}</li>
                        <li><FaParking /> {property.parking ? 'Free Parking' : 'No Parking'}</li>
                        <li><FaWheelchair /> {property.wheelchairAccessible ? 'Wheelchair Accessible' : 'Not Wheelchair Accessible'}</li>
                        <li><AiFillFire /> {property.fireplace ? 'Fireplace' : 'No Fireplace'}</li>
                      </ul>
                    </div>
                    <div className="reviews futuristic-animation">
                      <h5>Guest Reviews</h5>
                      {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                          <div key={index} className="review-card">
                            <div className="card-body">
                              <div className="review-header">
                                <div style={{fontWeight: 'bold', color: 'orange',fontSize: '15px'}}>
                                  <FaRegUserCircle style={{fontSize: '30px'}}/>
                                  {review.guest_username ? review.guest_username : 'Guest'}
                                </div>
                                <div className="rating-stars">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>&#9733;</span>
                                  ))}
                                </div>
                              </div>
                              <p>{review.comment}</p>
                              <p>{review.created_at}</p>
                              <Button variant="danger" style={{ marginLeft: 'auto', maxWidth: '50px' }} onClick={() => handleDeleteReview(review.id)}><FaTrashAlt style={{fontSize: "20px"}}/></Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p style={{color: 'red', fontSize: '26px'}}>No reviews yet</p>
                      )}
                      <Form>
                        <Form.Group controlId="rating">
                          <Form.Label>Rate your experience:</Form.Label>
                          <div>
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`star ${i < rating ? 'filled' : ''}`}
                                onClick={() => setRating(i + 1)}
                              >
                                &#9733;
                              </span>
                            ))}
                          </div>
                        </Form.Group>
                        <Form.Group controlId="review">
                          <Form.Label>Write a review:</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleReviewSubmit}>
                          Submit Review
                        </Button>
                        {!isAuthenticated && (
                          <p className="auth-message futuristic-text">You need to <Link to="/signup" className="futuristic-link">sign up</Link> to leave a review.</p>
                        )}
                      </Form>
                    </div>
                  </>
                ) : (
                  <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only futuristic-text">Loading...</span>
                    </div>
                  </div>
                  
                )}
              </div>
            </div>
          </Col>
          <Col lg={4} md={12}>
            <div className="price-card futuristic-animation">
              <div className="card-body">
                <h2>Airbnb Price Details</h2>
                <h3 className="mb-2 text-white">Reserve your stay</h3>
                <p>
                  {property ? `Price: $${property.price} per night` : 'Loading...'}
                </p>
                <Button variant="success" onClick={() => setShowModal(true)} className="futuristic-button">Reserve Now</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Reservation modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reserve Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="numGuests">
              <Form.Label>Number of Guests:</Form.Label>
              <Form.Control
                type="number"
                value={num_guests}
                onChange={(e) => setNumGuests(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date:</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="totalPrice">
              <Form.Label>Total Price:</Form.Label>
              <Form.Control
                type="text"
                value={`$${num_guests * (property ? property.price : 0)}`}
                readOnly
              />
            </Form.Group>            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleReserveNow}>Complete Book</Button>
        </Modal.Footer>
      </Modal>

        {/* Alert for unauthenticated users */}
        <Alert show={showAlert} variant="danger" className="alert-popup-bookingPage">
          <Alert.Heading>You need to sign up or login first, to reserve this property!!!</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowAlert(false)} variant="outline-danger">
            Cancel
          </Button>
          <Button onClick={() => navigate('/signup')} variant="danger" className="ml-2">
            Sign Up
          </Button>
          <Button onClick={() => navigate('/login')} variant="danger" className="ml-2">
            Login
          </Button>
        </div>
      </Alert>

      
    </div>
  );
}

export default BookingPage;
