import "date-fns";
import React, { useState } from "react";
import { Grid } from "@material-ui/core/";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { isSameDay } from "date-fns";

const allowedDropInDates = (ranges) => (day) => {
  const dayDate = new Date(day);

  return ranges.every(({ start, end }) => {
    if (isSameDay(new Date(day), new Date(start))) return false;
    return dayDate <= new Date(start) || dayDate > new Date(end);
  });
};

const allowedDropOffDates = (ranges, leftDate) => (day) => {
  const dayDate = new Date(day);
  if (isSameDay(leftDate, dayDate)) return false;
  if (leftDate >= dayDate) return true;

  for (let i = 0; i < ranges.length; i++) {
    if (
      dayDate > new Date(ranges[i].start) &&
      dayDate < new Date(ranges[i].end)
    ) {
      if (
        leftDate >= new Date(ranges[i].start) &&
        leftDate <= new Date(ranges[i].end)
      ) {
        return false;
      }
    }
  }
  return true;
};

const DateTimePickerRanges = function ({
  onChangeLeft,
  onChangeRight,
  labelLeft,
  labelRight,
  leftValue,
  rightValue,
  ranges,
}) {
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container alignItems="center" direction="column" spacing={2}>
          <Grid item xs={6}>
            <DateTimePicker
              clearable
              strictCompareDates
              strictCompareDates
              shouldDisableDate={allowedDropInDates(ranges)}
              value={leftValue}
              onOpen={() => onChangeRight(null)}
              fullWidth
              onChange={onChangeLeft}
              label={labelLeft}
              inputVariant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <DateTimePicker
              disabled={leftValue === null}
              strictCompareDates
              shouldDisableDate={allowedDropOffDates(ranges, leftValue)}
              fullWidth
              value={rightValue}
              onChange={onChangeRight}
              label={labelRight}
              inputVariant="outlined"
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default DateTimePickerRanges;
