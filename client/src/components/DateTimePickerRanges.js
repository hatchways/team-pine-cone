import "date-fns";
import React, { useState } from "react";
import { Grid } from "@material-ui/core/";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { isSameDay, format } from "date-fns";

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

const sortDBDates = (ranges) =>
  ranges.sort((a, b) => {
    if (a.start < b.start) return -1;
    if (a.start > b.start) return 1;
    return 0;
  });

const DateTimePickerRanges = function ({
  onChangeLeft,
  onChangeRight,
  labelLeft,
  labelRight,
  leftValue,
  rightValue,
  ranges,
}) {
  const [leftError, setLeftError] = useState("");
  const [rightError, setRightError] = useState("");

  const leftHandler = (day) => {
    setRightError("");
    const [minDate] = sortDBDates(ranges);

    if (new Date(day) < new Date(minDate.start)) {
      return setLeftError(
        `Minimum date is ${format(
          new Date(minDate.start),
          "MMM co yyyy h:mm a"
        )}`
      );
    }

    setLeftError("");
    onChangeLeft(day);
  };

  const rightHandler = (day) => {
    if (leftError) return;
    setRightError("");
    if (new Date(day) < new Date(leftValue)) {
      return setRightError(
        `Minimum date is ${format(new Date(leftValue), "MMM co yyyy h:mm a")}`
      );
    }

    const maxDate = sortDBDates(ranges)[ranges.length - 1];

    if (new Date(day) > new Date(maxDate.end)) {
      return setRightError(
        `Maximum date is ${format(new Date(maxDate.end), "MMM co yyyy h:mm a")}`
      );
    }

    onChangeRight(day);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container alignItems="center" direction="column" spacing={2}>
          <Grid item xs={6}>
            <DateTimePicker
              clearable
              strictCompareDates
              disablePast
              shouldDisableDate={allowedDropInDates(ranges)}
              value={leftValue}
              onOpen={() => onChangeRight(null)}
              fullWidth
              onChange={leftHandler}
              label={leftError ? leftError : labelLeft}
              inputVariant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <DateTimePicker
              disabled={leftValue === null}
              strictCompareDates
              error={!!rightError}
              shouldDisableDate={allowedDropOffDates(ranges, leftValue)}
              fullWidth
              value={rightValue}
              onChange={rightHandler}
              label={rightError ? rightError : labelRight}
              inputVariant="outlined"
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default DateTimePickerRanges;
