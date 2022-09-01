import * as React from 'react';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


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

export default function BasicTable() {

    const handleRowClick = (param) => {
        console.log("Row:");
        console.log(param);
      };

    
  return (
    <div className="m-2 md:mt-0 ml-10 p-2 md:pl-10 pt-4 pb-10 pr-10 bg-white rounded-3xl" >
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
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </div>
  );
}
