import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Plot from 'react-plotly.js';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Unstable_Grid2';

const DataReview = () => {

    const renderDetails = (param) => {
        return (
            <strong>
                {/* <Button
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
                </Button> */}
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  
                  <Select
                    // labelId="demo-simple-select-autowidth-label"
                    // id="demo-simple-select-autowidth"
                    value={age}
                    autoWidth
                    onChange={handleChange}
                    displayEmpty                
                  >
                    
                    <MenuItem value={10}>Classification</MenuItem>
                    <MenuItem value={20}>Regression</MenuItem>
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
            </strong>
        )
      }
    
const modelGrid = [
     
    { 
      field: 'id', 
      headerName: 'Action', 
      width: 160,
      hide: 'true',
    },
    {
      field: 'Name',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'Empty',
      headerName: 'Empty',
      width: 200,
    },
    {
      field: 'FitForUse',
      headerName: 'Fit For Use',
      width: 200,
    },
    {
      field: 'DataType',
      headerName: 'Data Type',
      // description: 'This column has a value getter and is not sortable.',
      editable:'true',
      width: 200,      
      renderCell: renderDetails,
    },

]

const modelData = [
  {
    id:'1',
    Name: 'Churn',
    Empty: '1%',
    FitForUse: 'Yes',
    DataType: 'Number',
  },
  {
    id:'2',
    Name: 'Churn',
    Empty: '1%',
    FitForUse: 'Yes',
    DataType: 'Number',
  },
  
]

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
    
    
      const [age, setAge] = React.useState('');
    
      const handleChange = (event) => {
        setAge(event.target.value);
      };

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


  return (

        <div className=" min-w-max m-2 md:mt-0 ml-10 p-2 md:pl-10 pt-4 pb-10 pr-10 bg-white rounded-3xl" >
            <div className='mb-7 flex flex-wrap lg:flex-nowrap justify-left '>
            {/* <Header category="Home" title="Create New Model" /> */}
                <p className='mt-7 text-2xl font-extrabold tracking-tight text-slate-900'>
                    Review
                </p>
                <div className='ml-56'>
                <p className='mt-7 text-2xl font-extrabold tracking-tight text-slate-900'>
                Columns
                </p>
                </div>
            </div>
            <div className='mb-7 flex flex-wrap lg:flex-nowrap justify-left'>
                <div className='w-1/4'>
                    <Stack sx={{ width: '80%' }} spacing={1}>
                        <Alert severity="success">File is fit for predictions</Alert>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Total Rows:</Alert>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Total Columns:</Alert>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Unfit Rows:</Alert>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Unfit Columns:</Alert>
                    </Stack>    
                </div>
                <div className='w-full'>                    
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
            </div>
            <div className='flex flex-wrap lg:flex-nowrap justify-left'>
                <div className='ml-72 pl-4'>
                    <p className='mt-7 text-2xl font-extrabold tracking-tight text-slate-900'>
                    Distribution
                    </p>
                </div>
                <div>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                  
                  <Select
                    // labelId="demo-simple-select-helper-label"
                    // id="demo-simple-select-helper"
                    value={age}
                    label="Learning Task"
                    onChange={handleChange}
                    displayEmpty
                  >
                    
                    <MenuItem value={10}>Classification</MenuItem>
                    <MenuItem value={20}>Regression</MenuItem>
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
                      
                </div>
            </div>
            <div className='ml-56'>
            <Plot
                data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                },
                {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]}
                layout={ {width: 950, height: 450, title: 'A Fancy Plot'} }
            />
            </div>
            <div className='mt-4 flex justify-end ...'>
                <Button variant="contained">
                    Contained
                </Button>
            </div>
            
                
        </div>
    
  )
}

export default DataReview