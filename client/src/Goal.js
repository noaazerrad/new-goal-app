import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import CircularProgressWithLabel from './CircularProgress'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";


function Goal() {
    const {id} = useParams();
    const [goal, setGoal] = useState({})
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        async function getGoalData() {
            try {
                let response = await fetch(`/goals/${id}`)
                    let data = await response.json()
                    setGoal(data)
            } catch(error){
                console.log('Got Error while fetching data', error)
            }

        }

        getGoalData()
    }, []);

    useEffect(() => {
        async function getProgress() {
            try {
                let response = await fetch(`/goals/${id}/progress`)
                let data = await response.json()
                setProgress(data.progress)
            } catch(error){
                console.log('Got Error while fetching data', error)
            }

        }

        getProgress()
    }, [])

    return (
        <div>
            <div>
                <Typography variant="h4">{goal.description}</Typography>
                <Typography>Your progress towards your goal is currently at {Math.round(progress)}%</Typography>
            </div>
            {goal.goal_stats && goal.goal_stats.length > 0 ? (
                <TableContainer style={{width: '100%'}}>
                    <Table style={{minWidth: 650}} aria-label="goalsStats table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Goal Value</TableCell>
                                <TableCell>Reporting Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {goal.goal_stats.map((stat, key) => (
                                <TableRow key={key}>
                                    <TableCell>{stat.value}</TableCell>
                                    <TableCell>{stat.reporting_date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>) : (
                <Typography> You haven't made any updates to the progress for this goal yet</Typography>
            )}
        </div>
    )
}

export default Goal