import React, { useState, useEffect, useRef } from 'react';
import { GiTreehouse } from "react-icons/gi";
import { GiIsland } from "react-icons/gi";
import { GiSpookyHouse } from "react-icons/gi";
import { FaRegSnowflake, FaHome, FaBed  } from "react-icons/fa";
import { LuTent } from "react-icons/lu";
import { GiFamilyHouse } from "react-icons/gi";
import { IoGrid } from "react-icons/io5";
import HomepageCard from './HomepageCard';
import '../css/Homepage.css';
import '../css/HomepageCard.css';
import { BASE_URL } from './config.js';

const Homepage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);  // State to track the selected property.
  const popupRef = useRef(null);

  

  useEffect(() => {
    fetch(`${BASE_URL}/listings`)
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (selectedIcon) {
      const filtered = properties.filter(property => {
        return property.type === selectedIcon;
      });
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(properties);
    }
  }, [selectedIcon, properties]);


  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };


  const handleAllClick = () => {
    setSelectedIcon(null);
  };

  
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
      <div className="icon-container">
        <button className="icon-button" onClick={handleAllClick}>
          <IoGrid className="icon" />
          <span>All</span>
        </button>
        <button className="icon-button" onClick={() => handleIconClick('treehouse')}>
          <GiTreehouse className="icon" />
          <span>Treehouses</span>
        </button>
        <button className="icon-button" onClick={() => handleIconClick('bed_breakfast')}>
          <FaBed className="icon" />
          <span>Bed & Breakfast</span>
        </button>
        <button className="icon-button" onClick={() => handleIconClick('island')}>
          <GiIsland className="icon" />
          <span>Islands</span>
        </button>
        <button className="icon-button" onClick={() => handleIconClick('design')}>
          <GiSpookyHouse className="icon" />
          <span>Design</span>
        </button>
        <button className="icon-button" onClick={() => handleIconClick('arctic')}>
          <FaRegSnowflake className="icon" />
          <span>Arctic</span>
        </button>
        <button className="icon-button" onClick={() => handleIconClick('camping')}>
          <LuTent className="icon" />
          <span>Camping</span>
        </button>
        <button className="icon-button" onClick={() => handleIconClick('mansion')}>
          <GiFamilyHouse className="icon" />
          <span>Mansions</span>
        </button>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="property-grid">
          {filteredProperties.map(property => (
            <div key={property.id} className="property-card">
              <div className="property-image-container">
                <img src={property.images} alt={property.title} className="property-image" />
              </div>
              <div className="property-details">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-location"><i className="fas fa-map-marker-alt"></i> {property.location}</p>
                <p className="property-price"><i className="fas fa-dollar-sign"></i> {property.price} per night</p>
                <button className="description-button" onClick={() => handleDescriptionClick(property)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-7">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {selectedProperty && (
        <div className="popup" ref={popupRef}>
          <div className="popup-content">
            <button className="close-button" onClick={handleClosePopup}> <FaHome /> </button>
            <div className="homepage-card">
              <HomepageCard property={selectedProperty}/>
            </div>
            <p>{selectedProperty.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
