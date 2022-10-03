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

 // fake data generator
const getItems = (count, offset = 0) =>
Array.from({ length: count }, (v, k) => k).map(k => ({
  id: `item-${k + offset}-${new Date().getTime()}`,
  content: `item ${k + offset}`
}));

const reorder = (list, startIndex, endIndex) => {
const result = Array.from(list);
const [removed] = result.splice(startIndex, 1);
result.splice(endIndex, 0, removed);

return result;
};

/**
 * Moves an item from one list to another list.
 */
 const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
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

    const [state, setState] = useState([getItems(11), getItems(2, 11)]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }

    
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


<div>
      {/* <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button> */}


      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                          >
                            {item.content}
                            {/* <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(
                                  newState.filter(group => group.length)
                                );
                              }}
                            >
                              delete
                            </button> */}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>                   
    </div>
  
  </div>

      
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<BasicTable />, rootElement);