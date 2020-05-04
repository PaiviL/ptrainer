import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function Addtraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({activity: '', date: '', duration: ''});
    //const [selectedDate, handleDateChange] = useState(new Date());

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        props.addTraining(props.customer.links[0].href, training);
        setOpen(false);
    }
    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    return(
        <div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <Button size="small" variant="outlined" color="primary" 
                    startIcon={<AddIcon/>} onClick={handleClickOpen}>
                Training
            </Button>
            <Dialog open={open} disableBackdropClick={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Training for Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter training information here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="activity"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        label="Activity"
                        fullWidth
                    />
                    {/* <KeyboardDateTimePicker 
                        name="date"
                        value={training.date} 
                        onChange={inputChanged}
                        label="Date"
                        
                    /> */}
                    <TextField
                        margin="dense"
                        id="date"
                        name="date"
                        value={moment(training.date).toISOString()}//
                        onChange={inputChanged}
                        label="Date"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="duration"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        label="Duration"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Save
                    </Button>
                    <Button onClick={handleCancel} >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            </MuiPickersUtilsProvider>
        </div>
    )
}
//<MuiPickersUtilsProvider utils={MomentUtils}></MuiPickersUtilsProvider>