import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import { useEffect, useState } from "react";
import LicenseSearchBar from './components/LicenseSearchBar';
import { useNavigate } from "react-router-dom";

const LicenseDashboard = () => {
    const [content, setContent] = useState(<LicenseSearchBar/>);
    const navigate = useNavigate();

    function handleClick() {
        navigate('/createLicense');
    }

    function handleClick1() {
        setContent(<LicenseSearchBar/>)
    }


    return (
        <div>
            <Box ml="20px" mr="20px">
<LicenseSearchBar />
            </Box>
        </div>
    );
}

export default LicenseDashboard;
