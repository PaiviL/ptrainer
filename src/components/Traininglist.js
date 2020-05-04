import React, { useState, useEffect }  from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(_ => getTrainings())
            .then(_ => {
                setMsg('Training deleted');
                setOpen(true);
            })
            .catch(err => console.error(err))
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const columns = [
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => moment(row.value).format('DD.MM.YYYY HH:mm')
        },
        {
            Header: 'Duration (min)',
            accessor: 'duration'
        },
        {
            Header: 'Customer',
            Cell: row => (row.original.customer.firstname+' '+row.original.customer.lastname)
        },
        {
            sortable: false,
            filterable: false,
            minWidth: 60,
            Cell: row => (<Button 
                size="small" variant="outlined" color="secondary" startIcon={<DeleteOutlinedIcon/>} 
                onClick={() => deleteTraining('https://customerrest.herokuapp.com/api/trainings/'+row.original.id)}>Delete</Button>)
        }
    ]

    return(
        <div>
            <h2>Trainings</h2>
            <ReactTable defaultPageSize={10} filterable={true} 
                        data={trainings} columns={columns} />
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