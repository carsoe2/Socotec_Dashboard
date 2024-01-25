import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import EditPopUp from "./EditPopUp";
import { tokens } from "../../theme";
import { Button, ButtonBase, useTheme } from "@mui/material";
import AssignLicenseSearch from "./AssignLicenseSearch";
import AssignHardwareSearch from "./AssignHardwareSearch";

export default function ListUser(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const contentStyle = { background: `${colors.primary[500]}`, borderRadius: "5px" };
  const arrowStyle = { color: '#000' };

  const [isPopupAssignmentsOpen, setIsPopupAssignmentsOpen] = useState(false);
  const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
  const [isPopupLicensesOpen, setIsPopupLicensesOpen] = useState(false);
  const [isPopupHardwareOpen, setIsPopupHardwareOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const openPopupAssignments = () => {

    setIsPopupAssignmentsOpen(true);
  };

  const openPopupEdit = () => {

    setIsPopupEditOpen(true);
  };

  const openPopupLicenses = () => {

    setIsPopupLicensesOpen(true);
  };

  const openPopupHardware = () => {

    setIsPopupHardwareOpen(true);
  };

  const openPopupDelete = () => {

    setIsPopupDeleteOpen(true);
  };

  const closePopup = () => {

    setIsPopupAssignmentsOpen(false);
    setIsPopupEditOpen(false);
    setIsPopupLicensesOpen(false);
    setIsPopupHardwareOpen(false);
    setIsPopupDeleteOpen(false);
  };

  function getUsers() {
    axios.get("http://localhost:3001/api/employees").then(function (response) {
      //console.log(response.data);
      setUsers(response.data);
    });
  }
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3001/api/delete/employee/${id}`)
      .then(function (response) {
        //console.log(response.data);
        getUsers();
        props.onChange();
      });
    getUsers()
  };

  const filteredData = users.filter((el) => {
    var fullname = el.fName + el.lName;
    if (props.input === "") {
      return users;
    } else {
      return fullname.toLowerCase().includes(props.input);
    }
  });



  const columns = [
    { field: "employeeId", headerName: "Id", width: "50" },
    {
      field: "isActive",
      headerName: "Status",
      width: "75",
      valueGetter: (params) =>
        params.row.isActive === 1 ? "Active" : "Inactive",
      renderCell: (params) => (
        <div style={{ backgroundColor: params.row.isActive === 1 ? 'green' : 'red', padding: '4px', borderRadius: '4px', textAlign: 'center' }}>
          {params.row.isActive === 1 ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      field: "fName",
      width: "75",
      headerName: "First name",

      //   editable: true,
    },
    {
      field: "lName",
      width: "75",
      headerName: "Last name",

      //   editable: true,
    },
    {
      field: "email",
      headerName: "Email",

      //   editable: true,
    },
    {
      field: "division",
      headerName: "Division",

      //   editable: true,
    },
    {
      field: "company",
      headerName: "Company",

      //   editable: true,
    },
    {
      field: "profitCenter",
      headerName: "Profit Center",
      //   editable: true,
    },
    {
      field: "licenses",
      headerName: "Assignments",
      renderCell: (params) => {
        return (

          <div> 
            
            <Popup open={isPopupAssignmentsOpen} trigger={<Button  color="neutral" onClick={() => openPopupAssignments}>View</Button>} modal nested

              closeOnTriggerClick={true} onClose={closePopup} {...{ contentStyle }}>
              {(close) => (
                <div className="modal">
                  <div className="content">
                    <h1 style={{ marginLeft: "20px" }}>Assigned Licenses</h1>
                    <ul>
                      <li>Adobe Photoshop</li>
                      <li>Adobe Illustrator</li>
                      <li>Microsoft Office 365</li>
                      <li>Saleforce CRM</li>
                      <li>Autodesk AutoCAD</li>
                    </ul>
                    <h1 style={{ marginLeft: "20px" }}>Assigned Hardware</h1>
                    <ul>
                      <li>Dell XPS13 Laptop</li>
                    </ul>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      <Button variant="outlined" color="error" onClick={() => { openPopupAssignments(); close(); }} style={{ margin: "20px" }}>Close</Button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        );
      },
    },
    {
      field: "Edit",
      headerName: "Edit User",
      renderCell: (params) => {
        return (
          <div>

            
            <Popup open={isPopupEditOpen} trigger={<Button color="secondary" onClick={() => openPopupEdit}>Edit</Button>} modal nested

              {...{ contentStyle }}>
              {(close) => (
                <div className="modal">
                  <div className="content">
                    <EditPopUp employeeId={params.id} onSubmit={() => {close(); getUsers();}} />
                    <div style={{ display: 'flex', justifyContent: 'end', margin: "20px" }}><Button variant="outlined" color="error" onClick={() => close()}>Cancel</Button></div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        );
      },
    },
    {

      field: "assignlicenses",
      headerName: "Licenses",
      renderCell: (params) =>{
        return (
        <div>
            
        <Popup open={isPopupLicensesOpen} trigger={<Button color="neutral" onClick={() => openPopupLicenses}>Assign</Button>} modal nested
          {...{ contentStyle }}>
          {(close) => (
            <div className="modal">
              <div className="content">
                <AssignLicenseSearch />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 
                <Button variant="contained" color="success" onClick={() => close()} style={{ margin: "20px" }}>Assign Licenses</Button>
                <Button variant="outlined" color="error" onClick={() => close()} style={{ margin: "20px" }}>Cancel</Button>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </div>
    );
  },
      },

 
    {

      field: "assignhardware",

      headerName: "Hardware",
      renderCell: (params) => {
        return (
          <div>

            
            <Popup open={isPopupHardwareOpen} trigger={<Button color="neutral" onClick={() => openPopupHardware}>Assign</Button>} modal nested

              {...{ contentStyle }}>
              {(close) => (
                <div className="modal">
                  <div className="content">
                    <AssignHardwareSearch />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                      <Button variant="contained" color="success" onClick={() => close()} style={{ margin: "20px" }}>Assign Hardware</Button>
                      <Button variant="outlined" color="error" onClick={() => close()} style={{ margin: "20px" }}>Cancel</Button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        );
      },
    },
    {
      field: "Remove",
      headerName: "Delete User",
      renderCell: (params) => {

        return(
          <div>
            
            <Popup open={isPopupDeleteOpen} trigger={<Button variant="outlined" color="error" onClick={() => openPopupDelete}>Delete</Button>} modal nested {...{ contentStyle }}>

              {(close) => (
                <div className="modal">
                  <div className="content">
                    <div style={{margin:"20px"}}>
                    <p>Do you want to permanently delete this user?</p>
                    <div style={{display:"flex", justifyContent:"space-between", width: "100"}}>
                    <Button variant="contained" color="success" onClick={() => { deleteUser(params.id); }}>Yes</Button>
                    <Button variant="outlined" color="error" onClick={() => close()}>Cancel</Button>
                    </div>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            columns={columns}
            rows={filteredData}
            getRowId={(row) => row.employeeId}
            pageSize={15}
          />
        </div>
      </div>
    </div>
  );
}
