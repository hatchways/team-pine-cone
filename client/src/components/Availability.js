import DateFnsUtils from '@date-io/date-fns';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Add, Delete, PlusOneRounded } from '@material-ui/icons';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useState } from 'react';
import { useProfileContext } from '../contexts/profile';

function Availability(props) {
    const { profile, setProfile } = useProfileContext()
    const [availability, setAvailability] = useState((profile && profile.availability) || []);
    const createChangeHandler = (i, key) => {
        return e => {
            const newAvail = [...availability]
            newAvail[i][key] = e
            if (newAvail[i].end < newAvail[i].start) {
                newAvail[i].end = newAvail[i].start;
            }
            updateAvailability(newAvail)
        }
    }
    const updateAvailability = newAvail => {
        const newProfile = { ...profile };
        newProfile.availability = newAvail;
        setAvailability(newAvail);
        setProfile(newProfile);
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProfile),
        };
        fetch(`/profile/${profile._id}`, options)
    }
    const addRange = () => {
        const newAvail = [...availability];
        newAvail.push({
            start: new Date(),
            end: new Date()
        })
        updateAvailability(newAvail)
    }
    const createDeleteHandler = i => {
        return () => {
            const newAvail = [...availability];
            newAvail.splice(i, 1)
            updateAvailability(newAvail);
        }
    }
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h2">Availability</Typography>
        </Grid>
            {availability.map((range, i) => (
                <Grid
                key={`range-${i}`}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 10
                }}
                item
                >
                    <IconButton onClick={createDeleteHandler(i)}>
                        <Delete />
                    </IconButton>
                    <Typography>Availability Range {i + 1}</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={range.start} onChange={createChangeHandler(i, "start")} label="Start" />
                        <Typography>to</Typography>
                        <DateTimePicker minDate={range.start} value={range.end} onChange={createChangeHandler(i, "end")} label="End" />
                    </MuiPickersUtilsProvider>
                </Grid>
            ))}
            <IconButton onClick={addRange}>
                <Add />
            </IconButton>
      </Grid>
    );
}

export default Availability;