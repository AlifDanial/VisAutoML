import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Header } from '../components';
import newDocument from '../data/newDocument.png';
import playButton from '../data/play-button.png';
import { GridComponent, VirtualScroll, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, ColumnChooser} from '@syncfusion/ej2-react-grids';
import { customersData, customersGrid, modelData, modelGrid } from '../data/dummy';
import { useLinkClickHandler } from 'react-router-dom';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';

const Test = () => {

  const { currentColor, currentMode, setDialog, hideDialog } = useStateContext();  

  const renderDetailsButton = (param) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 35 }}
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
    
    const modelGrid = [
     
      { 
        field: 'id', 
        headerName: 'Action', 
        width: 160,
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
  

  return (
    <div className="m-2 min-w-max md:mt-0 ml-10 p-2 md:pl-10 pt-4 pb-10 pr-10 bg-white rounded-3xl" >
      <div className='mb-7 flex flex-wrap lg:flex-nowrap justify-left '>
        {/* <Header category="Home" title="Create New Model" /> */}
        <p className='mt-7 text-2xl font-extrabold tracking-tight text-slate-900'>
            Home
            </p>
          <div className='ml-80'>
            <p className='mt-7 text-2xl font-extrabold tracking-tight text-slate-900'>
            Learn
            </p>
          </div>
        </div>
        
          <div className='flex flex-wrap lg:flex-nowrap justify-left '>
            <div className='max-w-lg min-h-max'>
              <div className='flex justify-between items-center'>
              <button type='button' onClick={handleClickOpen}
              >
                <div className="e-card">
                    <div className="e-card-image">
                      {/* <div className="e-card-title">JavaScript </div> */}
                      <img
                        className="h-28 w-30 ml-20 mr-20 mt-10 mb-10"
                        src={newDocument}
                        alt="employee"
                      />
                    </div>
                  <div className="e-card-content" style={{ backgroundColor: currentColor }}>                   
                  <p className='font-semibold text-xl text-center text-white }' > New Model</p> 
                  </div>
                </div>
              </button>
              </div>
             
            </div>

            
            <div className='flex m-0 flex-wrap justify-center gap-1 items-center'>
              {/* tutorials div */}
            <div className='min-w-max min-h-max ml-32'>
                <button>
                  <div className="e-card">
                      <div className="e-card-image">
                        {/* <div className="e-card-title">JavaScript </div> */}
                        <img
                          className="h-28 w-30 ml-20 mr-20 mt-10 mb-10"
                          src={playButton}
                          alt="employee"
                        />
                      </div>
                    <div className="e-card-content" style={{ backgroundColor: currentColor }}> 
                    <p className='font-semibold text-xl text-center text-white }' > Tutorial 1</p> 
                    </div>
                  </div>
                </button>
              </div>

              <div className='min-w-max min-h-max ml-8'>
                <button>
                  <div className="e-card">
                      <div className="e-card-image">
                        {/* <div className="e-card-title">JavaScript </div> */}
                        <img
                          className="h-28 w-30 ml-20 mr-20 mt-10 mb-10"
                          src={playButton}
                          alt="employee"
                        />
                      </div>
                    <div className="e-card-content" style={{ backgroundColor: currentColor }}> 
                    <p className='font-semibold text-xl text-center text-white }' > Tutorial 2</p> 
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

        <div className='mt-16'> 
        <p className='mb-7 text-2xl font-extrabold tracking-tight text-slate-900'>
            Models
            </p>
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
      
        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={modelData}
        columns={modelGrid}
        // onRowClick={handleRowClick}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>

    </div>
  )
}

export default Test