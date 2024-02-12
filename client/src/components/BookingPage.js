import React, { useState } from 'react';
import { FaWifi, FaParking, FaWheelchair, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { AiFillFire } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiHotelLine } from 'react-icons/ri';
import { BiBath } from 'react-icons/bi';
import { IoIosBed } from 'react-icons/io';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookingPage.css';

const BookingPage = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([
    { username: "Scott", location: "Bernard Hill, California", rating: 5, review: "Catherine’s place was amazing! The views were incredible and the house was very clean. We had a great time." },
    { username: "Julie", location: "Miami, California", rating: 4, review: "We had a great time and would definitely stay again! Gorgeous views and a beautiful home." },
    { username: "Nicole", location: "Nevada, California", rating: 4.5, review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero id est malesuada convallis." }
  ]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      username: "User",
      location: "Current Location",
      rating: rating,
      review: review
    };
    // Simulate posting review to server and receiving response
    setReviews([...reviews, newReview]);
    setRating(0);
    setReview('');
  };

  const handleReserveNow = () => {
    alert("Success! Your booking has been reserved. Get ready for an unforgettable experience!");
  };

  return (
    <div className="booking-page">
      <Container>
        <Row>
          <Col lg={8} md={12}>
            <div className="main-card">
              <Card.Body>
                <Card.Title>Cozy and Charming Mountain Retreat with Hot Tub</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Home in Santa Cruz, California, United States</Card.Subtitle>
                <Card.Text>
                  2 guests · 1 bedroom · 1 bed · 1 bath · Wifi · Kitchen
                </Card.Text>
                <div className="rating">
                  <FaStar className="star-icon" /> 4.93 (745 Reviews)
                </div>
                <div className="host-info">
                  <BsFillPersonFill className="person-icon" /> Hosted by Catherine <span className="superhost-badge">Superhost</span>
                </div>
                <div className="location-info">
                  <FaMapMarkerAlt className="location-icon" /> Great location - 100% of recent guests gave the location a 5-star rating.
                </div>
                <div className="amenities">
                  <h5>Amenities</h5>
                  <ul>
                    <li><RiHotelLine /> Mountain view</li>
                    <li><FaMapMarkerAlt /> Beach access</li>
                    <li><BiBath /> Private chef</li>
                    <li><FaWifi /> Wifi</li>
                    <li><FaParking /> Parking</li>
                    <li><FaWheelchair /> Wheelchair accessible</li>
                    <li><AiFillFire /> Fireplace</li>
                  </ul>
                </div>
                <div className="reviews">
                  <h5>Guest Reviews</h5>
                  {reviews.map((review, index) => (
                    <Card key={index} className="review-card">
                      <Card.Body>
                        <div className="review-header">
                          <strong>{review.username}</strong> - {review.location}
                          <div className="rating-stars">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>&#9733;</span>
                            ))}
                          </div>
                        </div>
                        <Card.Text>{review.review}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                  <Form onSubmit={handleReviewSubmit}>
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
                    <Button variant="primary" type="submit">
                      Submit Review
                    </Button>
                  </Form>
                </div>
              </Card.Body>
            </div>
          </Col>
          <Col lg={4} md={12}>
            <Card className="price-card">
              <Card.Body>
                <Card.Title>Airbnb Price Details</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Reserve your stay</Card.Subtitle>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero id est malesuada convallis.
                </Card.Text>
                <Button variant="success" onClick={handleReserveNow}>Reserve Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BookingPage;
