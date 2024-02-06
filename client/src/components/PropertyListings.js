import React from 'react';

const PropertyListings = ({ listings }) => {
  return (
    <div>
      <h2>Property Listings</h2>
      <ul>
        {/* Map through listings and display each property */}
        {listings.map(listing => (
          <li key={listing.id}>
            <h3>{listing.title}</h3>
            <p>Price: {listing.price}</p>
            {/* Display more property details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyListings;
