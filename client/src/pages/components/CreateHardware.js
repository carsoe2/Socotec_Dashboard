import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button } from '@mui/material';
import moment from 'moment';

export default function CreateHardware() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [employees, setEmployees] = useState([]);

  function handleClick() {
    navigate('/devices');
}


  useEffect(() => {
    getEmployees();
  }, []);

  function getEmployees() {
    axios.get('http://localhost:3001/api/employees').then(function (response) {
      setEmployees(response.data);
    });
  }

  function verifyInput() {
    try {
      const name = inputs["name"];
      const manufacturer = inputs["manufacturer"];
      const serialNumber = parseInt(inputs["serialNumber"]);
      const model = inputs["model"];
      const price = parseFloat(inputs["price"]).toFixed(2);
      var eMonth = inputs["expMonth"].padStart(2, '0');
      var eDay = inputs["expDay"].padStart(2, '0');
      var eYear = inputs["expYear"];
      var pMonth = inputs["purchaseMonth"].padStart(2, '0');
      var pDay = inputs["purchaseDay"].padStart(2, '0');
      var pYear = inputs["purchaseYear"];
      const expirationData = eYear + '/' + eMonth + '/' + eDay;
      const purchaseDate = pYear + '/' + pMonth + '/' + pDay;

      if (!isValidDate(expirationData) || !isValidDate(purchaseDate)) {
        alert("Invalid Date in Form")
        return false;
      } else if (isNaN(parseFloat(inputs["price"]))) {
        alert("Invalid Price")
        return false;
      } else if (isNaN(parseInt(inputs["serialNumber"]))) {
        alert("Serial Number should only be numeric")
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  const handleChange = ({ target: { name, value } }) => {
    setInputs(values => ({ ...values, [name]: value }));
  }

  function isValidDate(dateString) {
    return moment(dateString, 'YYYY/MM/DD', true).isValid();
  }

  function handleSubmit(event) {
    event.preventDefault();
    verifyInput();

    try {
      if (verifyInput()) {
        var eMonth = inputs["expMonth"].padStart(2, '0');
        var eDay = inputs["expDay"].padStart(2, '0');
        var eYear = inputs["expYear"];
        var pMonth = inputs["purchaseMonth"].padStart(2, '0');
        var pDay = inputs["purchaseDay"].padStart(2, '0');
        var pYear = inputs["purchaseYear"];
        const expirationData = eYear + '/' + eMonth + '/' + eDay;
        const purchaseDate = pYear + '/' + pMonth + '/' + pDay;
        const updatedValues = {
          ...inputs,
          "warrantyExpiration": expirationData,
          "purchaseDate": purchaseDate,
        };

        if (!isNaN(updatedValues["employeeOwnerId"]) && updatedValues["employeeOwnerId"] !== '') {
          if (!isNaN(parseInt(updatedValues["employeeOwnerId"]))) {
            const filteredData = employees.filter((el) => {
              var id = el.employeeId
              return id === parseInt(updatedValues["employeeOwnerId"]);
            });

            if (filteredData.length !== 0) {
              axios.post('http://localhost:3001/api/chd/', updatedValues).then(function (response) {
                navigate('/devices');
              });
            } else {
              alert("Employee Id entered does not exist in the table. Please add an employee into the table first");
            }
          } else {
            alert("Employee Id must be numeric");
          }
        } else {
          axios.post('http://localhost:3001/api/chdNoOwner/', updatedValues).then(function (response) {
            navigate('/devices');
          });
        }
      }
    } catch (err) { }
  }

  return (
    <div>
    <div style={{margin:"20px"}}><Button variant="outlined" color="neutral" onClick={handleClick}>Return</Button></div>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1>Create Hardware Device</h1>
      <Box m="40" border="1px solid white" borderRadius="8px" padding="20px">
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box mb="10px">
              <input type="text" name="name" placeholder="Device Name" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="manufacturer" placeholder="Manufacturer" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="model" placeholder="Model" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="serialNumber" placeholder="Serial Number" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="price" placeholder="Price" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="text" name="employeeOwnerId" placeholder="Assigned Employee Id" onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
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
            <Box mb="10px">
              <input type="number" name="purchaseMonth" placeholder="Purchase Month" min="1" max="12" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="number" name="purchaseDay" placeholder="Purchase Day" min="1" max="31" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
            </Box>
            <Box mb="10px">
              <input type="number" name="purchaseYear" placeholder="Purchase Year" min="1000" max="9999" required={true} onChange={handleChange} style={{ fontSize: "0.8rem", padding: "6px", width: "200px" }} />
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
