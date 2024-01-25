import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from '@mui/material';

const EditPopUpChd = (props) => {
  const [chd, setChd] = useState(null);

  const getChd = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/get/hardware/hardwareid/${props.hardwareId}`
      );
      setChd(response.data[0]);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getChd();
  }, [props.chdId]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setChd((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/put/hardware/hardwareid/${props.hardwareId}`,
        chd
      );
      console.log(response.data);
      props.onSubmit();
    } catch (error) {
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      {chd ? (
        <>
          <h1>Edit Hardware</h1>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ width: "15%" }}>
              <p style={{ margin: "0" }}>Name:</p>
            </div>
            <div style={{ width: "85%" }}>
              <input
                style={{ width: "100%" }}
                type="text"
                name="name"
                defaultValue={chd.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ width: "15%" }}>
              <p style={{ margin: "0" }}>Manufacturer:</p>
            </div>
            <div style={{ width: "85%" }}>
              <input
                style={{ width: "100%" }}
                type="text"
                name="manufacturer"
                defaultValue={chd.manufacturer}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ width: "15%" }}>
              <p style={{ margin: "0" }}>Model:</p>
            </div>
            <div style={{ width: "85%" }}>
              <input
                style={{ width: "100%" }}
                type="text"
                name="model"
                defaultValue={chd.model}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ width: "15%" }}>
              <p style={{ margin: "0" }}>Serial Number:</p>
            </div>
            <div style={{ width: "85%" }}>
              <input
                style={{ width: "100%" }}
                type="text"
                name="serialNumber"
                defaultValue={chd.serialNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ width: "15%" }}>
              <p style={{ margin: "0" }}>Price:</p>
            </div>
            <div style={{ width: "85%" }}>
              <input
                style={{ width: "100%" }}
                type="text"
                name="price"
                defaultValue={chd.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ width: "15%" }}>
              <p style={{ margin: "0" }}>Employee Id:</p>
            </div>
            <div style={{ width: "85%" }}>
              <input
                style={{ width: "100%" }}
                type="text"
                name="employeeOwnerId"
                defaultValue={chd.employeeOwnerId}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button
            variant="contained"
            color="success"
            type="submit"
          >
            Submit
          </Button>
        </>
      ) : (
        <p>loading...</p>
      )}
    </form>
  );
};

export default EditPopUpChd;
