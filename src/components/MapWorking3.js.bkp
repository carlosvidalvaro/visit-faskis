import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import londonNeighborhoods from '../data/final.json'; // Assuming the GeoJSON is stored locally

const Map = () => {
  const [visitedNeighborhoods, setVisitedNeighborhoods] = useState([]);
  const mapRef = React.useRef(null); // Create a ref to the map instance
  const neighborhoodsLayerRef = React.useRef(null); // Reference to the neighborhoods layer

  // Calculate total postcodes and visited postcodes
  const totalPostcodes = londonNeighborhoods.features.length;
  const numberOfVisitedPostcodes = visitedNeighborhoods.length;
  const percentageVisited = totalPostcodes ? Math.round((numberOfVisitedPostcodes / totalPostcodes) * 100) : 0;

  useEffect(() => {
    // Initialize the map and set its view to London
    const map = L.map(mapRef.current).setView([51.505, -0.09], 10);

    // Add the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Load the GeoJSON data for the neighborhoods
    neighborhoodsLayerRef.current = L.geoJSON(londonNeighborhoods, {
      style: (feature) => ({
        color: 'blue',
        weight: 2,
        fillColor: visitedNeighborhoods.includes(feature.properties.hoods) ? 'green' : 'lightblue',
        fillOpacity: 0.5,
      }),
      onEachFeature: (feature, layer) => {
        const neighborhoodName = feature.properties.hoods;

        // Add a click event listener for marking/unmarking visited neighborhoods
        layer.on('click', () => {
          // Toggle the visited status and update state
          toggleNeighborhoodVisited(neighborhoodName);
        });

        // Show neighborhood name when hovering
        layer.bindTooltip(neighborhoodName, { permanent: false, direction: 'auto' });
      }
    }).addTo(map);

    // Load visited neighborhoods from local storage
    const storedVisited = JSON.parse(localStorage.getItem('visitedNeighborhoods')) || [];
    setVisitedNeighborhoods(storedVisited);

    // Cleanup on component unmount
    return () => {
      map.remove(); // Cleanup map on component unmount
    };
  }, []);

  useEffect(() => {
    if (neighborhoodsLayerRef.current) {
      // Update the style of neighborhoods based on the visited status
      neighborhoodsLayerRef.current.setStyle((feature) => ({
        color: 'blue',
        weight: 2,
        fillColor: visitedNeighborhoods.includes(feature.properties.hoods) ? 'green' : 'lightblue',
        fillOpacity: 0.5,
      }));
    }
  }, [visitedNeighborhoods]);

  // Function to toggle the neighborhood's visited status
  const toggleNeighborhoodVisited = (neighborhoodName) => {
    setVisitedNeighborhoods((prevVisited) => {
      const isVisited = prevVisited.includes(neighborhoodName);
      const newVisited = isVisited
        ? prevVisited.filter((name) => name !== neighborhoodName) // Unmark if already visited
        : [...prevVisited, neighborhoodName]; // Mark if not visited

      // Save the new state to localStorage
      localStorage.setItem('visitedNeighborhoods', JSON.stringify(newVisited));
      return newVisited;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div ref={mapRef} style={{ flex: '1', width: '100%' }} />

      {/* New component displaying visited postcodes and percentage */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        borderTop: '1px solid #ccc',
        fontSize: '24px', // Set font size to match h1
        fontWeight: 'bold', // Make it bold
        textAlign: 'center', // Center the text
      }}>
        <div>
          Visited Postcodes: {numberOfVisitedPostcodes}/{totalPostcodes}
        </div>
        <div>
          Percentage Visited: {percentageVisited}%
        </div>
      </div>

      <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '10px' }}>
        <h3 style={{
          textAlign: 'center',
          marginBottom: '10px',
          position: 'sticky', // Make the title sticky
          top: '0', // Stick to the top of the list
          backgroundColor: '#f9f9f9', // Same background as the list
          zIndex: 1, // Ensure it stays above the list
          padding: '10px 0', // Add padding for spacing
        }}>
          Neighborhoods
        </h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {londonNeighborhoods.features.map((feature) => {
            const neighborhoodName = feature.properties.hoods;
            return (
              <li key={neighborhoodName}>
                <label>
                  <input
                    type="checkbox"
                    value={neighborhoodName} // Set value for easy reference
                    checked={visitedNeighborhoods.includes(neighborhoodName)}
                    onChange={() => toggleNeighborhoodVisited(neighborhoodName)} // Toggle on checkbox change
                  />
                  {neighborhoodName} (Postcode: {feature.properties.Name})
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Map;
