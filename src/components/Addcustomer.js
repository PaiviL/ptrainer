import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addcustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: ''});

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        props.addCustomer(customer);
        setOpen(false);
    }
    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    }

    return(
        <div>
            <Button style={{marginBottom: 10}} variant="outlined" color="primary" 
                    startIcon={<PersonAddIcon/>} onClick={handleClickOpen}>
                Add Customer
            </Button>
            <Dialog open={open} disableBackdropClick={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter Customer information here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={inputChanged}
                        label="First Name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={inputChanged}
                        label="Last Name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        name="email"
                        value={customer.email}
                        onChange={inputChanged}
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        name="phone"
                        value={customer.phone}
                        onChange={inputChanged}
                        label="Phone Number"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="streetaddress"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={inputChanged}
                        label="Street Address"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={inputChanged}
                        label="Postcode"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="city"
                        name="city"
                        value={customer.city}
                        onChange={inputChanged}
                        label="City"
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
        </div>
    )
}