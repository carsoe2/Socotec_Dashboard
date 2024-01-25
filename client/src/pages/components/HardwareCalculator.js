import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HardwareSearchBar from './HardwareSearchBar';

export default function HardwareCalculator() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        // axios.post('http://localhost:80/user-crud/api/user/save', inputs).then(function(response){
        //     console.log(response.data);
        //     navigate('/');
        // });
    }
    return (
        <div>
            <h1 style={{marginTop:"0"}}>Hardware Purchasing Calculator</h1>
            <HardwareSearchBar />
        </div>
    )
}
