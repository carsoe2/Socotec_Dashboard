import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Header from "./Header";
import moment from "moment";

export default function CreateLicense() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    vendor: "",
    product: "",
    price: "",
    expMonth: "",
    expDay: "",
    expYear: "",
  });

  function handleClick() {
    navigate('/licenses');
}

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const month = inputs.expMonth.padStart(2, "0");
    const day = inputs.expDay.padStart(2, "0");
    const year = inputs.expYear;
    const expirationData = `${year}/${month}/${day}`;

    if (!isValidDate(expirationData) || isNaN(parseFloat(inputs.price))) {
      alert("Invalid Date or Price");
    } else {
      const updatedValues = {
        ...inputs,
        expirationData: expirationData,
      };

      axios.post("http://localhost:3001/api/licenses/", updatedValues).then(function (response) {
        navigate("/licenses");
      });
    }
  };

  function isValidDate(dateString) {
    return moment(dateString, "YYYY/MM/DD", true).isValid();
  }

  return (
    <div>
<div style={{margin:"20px", marginBottom:"0"}}><Button variant="outlined" color="neutral" onClick={handleClick}>Return</Button></div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{marginBottom:"0"}}>Create License</h1>
      <Box m="40px" mt="20px"border="1px solid white" borderRadius="8px" padding="20px">
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box mb="10px">
              <input type="text" name="vendor" placeholder="Vendor" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="product" placeholder="Product" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="price" placeholder="Price" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="number" name="expMonth" placeholder="Expiration Month" min="1" max="12" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="number" name="expDay" placeholder="Expiration Day" min="1" max="31" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="number" name="expYear" placeholder="Expiration Year" min={new Date().getFullYear()} max="9999" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="5px">
              <button style={{ fontSize: "0.8rem", padding: "4px" }}>Save</button>
            </Box>
          </Box>
        </form>
      </Box>
    </div>
    </div>
  );
}
