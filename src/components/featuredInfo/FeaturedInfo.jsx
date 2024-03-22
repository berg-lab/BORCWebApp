import React, { useState } from 'react';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { iot_data } from '../../data'; // Assuming data.js is in the same directory as this component;
import './featuredInfo.css';

export default function FeaturedInfo() {
  const [searchNodeId, setSearchNodeId] = useState(''); // State to store the input node_id
  const [nodeData, setNodeData] = useState(null); // State to store the data for the input node_id

  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    setSearchNodeId(event.target.value);
  };

  // Function to handle search and display data for the input node_id
  const handleSearch = () => {
    const filteredData = iot_data.filter(item => item.node_id === parseInt(searchNodeId));
    if (filteredData.length > 0) {
      setNodeData(filteredData[0]);
    } else {
      // If no data found for the input node_id, reset nodeData
      setNodeData(null);
    }
  };

  return (
    <div className="featured">
      <div className="searchBar">
        <input
          type="text"
          className="searchInput"
          value={searchNodeId}
          onChange={handleInputChange}
          placeholder="Enter Node ID"
        />
        <button className="searchButton" onClick={handleSearch}>Search</button>
      </div>
      <div className="featuredItems">
        {nodeData && (
          <>
            <div className="featuredItem">
              <span className="featuredTitle">Temperature</span>
              <div className="featuredMoneyContainer">
                <span className="featuredMoney">{nodeData.temperature}</span>
                <span className="featuredMoneyRate">
                  <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
              <span className="featuredTitle">Humidity</span>
              <div className="featuredMoneyContainer">
                <span className="featuredMoney">{nodeData.humidity}</span>
                <span className="featuredMoneyRate">
                  <ArrowDownward className="featuredIcon negative" />
                </span>
              </div>
              <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
              <span className="featuredTitle">Current</span>
              <div className="featuredMoneyContainer">
                <span className="featuredMoney">{nodeData.current}</span>
                <span className="featuredMoneyRate">
                  <ArrowUpward className="featuredIcon" />
                </span>
              </div>
              <span className="featuredSub">Compared to last month</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
