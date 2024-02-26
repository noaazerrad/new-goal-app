import { useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

function NewGoalStats(props) {
  const { goal, open, closeDialog } = props;
  const [statSpec, setStatSpec] = useState({
    goal_id: goal.id,
    value: null,
    reporting_date: null,
  });

  function handleChange(e) {
    console.log(e.target.value);
    setStatSpec({ ...statSpec, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    try {
      let response = await fetch(`/goals/${goal.id}/goal_stats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal_stat_spec: statSpec }),
      });

      if (response.ok) {
        closeDialog();
      } else {
        const error = await response.json();
        console.log("Got error while creating goal stat", error.message);
      }
    } catch (error) {
      console.log("Network error:", error);
    }
  }

  const calenderFormat = useMemo(() => {
    switch (goal.interval) {
      case "daily":
        return "date";
      case "weekly":
        return "week";
      default:
        return "text";
    }
  }, []);

  return (
    <div>
      {open && (
        <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="md">
          <DialogTitle dividers="true">Add New Stat</DialogTitle>
          <DialogContent>
            <TextField
              required
              margin="dense"
              name="value"
              InputLabelProps={{ shrink: true }}
              label="Goal Value"
              type="number"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              name="reporting_date"
              InputLabelProps={{ shrink: true }}
              label="Date"
              type={calenderFormat}
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit}>Create</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default NewGoalStats;
