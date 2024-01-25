import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import EditPopUpChd from "./EditPopUpChd";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

export default function ListChds(props) {
  const theme = useTheme();
  
  const [chds, setChds] = useState([]);
  const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const colors = tokens(theme.palette.mode);
  const contentStyle = { background: `${colors.primary[500]}`, borderRadius: "5px" };

  const openPopupEdit = () => {
    
    setIsPopupEditOpen(true);
  };

  const openPopupDelete = () => {
    
    setIsPopupDeleteOpen(true);
  };

  useEffect(() => {
    getChds();
  }, []);

  function getChds() {
    axios.get("http://localhost:3001/api/chd").then(function (response) {
      //console.log(response.data);
      setChds(response.data);
    });
  }
  function formatDate(date) {
    var res = "";
    for (var i = 0; i < 10; i++) res += date[i];
    return res;
  }
  const deleteChd = (id) => {
    axios
      .delete(`http://localhost:3001/api/delete/hardware/${id}`)
      .then(function (response) {
        //console.log(response.data);
        getChds();
      });
  };

  const filteredData = chds.filter((el) => {
    var chd = el.name + el.manufacturer + el.model + el.serialNumber;
    if (props.input === "") {
      return chds;
    } else {
      return chd.toLowerCase().includes(props.input);
    }
  });


  const columns = [
    { field: "hardwareId", headerName: "Hardware Id", width: 90 },
    {
      field: "name",
      headerName: "Name",
      
      //   editable: true,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      
      //   editable: true,
    },
    {
      field: "model",
      headerName: "Model",
      
      //   editable: true,
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      
      //   editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      
      //   editable: true,
    },
    {
      field: "purchaseDate",
      headerName: "Purchase Date",
      valueGetter: (params) =>
        (params.row.purchaseDate = formatDate(
          params.row.purchaseDate
        )),
      //   editable: true,
    },
    {
      field: "warrantyExpiration",
      headerName: "Warranty Expiration",
      
      valueGetter: (params) =>
        (params.row.warrantyExpiration = formatDate(
          params.row.warrantyExpiration
        )),
      //   editable: true,
    },
    {
      field: "employeeOwnerId",
      headerName: "Assigned User",
      
      valueGetter: (params) =>
        params.row.employeeOwnerId == null
          ? "Not Assigned"
          : params.row.employeeOwnerId,
      //   editable: true,
    },
    {
      field: "Edit",
      headerName: "Edit User",
      renderCell: (params) => {
        return (
          <div>
            <Popup
              open={isPopupEditOpen}
              trigger={<Button color="secondary" onClick={() => openPopupEdit}>Edit</Button>}
              modal
              nested
              {...{ contentStyle }}
            >
              {(close) => (
                <div className="modal">
                  <div className="content">
                    <EditPopUpChd
                      hardwareId={params.id}
                      onSubmit={() => {close(); getChds();}}
                    />
                    <div style={{display:"flex", justifyContent:"end", margin:"20px"}}><Button variant="outlined" color="error" onClick={() => close()}>Cancel</Button></div>

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
      headerName: "Delete License",
      renderCell: (params) => {
        return (
          <Popup trigger={<Button variant="outlined" color="error" onClick={() => openPopupDelete}>Delete</Button>} modal nested {...{ contentStyle }}>
            {(close) => (
              <div className="modal">
                <div className="content">
                <div style={{margin:"20px"}}>
                  <p>Do you want to permanently delete this license?</p>
                  <div style={{display:"flex", justifyContent:"space-between", width: "100"}}>
                    <Button variant="contained" color="success" onClick={() => { deleteChd(params.id); }}>Yes</Button>
                    <Button variant="outlined" color="error" onClick={() => close()}>Cancel</Button>
                    </div>
                    </div>
                </div>
              </div>
            )}
          </Popup>
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
            getRowId={(row) => row.hardwareId}
            pageSize={15}
          />
        </div>
      </div>
    </div>
  );
}
