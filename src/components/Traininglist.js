import React, { useState, useEffect }  from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import moment from 'moment';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const columns = [
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => (moment(row.value).format('DD.MM.YYYY HH:mm'))
        },
        {
            Header: 'Duration (min)',
            accessor: 'duration'
        },
        {
            Header: 'Customer',
            Cell: row => (row.original.customer.firstname+' '+row.original.customer.lastname)
        }
    ]

    return(
        <div>
            <h1>Trainings</h1>
            <ReactTable defaultPageSize={10} filterable={true} data={trainings} columns={columns} />
        </div>
    );
}