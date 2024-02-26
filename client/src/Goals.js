import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import NewGoal from "./NewGoal";
import NewGoalStats from "./NewGoalStats";
import GoalTableCell from "./GoalsTableCell";

// This component displays a list of user goals, allows users to create new goals,
// and report goal statistics.

function Goals() {
  const [goals, setGoals] = useState([]);
  const [createNewGoal, setCreateNewGoal] = useState(false);
  const [createNewStat, setCreateNewStat] = useState(false);
  const [shouldFetchGoals, setShouldFetchGoals] = useState(false);
  const [goal, setGoal] = useState({
    id: null,
    interval: "",
    targetDate: null,
  });

  useEffect(() => {
    async function getGoalData() {
      try {
        let response = await fetch("/goals");
        let data = await response.json();
        setGoals(data.goals);
      } catch (error) {
        console.log("Network Error:", error);
      }
    }

    getGoalData();
  }, [shouldFetchGoals]);

  function handleOpenDialog() {
    setCreateNewGoal(!createNewGoal);
  }

  function handleClose() {
    setCreateNewGoal(false);
  }

  const handleOpenNewStat = useCallback((goal) => {
    setCreateNewStat((prevOpenNewStat) => !prevOpenNewStat);
    setGoal({
      // Setting a single goal's data for creating goal stats
      id: goal.id,
      interval: goal.interval,
      targetDate: goal.target_date,
    });
  }, []);

  const handleCloseNewStat = useCallback(() => {
    setCreateNewStat(false);
  }, []);

  const handleDialogSubmit = useCallback(async () => {
    setShouldFetchGoals(true); // refetch goals after creating new one
    setCreateNewGoal(false); // Close the dialog
  }, []);

  return (
    <div>
      <h1>New years resolutions goals</h1>
      <div>
        <Button onClick={handleOpenDialog}>New Goal</Button>
        <NewGoal
          open={createNewGoal}
          handleDialogSubmit={handleDialogSubmit}
          handleClose={handleClose}
        />
      </div>
      {goals.length > 0 ? (
        <TableContainer sx={{ width: "100%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="goals table">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Target</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {goals.map((goal, key) => (
                <GoalTableCell
                  key={key}
                  goal={goal}
                  handleOpenNewStat={handleOpenNewStat}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No goals were created yet</Typography>
      )}
      <div>
        {createNewStat && goal && (
          <NewGoalStats
            goal={goal}
            open={createNewStat}
            closeDialog={handleCloseNewStat}
          />
        )}
      </div>
    </div>
  );
}

export default Goals;
