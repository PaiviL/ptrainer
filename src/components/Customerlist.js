import React, { useState, useEffect }  from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(_ => getCustomers())
            .then(_ => {
                setMsg('Customer deleted');
                setOpen(true);
            })
            .catch(err => console.error(err))
        }
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', 
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(customer)
            }
        )
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('New Customer added');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const updateCustomer = (link, customer) => {
        fetch(link, 
            {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(customer)
            }
        )
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('Customer updated');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const addTraining = (link, training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', 
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    'activity': training.activity,
                    'date': training.date,
                    'duration': training.duration,
                    'customer' : link
                })
            }
        )
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('New training added');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const columns = [
        {
            sortable: false,
            filterable: false,
            minWidth: 70,
            Cell: row => (<Addtraining customer={row.original} addTraining={addTraining} />)
        },
        {
            Header: 'First Name',
            accessor: 'firstname'
        },
        {
            Header: 'Last Name',
            accessor: 'lastname'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            Header: 'Street Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            sortable: false,
            filterable: false,
            minWidth: 50,
            Cell: row => (<Editcustomer customer={row.original} updateCustomer={updateCustomer} />)
        },
        {
            sortable: false,
            filterable: false,
            minWidth: 50,
            Cell: row => (<Button 
                size="small" variant="outlined" color="secondary" startIcon={<DeleteOutlinedIcon/>} 
                onClick={() => deleteCustomer(row.original.links[0].href)}>Del</Button>)
        }
    ]

    return(
        <div>
            <h2>Customers</h2>
            <Addcustomer addCustomer={addCustomer} />
            <ReactTable defaultPageSize={10} filterable={true} 
                data={customers} columns={columns} />
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            />
        </div>
    );

}