import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { KeyboardDatePicker } from "@material-ui/pickers";


const Todolist = () => {
    const [desc, setDesc] = useState({ desc: '', date: new Date(), priority: '' });
    const [todos, setTodos] = useState([]);

    const gridRef = useRef();

    const handleChange = date => {

        setDesc({ date: date })

    };

    const inputChanged = (event) => {
        setDesc({ ...desc, [event.target.name]: event.target.value });

    }


    const addTodo = (event) => {

        event.preventDefault();
        setTodos([...todos, desc]);
        setDesc({ desc: '', date: new Date(), priority: '' });
    }


    const deleteTodo = (row) => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex));
        }
        else {
            alert('Select row first');
        }
    }

    const columns = [
        { headerName: 'Description', field: 'desc', sortable: true, filter: true, floatingFilter: true },
        { headerName: 'Date', field: 'date', sortable: true, filter: true, floatingFilter: true },
        { headerName: 'Priority', field: 'priority', sortable: true, filter: true, floatingFilter: true,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
        }
    ]


    return (
        <div className="App">

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify='space-around'>
                    <KeyboardDatePicker
                        variant="inline"
                        value={desc.date}
                        format="MM/dd/yyy"
                        selected={desc.date}
                        onChange={handleChange}
                        animateYearScrolling
                    />
                </Grid>
            </MuiPickersUtilsProvider>


            <TextField style={{ margin: 5 }} label="Description" name="desc" type="text" value={desc.desc} onChange={inputChanged} />
            <TextField style={{ margin: 5 }} label="Priority" name="priority" value={desc.priority} onChange={inputChanged} />

            <Button style={{ margin: 5 }} variant="contained" color="Primary" onClick={addTodo}>Add</Button>
            <Button style={{ margin: 5 }} variant="contained" color="Secondary" onClick={deleteTodo}>Delete</Button>


            <div className="ag-theme-material" style={{ height: '700px', width: '40%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    animateRows="true"
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single"
                    columnDefs={columns}
                    rowData={todos}
                />
            </div>
        </div>
    )
};


export default Todolist;