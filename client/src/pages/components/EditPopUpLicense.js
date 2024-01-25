import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

const EditPopUpLicense = (props) => {
  const [license, setLicense] = useState(null);
  const getLicense = (async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/get/license/licenseid/${props.licenseId}`);
      setLicense(response.data[0]);
    } catch (error) {
      throw error; // Rethrow the error to indicate failure
    }
  });

  useEffect(() => {
    getLicense();
  }, [props.licenseId]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLicense((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/put/license/licenseid/${props.licenseId}`,
        license
      );
      console.log(response.data);
      props.onSubmit();
    } catch (error) {
      throw error; // Rethrow the error to indicate failure
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      {license ? (
        <>
          <div style={{ margin: "20px" }}>
            <h1>Edit Licenses</h1>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div style={{ width: "15%" }}><p style={{ margin: "0" }}>Vendor:</p></div>
              <div style={{ width: "85%" }}><input style={{ width: "100%" }} type="text" name="vendor" defaultValue={license.vendor} onChange={handleChange} /></div>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div style={{ width: "15%" }}><p style={{ margin: "0" }}>Product:</p></div>
              <div style={{ width: "85%" }}><input style={{ width: "100%" }} type="text" name="product" defaultValue={license.product} onChange={handleChange} /></div>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div style={{ width: "15%" }}><p style={{ margin: "0" }}>Price:</p></div>
              <div style={{ width: "85%" }}><input style={{ width: "100%" }} type="text" name="price" defaultValue={license.price} onChange={handleChange} /></div>
            </div>

            {/* <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ width: "15%" }}><p style={{ margin: "0" }}>Expiration Date:</p></div>
            <div style={{ width: "85%" }}><input style={{ width: "100%" }} type="text" name="expirationDate" defaultValue={license.expirationDate} onChange={handleChange} /></div>
          </div> */}
            <div style={{ display: "flex" }}>
              <div style={{ width: "15%" }}><p style={{ margin: "0" }}>Is Active:</p></div>
              <div style={{ width: "85%" }}><input style={{ width: "100%" }} type="text" name="isActive" defaultValue={license.isActive} onChange={handleChange} /></div>
            </div>
          </div>
          <Button variant="contained" color="success" style={{ marginLeft: "20px" }} type="submit">Submit</Button>
        </>
      ) : (
        <p>loading...</p>
      )}
    </form>
  );
};

export default EditPopUpLicense;