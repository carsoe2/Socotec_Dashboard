import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import Header from './components/Header';
import { useEffect, useState } from "react";
import UserSearchBar from './components/UserSearchBar';
import { useNavigate } from "react-router-dom";

const UserDash = () => {
    const [content, setContent] = useState(<UserSearchBar/>);
    const navigate = useNavigate();

    function handleClick() {
        navigate('/createUser');
    }

    function handleClick1() {
        setContent(<UserSearchBar/>)
    }


    return (
        <Box ml="20px" mr="20px">
        <UserSearchBar/>
        </Box>
            // <Box ml="20px" mr="20px">
            //     <div style={{display: "flex", justifyContent: "space-between"}}>
            //     <h1>Employee Dashboard</h1>
            //     <div>
            //     <Button variant="contained" onClick={handleClick}>Create New Employee</Button>
            //     <Button variant="contained" onClick={handleClick1}>List Employees</Button>
            //     </div>
            //     </div>
            //     {content}


            // </Box>
    );
}

export default UserDash;
