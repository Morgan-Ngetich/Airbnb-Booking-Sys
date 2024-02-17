import React from 'react';
import { Link } from 'react-router-dom'

const Card = ({ property }) => {
  return (
    <div className="card">
      <img src={property.images} className="card-img-top" alt="Property Image" />
      <div className="card-body">
        <h5 className="card-title">{property.title}</h5>
        <p className="card-text">{property.description}</p>
        <div className="row">
          <div className="col-md-6">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><i className="fas fa-bed"></i> {property.bedrooms} Bedrooms</li>
              <li className="list-group-item"><i className="fas fa-bath"></i> {property.bathrooms} Bathrooms</li>
              <li className="list-group-item"><i className="fas fa-users"></i> Sleeps {property.sleeps}</li>
              <li className="list-group-item"><i className="fas fa-wifi"></i> {property.wifi ? 'Free Wi-Fi' : 'No Wi-Fi'}</li>
              <li className="list-group-item"><i className="fas fa-swimming-pool"></i> {property.pool ? 'Private Pool' : 'No Pool'}</li>
              <li className="list-group-item"><i className="fas fa-hot-tub"></i> {property.jacuzzi ? 'Jacuzzi' : 'No Jacuzzi'}</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><i className="fas fa-utensils"></i> {property.kitchen ? 'Fully Equipped Kitchen' : 'No Kitchen'}</li>
              <li className="list-group-item"><i className="fas fa-tv"></i> {property.smartTV ? 'Smart TV' : 'No Smart TV'}</li>
              <li className="list-group-item"><i className="fas fa-air-conditioner"></i> {property.airConditioning ? 'Air Conditioning' : 'No Air Conditioning'}</li>
              <li className="list-group-item"><i className="fas fa-fireplace"></i> {property.fireplace ? 'Fireplace' : 'No Fireplace'}</li>
              <li className="list-group-item"><i className="fas fa-parking"></i> {property.parking ? 'Free Parking' : 'No Parking'}</li>
              <li className="list-group-item"><i className="fas fa-pet"></i> {property.petFriendly ? 'Pet Friendly' : 'No Pets Allowed'}</li>
            </ul>
          </div>
        </div>
        <div className="d-grid gap-2">
          <Link to={`/booking-page/${property.id}`}>
            <button className="btn btn-primary">Book Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
