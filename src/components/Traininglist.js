import React, { useState, useEffect }  from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

export default function Trainiglist() {
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
            accessor: 'date'
        },
        {
            Header: 'Duration (min)',
            accessor: 'duration'
        },
        {
            Header: 'Customer',
            accessor: 'customer.firstname'
        }
    ]

    return(
        <div>
            <ReactTable defaultPageSize={10} filterable={true} data={trainings} columns={columns} />
        </div>
    );
}