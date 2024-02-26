import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";


function NewGoal({open, handleDialogSubmit, handleClose}) {

    const [newGoalSpec, setNewGoalSpec] = useState({
        description: '', start_date: null, target_date: null,
        target_value: 0, target_unit: '', interval: ''
    })


    function handleChange(e) {
        setNewGoalSpec({
            ...newGoalSpec,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit() {
        try {
            let response = await fetch('/goals', {
                method: "POST", headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({goal_spec: newGoalSpec})
            })

            if (response.ok) {
                handleDialogSubmit()
            } else {
                const error = await response.json()
                console.log('Got error while creating goal', error.message)
            }

        } catch (error) {
            console.error('Network error:', error.message);
        }

    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Goal</DialogTitle>
            <DialogContent dividers>
                <TextField required margin="dense" name='description' InputLabelProps={{shrink: true}}
                           label='Description' type='text' fullWidth onChange={handleChange}/>
                <TextField required margin="dense" InputLabelProps={{shrink: true}} name='started_at' label='Goal Start Date'
                           type='date' value={newGoalSpec.start_date} fullWidth onChange={handleChange}/>
                <TextField required margin="dense" InputLabelProps={{shrink: true}} name='target_date'
                           label='Goal End Date' type='date' fullWidth onChange={handleChange}/>
                <TextField required margin="dense" name='target_value' InputLabelProps={{shrink: true}}
                           label='Goal Value' type='number' fullWidth onChange={handleChange}/>
                <TextField required margin="dense" name='target_unit' InputLabelProps={{shrink: true}}
                           label='Goal Unit' helperText="Ex: books, kg, $" type='text' fullWidth
                           onChange={handleChange}/>
                <Typography> Frequency
                    <Select fullWidth InputLabelProps={{shrink: true}} label='Intervals' name='interval'
                        onChange={handleChange}>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                </Select>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}


export default NewGoal