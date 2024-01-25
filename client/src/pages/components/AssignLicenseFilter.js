import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function AssignLicenseFilter(props) {
  const [addedItems, setAddedItems] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    getLicenses();
  }, []);

  function getLicenses() {
    axios.get('http://localhost:3001/api/licenses').then(function (response) {
      //console.log(response.data);
      setLicenses(response.data);
    });
  }

  const handleAddItem = (license) => {
    // Check if the license is already added
    const existingLicense = addedItems.find((item) => item.licenseId === license.licenseId);

    if (existingLicense) {
      // If the license is already added, update the quantity
      setAddedItems((prevItems) =>
        prevItems.map((item) =>
          item.licenseId === license.licenseId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // If the license is not added, add it with quantity 1
      setAddedItems((prevItems) => [...prevItems, { ...license, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (licenseId) => {
    setAddedItems((prevItems) => prevItems.filter((item) => item.licenseId !== licenseId));
  };


  const filteredData = licenses.filter((el) => {
    var license = el.vendor + el.product;
    if (props.input !== '') {
      return license.toLowerCase().includes(props.input);
    }
  });

  return (
    <div style={{ margin: '20px' }}>
      <div style={{ height: 100, overflow: 'auto' }}>
      <ul className="filtered">
        {filteredData.map((license) => (
          <div key={license.licenseId} style={{ display: 'flex', justifyContent: 'space-between', width: '100'}}>
            <li>{license.vendor} {license.product}</li>
            <button onClick={() => handleAddItem(license)}>Add</button>
          </div>
        ))}
      </ul>
      </div>
        <h2>Added Items:</h2>
        <div style={{ height: 150, overflow: 'auto', background: '#fff', color: '#000', borderRadius: '5px'}}>
        <ul>
          {addedItems.map((addedLicense) => (
            <div key={addedLicense.licenseId} style={{ display: 'flex', justifyContent: 'space-between', width: '100'}}>
              <li>{addedLicense.vendor} {addedLicense.product}</li>
              <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <button style={{marginRight: '20px'}}onClick={() => handleRemoveItem(addedLicense.licenseId)}>Remove</button>
              </div>
            </div>


          ))}
        </ul>
        </div>
      </div>
  );
}
