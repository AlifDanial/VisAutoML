import * as React from 'react';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import newDocument from '../data/newDocument.png';
import { useStateContext } from '../contexts/ContextProvider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
// import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
// import { DropzoneArea } from "material-ui-dropzone";
import { DropzoneArea } from "mui-file-dropzone";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
// import { css, cx } from "@emotion/css";
// import tw from "@tailwindcssinjs/macro";
import { useCallback, useReducer } from "react";
import { data } from "../data";
import produce from "immer";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


const renderDetailsButton = (param) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 5 }}
                onClick={() => {
                    console.log("Row:");
                    console.log(param);
                }}
            >
                Open
            </Button>
        </strong>
    )
  }

 const modelGrid = [
     
      { 
        field: 'id', 
        headerName: 'Action', 
        width: 100,
        renderCell: renderDetailsButton,
      },
      {
        field: 'ModelName',
        headerName: 'Model Name',
        width: 200,
        editable: true,
      },
      {
        field: 'ModelSelected',
        headerName: 'Model Selected',
        width: 200,
        editable: true,
      },
      {
        field: 'TrainAccuracy',
        headerName: 'Train Accuracy',
        type: 'number',
        width: 110,
        editable: true,
      },
      {
        field: 'ValidAccuracy',
        headerName: 'Valid Accuracy',
        // description: 'This column has a value getter and is not sortable.',
        type: 'number',
        width: 160,      
      },
      {
        field: 'TrainDuration',
        headerName: 'Train Duration',
        // description: 'This column has a value getter and is not sortable.',
        type: 'number',
        width: 160,      
      },
  
  ]
  
 const modelData = [
    {
      id:'1',
      ModelName: 'Churning Telekom',
      ModelSelected: 'Random Forest Classifier',
      TrainAccuracy: '0.722',
      ValidAccuracy: '0.76',
      TrainDuration: '5.62 sec',
    },
    {
      id:'2',
      ModelName: 'Churning Telekom',
      ModelSelected: 'Random Forest Classifier',
      TrainAccuracy: '0.722',
      ValidAccuracy: '0.76',
      TrainDuration: '5.62 sec',
    },
    {
      id:'3',
      ModelName: 'Churning Telekom',
      ModelSelected: 'Random Forest Classifier',
      TrainAccuracy: '0.722',
      ValidAccuracy: '0.76',
      TrainDuration: '5.62 sec',
    },
    {
      id:'4',
      ModelName: 'Churning Telekom',
      ModelSelected: 'Random Forest Classifier',
      TrainAccuracy: '0.722',
      ValidAccuracy: '0.76',
      TrainDuration: '5.62 sec',
    },
    {
      id:'5',
      ModelName: 'Churning Telekom',
      ModelSelected: 'Random Forest Classifier',
      TrainAccuracy: '0.722',
      ValidAccuracy: '0.76',
      TrainDuration: '5.62 sec',
    },
    {
      id:'6',
      ModelName: 'Churning Telekom',
      ModelSelected: 'Random Forest Classifier',
      TrainAccuracy: '0.722',
      ValidAccuracy: '0.76',
      TrainDuration: '5.62 sec',
    },
    {
      id:'7',
      ModelName: 'Churning Telekom',
      ModelSelected: 'Random Forest Classifier',
      TrainAccuracy: '0.722',
      ValidAccuracy: '0.76',
      TrainDuration: '5.62 sec',
    },
    {
      id:'8',
      ModelName: 'Churning Telekom',
      ModelSelected: 'Random Forest Classifier',
      TrainAccuracy: '0.722',
      ValidAccuracy: '0.76',
      TrainDuration: '5.62 sec',
    },
  ]

  function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  const dragReducer = produce((draft, action) => {
    switch (action.type) {
      case "MOVE": {
        draft[action.from] = draft[action.from] || [];
        draft[action.to] = draft[action.to] || [];
        const [removed] = draft[action.from].splice(action.fromIndex, 1);
        draft[action.to].splice(action.toIndex, 0, removed);
      }
    }
  });

export default function BasicTable() {

    const { currentColor, currentMode, setDialog, hideDialog } = useStateContext() || {}; 


    // const handleRowClick = (param) => {
    //     console.log("Row:");
    //     console.log(param);
    //   };

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }
  
    const handleClose = () => {
      setOpen(false);
    };

    const [files, setFiles] = React.useState('');

    const handleUpload = (files) =>{
      console.log(files);
      setFiles(files);
    }

    const [state, dispatch] = useReducer(dragReducer, {
      items: data,
    });
  
    const onDragEnd = useCallback((result) => {
      if (result.reason === "DROP") {
        if (!result.destination) {
          return;
        }
        dispatch({
          type: "MOVE",
          from: result.source.droppableId,
          to: result.destination.droppableId,
          fromIndex: result.source.index,
          toIndex: result.destination.index,
        });
      }
    }, []);

    const styles = {
      dragger: `px-4 py-4 my-2 transition-colors duration-150 ease-in-out bg-white rounded-lg shadow hover:bg-gray-100`,
      dropper: `w-auto px-4 min-w-1/4 max-w-1/2`,
      draggerContent: `flex items-center space-x-3 text-base`,
      draggerIcon: `inline-flex items-center justify-center rounded-full p-1.5 text-white bg-teal-100 text-teal-700`,
      dragging: `bg-slate-200`,
      dropOver: `bg-slate-200`,
    };

    
  return (
    
    
    <div className="m-2 md:mt-0 ml-10 p-2 md:pl-10 pt-4 pb-10 pr-10 bg-white rounded-3xl">
        <div className="m-5">
          <button type='button' onClick={handleClickOpen}>
            <div className="e-card">
              <div className="e-card-image">
                {/* <div className="e-card-title">JavaScript </div> */}
                <img
                  className="h-28 w-30 ml-20 mr-20 mt-10 mb-10"
                  src={newDocument}
                  alt="employee" />
              </div>
              <div className="e-card-content" style={{ backgroundColor: currentColor }}>
                <p className='font-semibold text-xl text-center text-white }'> New Model</p>
              </div>
            </div>
          </button>
          </div>

      <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            New Project Name
            </DialogTitle>
          
          
          <DialogContent>     
          <Stack
            noValidate
            component="form"            
            spacing={2}            
            autoComplete="off"
            sx={{ m: 1, minWidth:450 }}
          >       
              <TextField
              required
              id="outlined-required"
              label=""
              defaultValue="New Project"
            />
          
          <FormControl>
                  <InputLabel id="demo-simple-select-helper-label">Learning Model</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={age}
                    label="Learning Task"
                    onChange={handleChange}
                  >
                    
                    <MenuItem value={10}>Classification</MenuItem>
                    <MenuItem value={20}>Regression</MenuItem>
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
          
                </Stack>
        </DialogContent>
    
          
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create New</Button>
        </DialogActions>
      </Dialog> 

    
      <div className="m-1 md:mt-0 p-2 md:pl-10 pt-4 pb-10 pr-10 bg-white rounded-3xl">
          <div className='mt-16'>        
            <p className='mb-7 text-3xl font-extrabold tracking-tight text-slate-900'>
              Models
            </p>
          </div>      
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={modelData}
              columns={modelGrid}
              // onRowClick={handleRowClick}
              pageSize={5}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }} />
          </Box>
        </div>

      <div>
      <DropzoneArea 
      showPreviews={true}
      showPreviewsInDropzone={false}
      useChipsForPreview
      previewText="Uploaded files"
      onChange={handleUpload} 
      filesLimit={1}      
      acceptedFiles = {['text/csv']}
      height={30}
      />      
      </div>

      <div className='mb-7 flex flex-wrap lg:flex-nowrap'>
      <DragDropContext onDragEnd={onDragEnd}>

        <div className='m-2 w-80 ml-10 p-2 pt-4 pb-10 pr-10 bg-white'>
          <div className='m-2 w-80 min-h-max md:mt-0 ml-10 p-2 md:pl-10 pt-4 pb-10 pr-10  bg-slate-200 rounded-2xl'>
          <p className=' mb-5 text-xl font-extrabold tracking-tight text-slate-900 '>
                    Prediction Column
                </p>
          <Droppable droppableId="items" type="PERSON">
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={(
                    styles.dropper,
                    snapshot.isDraggingOver && styles.dropOver
                  )}
                >
                  {state.items?.map((person, index) => {
                    return (
                      <Draggable
                        key={person.id}
                        draggableId={person.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={(
                                styles.dragger,
                                snapshot.isDragging && styles.dragging
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.draggerContent}>
                                {/* <img
                                  src={person.picture}
                                  className={styles.draggerIcon}
                                /> */}
                                <DragIndicatorIcon />
                                
                                <span>
                                  {person.name.first} {person.name.last}
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          </div>
          
          <div className='m-2 w-80 min-h-max md:mt-0 ml-10 p-2 md:pl-10 pt-4 pb-10 pr-10  bg-slate-200 rounded-2xl'>
          <p className=' mb-5 text-xl font-extrabold tracking-tight text-slate-900 '>
                    ID Column
                </p>
          <Droppable droppableId="items2" type="PERSON">
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={(
                    styles.dropper,
                    snapshot.isDraggingOver && styles.dropOver
                  )}
                >
                  {state.items2?.map((person, index) => {
                    return (
                      <Draggable
                        key={person.id}
                        draggableId={person.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={(
                                styles.dragger,
                                snapshot.isDragging && styles.dragging
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.draggerContent}>
                                {/* <img
                                  src={person.picture}
                                  className={styles.draggerIcon}
                                /> */}
                                <DragIndicatorIcon />
                                <span>
                                  {person.name.first} {person.name.last}
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          </div>

          <div className='m-2 w-80 min-h-max md:mt-0 ml-10 p-2 md:pl-10 pt-4 pb-10 pr-10  bg-slate-200 rounded-2xl'>
          <p className=' mb-5 text-xl font-extrabold tracking-tight text-slate-900 '>
                    Columns to not use
                </p>
          <Droppable droppableId="items3" type="PERSON">
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={(
                    styles.dropper,
                    snapshot.isDraggingOver && styles.dropOver
                  )}
                >
                  {state.items3?.map((person, index) => {
                    return (
                      <Draggable
                        key={person.id}
                        draggableId={person.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={(
                                styles.dragger,
                                snapshot.isDragging && styles.dragging
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.draggerContent}>
                                 {/* <img
                                  src={person.picture}
                                  className={styles.draggerIcon}
                                /> */}
                                <DragIndicatorIcon />
                                <span>
                                  {person.name.first} {person.name.last}
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          </div>  
        </div>   

        <div className='m-2 w-80 ml-10 p-2 pt-4 pb-10 pr-10 bg-white'>
        <div className='m-2 w-80 min-h-max md:mt-0 ml-10 p-2 md:pl-10 pt-4 pb-10 pr-10  bg-slate-200 rounded-2xl'>
        <p className=' mb-5 text-xl font-extrabold tracking-tight text-slate-900 '>
                    Columns to use
                </p>
          <Droppable droppableId="items4" type="PERSON">
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={(
                    styles.dropper,
                    snapshot.isDraggingOver && styles.dropOver
                  )}
                >
                  {state.items4?.map((person, index) => {
                    return (
                      <Draggable
                        key={person.id}
                        draggableId={person.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={(
                                styles.dragger,
                                snapshot.isDragging && styles.dragging
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.draggerContent}>
                                 {/* <img
                                  src={person.picture}
                                  className={styles.draggerIcon}
                                /> */}
                                <DragIndicatorIcon />
                                <span>
                                  {person.name.first} {person.name.last}
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          </div>  
        </div>   
      </DragDropContext>
      </div>

      <div className=''>

      </div>

  </div>
  



      
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<BasicTable />, rootElement);