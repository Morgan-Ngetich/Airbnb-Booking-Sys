import React from 'react';

const PropertyDetails = ({ property }) => {
  return (
    <div>
      <h2>{property.title}</h2>
      <p>Description: {property.description}</p>
      <p>Price: {property.price}</p>
      {/* Display more property details */}
    </div>
  );
};

export default PropertyDetails;
