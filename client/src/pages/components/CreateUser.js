import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button} from "@mui/material";

export default function ListUser() {
  const navigate = useNavigate();
  
  function handleClick() {
    navigate('*');
}

  const [inputs, setInputs] = useState([]);
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    getLicenses();
  }, []);

  function getLicenses() {
    axios.get("http://localhost:3001/api/licenses").then(function (response) {
      setLicenses(response.data);
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const licenseId = parseInt(inputs["licenseId"]);
    const filteredData = licenses.filter((el) => el.licenseId === licenseId);

    if (filteredData.length !== 0) {
      axios.post("http://localhost:3001/api/employees/", inputs).then(function (response) {
        navigate("/");
      });
    } else {
      alert("License Id entered does not exist in the table. Please add a license into the table first");
    }
  };

  return (
    <div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{marginBottom:"0"}} >Create New Employee</h1>
      <div style={{marginTop:"20px"}}><Button variant="outlined" color="neutral" onClick={handleClick}>Return</Button></div>
      <Box m="40px" mt="20px" border="1px solid white" borderRadius="8px" padding="20px">
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box mb="10px">
              <input type="text" name="fName" placeholder="First Name" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="lName" placeholder="Last Name" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="email" placeholder="Email" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="company" placeholder="Company" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="division" placeholder="Division" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="profitCenter" placeholder="Profit Center" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="licenseId" placeholder="License Id" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
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
