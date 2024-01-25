import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import axios from "axios";
import Tooltip from "@mui/material";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "./components/Header";
import { tokens } from "../theme";
import { render } from "@fullcalendar/core/preact";



const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const [licenses, setLicenses] = useState([]);
  useEffect(() => {
    getLicenses();
  }, []);

  function getLicenses() {
    axios.get('http://localhost:3001/api/licenses').then(function (response) {
      //console.log(response.data);
      setLicenses(response.data);
    });
  }

  const [chds, setChds] = useState([]);
  useEffect(() => {
      getChds();
  }, []);

  function getChds() {
      axios.get('http://localhost:3001/api/chd').then(function(response) {
          //console.log(response.data);
          setChds(response.data);
      });
  }


  const currentMonthYear = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  };

  const sidebarEvents = licenses.filter((event) => {
    const eventDate = new Date(event.expirationData);
    return (
      eventDate.getFullYear() === currentMonthYear.year &&
      eventDate.getMonth() === currentMonthYear.month
    );
  });

  function fixDateLicense(date) {
    return date.expirationData.slice(0, 10);
  }

  function fixDate(date) {
    return date.warrantyExpiration.slice(0, 10);
  }

  const licenseEvents = 
  licenses.map((event) => ({
    id: event.licenseId,
    title: event.vendor + " " + event.product,
    start: fixDateLicense(event),
    date: fixDateLicense(event),
  }));

  const hardwareEvents = 
  chds.map((event) => ({
    id: event.hardwareId,
    title: event.name + " " + event.manufacturer + " " + event.model,
    start: fixDate(event),
    date: fixDate(event),
  }));



  return (
    <Box m="20px">
      <Header title="Expiration Calendar" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
        flex="1 1 20%"
        backgroundColor={colors.primary[400]}
        p="15px"
        borderRadius="4px"
      >
        <Typography variant="h5">Expirations This Month</Typography>
        <List>
          {sidebarEvents.map((event) => (
            <ListItem
              key={event.licenseId}
              sx={{
                backgroundColor: colors.greenAccent[500],
                margin: "10px 0",
                borderRadius: "2px",
              }}
            >
              <ListItemText
                primary={event.vendor + " " + event.product + " Expires"}
                secondary={
                  <Typography>
                    {formatDate(event.expirationData.slice(0, 10), {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            
            eventSources={[
              {
                id: "licenses",
                events: licenseEvents,
              },
              {
                id: "hardware",
                events: hardwareEvents,
              }
            ]}
            eventClick={
              function(info) {
                alert("License/Warranty Expiration: " + info.event.title + " on "+ formatDate(info.event.start, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }));
              }
            }

          />

        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;