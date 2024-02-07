import React, { useState, useEffect, useRef } from 'react';

const Homepage = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3000/propertyListings')
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDescriptionClick = property => {
    setSelectedProperty(property);
  };

  const handleClosePopup = () => {
    setSelectedProperty(null);
  };

  const handleClickOutsidePopup = event => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setSelectedProperty(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsidePopup);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsidePopup);
    };
  }, []);

  return (
    <div className="homepage">
      <h1 className="title">Featured Properties</h1>
      <div className="property-grid">
        {properties.map(property => (
          <div key={property.id} className="property-card">
            <img src={property.images} alt={property.title} className="property-image" />
            <div className="property-details">
              <h3 className="property-title">{property.title}</h3>
              <p className="property-location">Location: {property.location}</p>
              <p className="property-price">Price: ${property.price} per night</p>
              <button className="description-button" onClick={() => handleDescriptionClick(property)}>
                Description
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProperty && (
        <div className="popup" ref={popupRef}>
          <div className="popup-content">
            <button className="close-button" onClick={handleClosePopup}>X</button>
            <h2>{selectedProperty.title}</h2>
            <p>{selectedProperty.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
