import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaWifi, FaParking, FaWheelchair, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { AiFillFire } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiBath } from 'react-icons/bi';
import { IoIosBed } from 'react-icons/io';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/BookingPage.css';

const BookingPage = () => {
  const { property_id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication status

  useEffect(() => {
    // Fetch property details
    fetch(`/listings/${property_id}`)
      .then(response => response.json())
      .then(data => setProperty(data))
      .catch(error => console.error('Error fetching property data:', error));

    // Fetch reviews
    fetch(`/reviews/${property_id}`)
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

    // Check user authentication status
    fetch('/checksession')
      .then(response => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(error => {
        console.error('Error checking session:', error);
        setIsAuthenticated(false);
      });
  }, [property_id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // If user is not authenticated, redirect to signup page
      navigate('/signup');
      return;
    }
    postReview();
  };

  const postReview = () => {
    const newReview = {
      rating: rating,
      comment: review
    };

    // Simulate posting review to server and receiving response
    fetch(`/reviews/${property_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      setReviews([...reviews, data]);
      setRating(0);
      setReview('');
    })
    .catch(error => {
      console.error('Error posting review:', error);
      // Handle error, e.g., display an error message to the user
    });
  };

  const handleReserveNow = () => {
    alert("Success! Your booking has been reserved. Get ready for an unforgettable experience!");
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
                      <FaStar className="star-icon" /> {property.rating} ({property.reviews} Reviews)
                    </div>
                    <div className="host-info">
                      <BsFillPersonFill className="person-icon" /> Hosted by {property.host_id.username} {property.superhost && <span className="superhost-badge futuristic-badge">Superhost</span>}
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
                      {reviews.map((review, index) => (
                        <div key={index} className="review-card">
                          <div className="card-body">
                            <div className="review-header">
                              <div className="rating-stars">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>&#9733;</span>
                                ))}
                              </div>
                            </div>
                            <p>{review.comment}</p>
                            <p>{review.created_at}</p>
                          </div>
                        </div>
                      ))}
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
                  <p className="futuristic-text">Loading...</p>
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
                <Button variant="success" onClick={handleReserveNow} className="futuristic-button">Reserve Now</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BookingPage;
