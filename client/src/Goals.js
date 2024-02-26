import {useCallback, useEffect, useMemo, useState} from "react";
import {
    Button,
    Link,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import NewGoal from "./NewGoal";
import NewGoalStats from "./NewGoalStats";

function Goals() {
    const [goals, setGoals] = useState([])
    const [createNewGoal, setCreateNewGoal] = useState(false)
    const [createNewStat, setCreateNewStat] = useState(false)
    const [shouldFetchGoals, setShouldFetchGoals] = useState(false)
    const [goal, setGoal] = useState({id: null, interval: '', targetDate: null})

    useEffect(() => {
        async function getGoalData() {
            try {
                let response = await fetch('/goals')
                let data = await response.json();
                setGoals(data.goals)
            } catch (error){
                console.log('Network Error:', error)
            }

        }

        getGoalData()
    }, [shouldFetchGoals]);

    function handleOpenDialog() {
        setCreateNewGoal(!createNewGoal)
    }

    function handleClose() {
        setCreateNewGoal(false);

    };

    const handleOpenNewStat = useCallback((goal) => {
        setCreateNewStat(prevOpenNewStat => !prevOpenNewStat);
        setGoal({id: goal.id, interval: goal.interval, targetDate: goal.target_date}) // Setting a single goal's data for creating goal stats
    }, [])

    const handleCloseNewStat = useCallback(() => {
        setCreateNewStat(false)
    }, [])


    const handleDialogSubmit = useCallback(async () => {
        setShouldFetchGoals(true) // refetch goals after creating new one
        setCreateNewGoal(false); // Close the dialog
    }, []);




    return (
        <div>
            <h1>New years resolutions goals</h1>
            <div>
                <Button onClick={handleOpenDialog}>New Goal</Button>
                <NewGoal open={createNewGoal} handleDialogSubmit={handleDialogSubmit} handleClose={handleClose}/>
            </div>
            {goals.length > 0 ? (
                <TableContainer sx={{width: '100%'}}>
                    <Table sx={{minWidth: 650}} aria-label="goals table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Target</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {goals.map((goal, key) => (
                                <TableRow key={key}>
                                    <TableCell key={key} state={{ goal: goal }}>
                                        <Link href={`/goal/${goal.id}`} >
                                            {goal.description}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{`${goal.started_at} - ${goal.target_date}`}</TableCell>
                                    <TableCell>{`${goal.target_value} ${goal.target_unit} ${goal.interval}`}</TableCell>
                                    <TableCell><Button onClick={() => handleOpenNewStat(goal)}>Add
                                        Stats</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            ) : (
                <Typography variant="body1">No goals were created yet</Typography>
            )}
            <div>
                {createNewStat && goal &&
                    <NewGoalStats goal={goal} open={createNewStat} closeDialog={handleCloseNewStat}/>}
            </div>
        </div>)
}

export default Goals