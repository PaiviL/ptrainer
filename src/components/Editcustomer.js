import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Editcustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '', city: ''});

    const handleClickOpen = () => {
        console.log(props.customer)
        setCustomer({firstname: props.customer.firstname, lastname: props.customer.lastname, 
                     email: props.customer.email, phone: props.customer.phone, 
                     streetaddress: props.customer.streetaddress, postcode: props.customer.postcode, city: props.customer.city})
        setOpen(true);
    }
    const handleClose = () => {
        props.updateCustomer(props.customer.links[0].href, customer);
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
            <Button size="small" variant="outlined" color="primary" 
                    startIcon={<EditOutlinedIcon/>} onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} disableBackdropClick={true} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
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