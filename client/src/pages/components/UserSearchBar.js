import React, { useState, useEffect } from "react";
import ListFilteredUser from "./ListFilteredUser";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button } from '@mui/material';

const UserSearchBar = () => {
  const [inputText, setInputText] = useState("");
  const [activeCount, setActiveCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  function handleClick() {
    navigate('/createUser');
  }

  useEffect(() => {
    getActiveCount();
    getTotalCount();
  }, [listChanged]);

  function listChanged() {
    getActiveCount();
    getTotalCount();
  }

  let inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  async function getActiveCount() {
    await axios.get("http://localhost:3001/api/get/employee/activeCount").then(function (response) {
      setActiveCount(response.data[0]["sum(filtered)"]);
    });
  }

  async function getTotalCount() {
    await axios.get("http://localhost:3001/api/get/employee/totalCount").then(function (response) {
      setTotalCount(response.data[0]["sum(filtered)"]);
    });
  }

  // Calculate the percentage of active users
  const activePercentage = (activeCount / totalCount) * 100;

  // Calculate the width of the bars, ensuring the total width does not exceed 200px
  const activeBarWidth = Math.min(200, (activePercentage / 100) * 200);
  const remainingBarWidth = Math.min(200 - activeBarWidth, 200);

  return (


    <div className="main">
      <Box>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Employee Dashboard</h1>
        </div>
      </Box>
      <div style={{ height: 400, width: "100" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <div className="main">
              <div className="main" style={{ marginBottom: "0" }}>
                {/* Bar representation */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <span>{activeCount}/{totalCount} Active Employees</span>
                    <div
                      style={{
                        width: `${activeBarWidth}px`,
                        height: "20px",
                        backgroundColor: "green",
                        borderRadius: "5px",
                      }}
                    />
                    <div
                      style={{
                        width: `${remainingBarWidth}px`,
                        height: "20px",
                        backgroundColor: "blue",
                        borderRadius: "5px",

                      }}
                    />
                  
                </div>
                <div><Button variant="outlined" color="neutral" onClick={handleClick}>Create New Employee</Button></div>
                </div>
              </div>
              <div className="search">
                <TextField
                  id="outlined-basic"
                  onChange={inputHandler}
                  variant="outlined"
                  fullWidth
                  label="Search employees"
                />
              </div>
              <br />
              <ListFilteredUser input={inputText} onChange={listChanged} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearchBar;
