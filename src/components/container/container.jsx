import React, { useState } from 'react';
import "./container.css";
import "./script.js";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import Avatar from '@mui/material/Avatar';
export default function Container() {
    const [temperature, setTemperature] = useState(22);

    const handleSliderChange = (event) => {
      setTemperature(event.target.value);
    };  
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    
  
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  // Individual section component
  function Section({ title, children }) {
    return (
      <div className="section">
        <h2>{title}</h2>
        {children}
      </div>
    );
  }
  
  return (
    <div className="sections">
        <section id="temperature-control">
        <h2>Temperature Control</h2>
        <input
          type="range"
          id="temp-slider"
          min="0"
          max="30"
          value={temperature}
          onChange={handleSliderChange}
        />
        <span id="temp-display">{`${temperature}°C`}</span>
      </section>
        <section id="battery-status">
            <h2>Battery Status</h2>
            <div id="battery-level" class="battery-indicator">
                <div class="battery-charge"></div>
            </div>
        </section>
        <section id="schedule">
            <h2>test vercel building</h2>
        </section>
        <section id="statistics">
            <h2>Statistics</h2>
        </section>
        <section id="settings">
            <h2>Settings</h2>
        </section>
        <section id="connectivity-status">
            <h2>Connectivity Status</h2>
        </section>
      </div>
  );
}
// test commmit