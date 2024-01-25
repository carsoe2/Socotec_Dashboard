import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ListUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        // axios.get(`http://localhost:80/user-crud/api/user/${id}`).then(function(response) {
        //     console.log(response.data);
        //     setInputs(response.data);
        // });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        // axios.put(`http://localhost:80/user-crud/api/user/${id}/edit`, inputs).then(function(response){
        //     console.log(response.data);
        //     navigate('/');
        // });
        
    }
    return (
        <div>
            <h1>Edit user</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>First Name: </label>
                            </th>
                            <td>
                                <input type="text" name="first" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Last Name: </label>
                            </th>
                            <td>
                                <input type="text" name="last" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Email: </label>
                            </th>
                            <td>
                                <input type="text" name="email" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Company: </label>
                            </th>
                            <td>
                                <input type="text" name="company" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Division: </label>
                            </th>
                            <td> 
                                <input type="text" name="division" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Profit Center: </label>
                            </th>
                            <td>
                                <input type="text" name="profit" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Status: </label>
                            </th>
                            <td>
                                <input type="text" name="status" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align ="right">
                                <button>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}