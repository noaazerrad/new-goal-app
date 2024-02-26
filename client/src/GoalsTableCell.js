import { Button, Link, TableCell, TableRow } from "@mui/material";

function GoalTableCell({ key, goal, handleOpenNewStat }) {
  return (
    <TableRow key={key}>
      <TableCell key={key} state={{ goal: goal }}>
        <Link href={`/goal/${goal.id}`}>{goal.description}</Link>
      </TableCell>
      <TableCell>{`${goal.started_at} - ${goal.target_date}`}</TableCell>
      <TableCell>{`${goal.target_value} ${goal.target_unit} ${goal.interval}`}</TableCell>
      <TableCell>
        <Button onClick={() => handleOpenNewStat(goal)}>Add Stats</Button>
      </TableCell>
    </TableRow>
  );
}

export default GoalTableCell;
