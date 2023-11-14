import {
  Box,
  Button,
  Card,
  IconButton,
  Tooltip,
  MenuItem,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import { DropzoneArea } from "react-mui-dropzone";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDataSet, getReview } from "../../actions/modelAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Papa from "papaparse"
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { tooltipClasses } from '@mui/material/Tooltip';
import "../../App.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from "@mui/x-data-grid";
import EditDialog from "../common/EditDialog";
import { withStyles } from "@mui/styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import UploadFileIcon from '@mui/icons-material/UploadFile';


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#5C5C5C',
    color: '#ffffff',
    minWidth: "450px",
    textAlign: "center",
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #dadde9',
    borderRadius: '10px',
    padding: '1em',
    fontFamily: "'SF Pro Display', sans-serif",

  },
}));

const CustomTooltip = withStyles({
  tooltip: {
    minWidth: "450px",
    textAlign: "center",
  }
})(Tooltip);

const regressionAlgos = [
  {
    name: "Medical Expenses Across Families in US",
    value: "/datasets/Regression/MedicalCost_Prediction_Regression.csv",
    tooltip:
      "The dataset provides details on individuals within families. The primary aim is to predict the family's medical expenses (charges column), offering insights into how these attributes contribute to healthcare costs.",
  },
  {
    name: "Car Prices Across Manufacturers, Models and Build",
    value: "/datasets/Regression/CarPrice_Prediction_Regression.csv",
    tooltip:
      "The dataset comprises details about cars. The primary goal is to predict the car's cost (price column), revealing the relationships between these attributes and car prices.",
  },
  {
    name: "Life Expectancy Across Countries, Years and Disease",
    value: "/datasets/Regression/LifeExpectancy_Prediction_Regression.csv",
    tooltip:
      "The dataset provides Life Expectancy information from various countries. The primary aim is to predict life expectancy (Life expectancy column), unveiling the relationships between these attributes and life expectancy outcomes.",
  },
];

const classificationAlgos = [
  {
    name: "Individual Income, Above or Below 50K per year",
    value: "/datasets/Classification/Income_Prediction_Classification.csv",
    tooltip:
      "The dataset contains individual attributes, with the goal of predicting whether an individual's income exceeds $50,000 (income_>50K).",
  },
  {
    name: "Stroke Risk, Likeliness to Suffer a Stroke",
    value: "/datasets/Classification/Stroke_Prediction_Classification.csv",
    tooltip:
      "The dataset contains individual characteristics, with the goal of predicting the likelihood of experiencing a stroke (stroke),",
  },
  {
    name: "Titanic Survival, Chances to Survive the Tragedy",
    value: "/datasets/Classification/Titanic_Survival_Classification.csv",
    tooltip:
      "The dataset includes individual attributes, with the aim of predicting passenger survival (Survived).",
  },  
];

const Body = ({ backDialogOpen, setBackDialogOpen }) => {

  const [algoValue, setAlgoValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const model = useSelector((state) => state.model);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tooltipId, setTooltipId] = useState(0);

  const handleAlgoChange = (e) => {
    setAlgoValue(e.target.value);
  };

  const handleAlgoClick = async (algoValue) => {
    try {
      console.log('Algo Value:', algoValue); 
      const response = await fetch(`${algoValue}`);
      
      const csvData = await response.text();
      // Convert CSV string into a Blob
      const csvBlob = new Blob([csvData], { type: 'text/csv' });

      // Create a File object from the Blob
      const csvFile = new File([csvBlob], `${algoValue.id}.csv`, { type: 'text/csv' });

      // Call onSelect with the File object
      onSelect([csvFile]);

      // Additional logic specific to handleAlgoClick if needed

    } catch (error) {
      console.error('Error loading CSV:', error);
    }
  };
  

  useEffect(() => {
    setTooltipId(model.mode);
  }, [model]);

  useEffect(() => {
    if (tooltipId === 9 || tooltipId === 15) dispatch({ type: "TOGGLE_MODE", payload: tooltipId });
  }, [tooltipId])

  const onChange = (file) => {
    setFile(file);
    setFileName("");
    setDisabled(true);
  };

  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [columns, setColumns] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const onSelect = (files) => {
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file) {
      console.log(file);
      setFile(file);
      setFileName("");
      setDisabled(true);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const columnsArray = [];
          const valuesArray = [];
  
          // Iterating data to get column name and their values
          results.data.forEach((d) => {
            columnsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });
  
          // Parsed Data Response in array format
          setParsedData(results.data);
  
          // Filtered Column Names
          setColumns(columnsArray[0]);
  
          // Filtered Values
          setValues(valuesArray);
        },
      });
    }
  };


  const onDelete = (files) => {
    setFile(null);
    setFileName("");
    setDisabled(false);
  };
  const onClick = () => {
    dispatch(addDataSet(file));
    dispatch(getReview(file));
    navigate('/review');
  };

  const handleOpen = () => { };

  const handleClose = () => { };

  return model.isLoading ? (

    <Typography
      sx={{
        fontSize: "1.5rem",
        fontWeight: "bolder",
        fontFamily: "Open Sans",
      }}
    >
      Import
    </Typography>
  ) : (
    <Card className="main"
      sx={{
        flex: 1,
        backgroundColor: "#F5F5F5",
        overflowX: "hidden",
        overflowY: "auto",
        padding: "30px",
      }}
    >
      <Paper sx={{ width: "100%", height: "100%", padding: "20px", borderRadius: "20px" }}>
        <Box sx={{ display: "flex" }} justifyContent="space-between">
          <Box sx={{ display: "flex" }}>
            <IconButton onClick={() => setBackDialogOpen(true)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bolder",
                fontFamily: "Open Sans",
              }}
            >
              Import
            </Typography>
          </Box>
          <CustomTooltip
            open={tooltipId === 10 ? true : false}
            onOpen={handleOpen}
            onClose={handleClose}
            title={
              <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                <Typography>You can rename the project title on any page by clicking
                  and renaming it in the dialog.</Typography>
                <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(9)}>PREVIOUS</Button>
                  <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(11)}>NEXT</Button>
                </Box>
              </Box>
            }
            placement="left"
            arrow
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bolder",
                fontFamily: "'SF Pro Display', sans-serif",
                display: "flex",
                alignItems: "center",
                cursor: "pointer"
              }}
              onClick={() => setOpenEdit(true)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={`/img/${model.type}.png`} alt={model.type} />
                <span style={{ marginLeft: "5px" }}>{model.name}</span>
              </div>
            </Typography>
          </CustomTooltip>
        </Box>
        <Typography
          sx={{
            fontSize: "1.1rem",
                fontWeight: "medium",
                fontFamily: "'SF Pro Display', sans-serif",
                marginBottom: "10px",
                marginTop:"10px"
          }}
        >
          Import a .CSV file or Select a Dataset from the Dropdown
        </Typography>

        <CustomTooltip
          open={tooltipId === 11 ? true : false}
          onOpen={handleOpen}
          onClose={handleClose}
          title={
            <Box padding="10px" display="flex" flexDirection="column" gap="10px">
              <Typography>Uploading your data is simple! Import a CSV file or Select from the Dropdown.</Typography>
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(10)}>PREVIOUS</Button>
                <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(12)}>NEXT</Button>
              </Box>
            </Box>
          }
          placement="top"
          arrow
        >
          <Box sx={{ display: "flex", margin: "0 0 1em 0", width: "100%" }}>
            <Box 
            sx={{              
              width: "45%",
              }}
              >
            <DropzoneArea
                dropzoneText={""}
                Icon={({ file, iconClassName, classNames }) => (
                  <UploadFileIcon
                    className={iconClassName}
                    style={{ fontSize: '60px' }} 
                  />
                )}
                filesLimit={1}
                onChange={onSelect}
                maxFileSize={30000000}
                onDelete={onDelete}
                showPreviewsInDropzone={false}
                useChipsForPreview
                previewText="Uploaded file"
                acceptedFiles={["text/csv"]}
              />
            </Box>
            <Box sx={{width:"10%",
                    display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ marginLeft: "1em",fontFamily: "'SF Pro Display', sans-serif", fontSize:"1.5em", fontWeight:600 }}>OR</Typography>
              </Box>
            <Box sx={{ width: "45%", justifyContent: "center", marginTop:"4em", padding:"2em", paddingRight:"5em", paddingLeft:"2em"}}>
            <TextField                
              select
              fullWidth
              label="Select a Dataset"
              value={algoValue}
              onChange={handleAlgoChange}  
                            
              > 
               {model.type === "Regression" ? (
                regressionAlgos.map((algo) => (                  
                  <MenuItem key={algo.value} value={algo.value} onClick={() => handleAlgoClick(algo.value)} sx={{fontFamily: "'SF Pro Display', sans-serif",}}> 
                  <HtmlTooltip placement="right" title={algo.tooltip} sx={{fontFamily: "'SF Pro Display', sans-serif",}}> 
                      <Box sx={{width:"100%"}}>
                      <Typography sx={{fontFamily: "'SF Pro Display', sans-serif",}}>{algo.name}</Typography>   
                      </Box>                         
                      </HtmlTooltip>     
                  </MenuItem>                 
                ))
              ) : (
                classificationAlgos.map((algo) => (
                  <MenuItem key={algo.value} value={algo.value} onClick={() => handleAlgoClick(algo.value)} sx={{fontFamily: "'SF Pro Display', sans-serif",}}> 
                  <HtmlTooltip placement="right" title={algo.tooltip} sx={{fontFamily: "'SF Pro Display', sans-serif",}}>              
                      <Box sx={{width:"100%"}}>
                      <Typography sx={{fontFamily: "'SF Pro Display', sans-serif",}}>{algo.name}</Typography>   
                      </Box>                
                      </HtmlTooltip>     
                  </MenuItem>                 
                ))
              )}

              </TextField>            
            </Box>            
          </Box>
        </CustomTooltip>

        
          <Box sx={{ height: '52%' }}>
            {/* Table */}
           
            <Box sx={{ display: 'flex' }}>
            <CustomTooltip
          open={tooltipId === 12 ? true : false}
          onOpen={handleOpen}
          onClose={handleClose}
          title={
            <Box padding="10px" display="flex" flexDirection="column" gap="10px">
              <Typography>Once uploaded, preview your data to ensure everything
                looks right. This is the first look at your dataset.</Typography>
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(11)}>PREVIOUS</Button>
                <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(13)}>NEXT</Button>
              </Box>
            </Box>
          }
          placement="top"
          arrow
        >
              <Box>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  fontFamily: "'SF Pro Display', sans-serif",
                }}
              >
                CSV file preview
              </Typography>
              </Box>
              </CustomTooltip>
              <HtmlTooltip placement="right"
                title={
                  <React.Fragment>
                    <Typography color="inherit" sx={{ fontWeight: "bold", fontFamily: "Open Sans" }} >Which is which?</Typography> <br />
                    <u><b>{'Target Column:'}</b></u><em>{" A column in a dataset that the machine learning model is trying to predict."}</em><br /><em>{"(Ex- SalePrice, Churn, CreditScore)"}</em>
                    <br /> <br />
                    <u><b>{'Identifier Column:'}</b></u><em>{" A column in a dataset that contains unique identifiers for each record. "}</em><br /><em>{"(Ex- ID, CustomerID, ProductCode)"}</em>
                    <br /><br />
                  </React.Fragment>
                }>
                <InfoIcon fontSize="small" sx={{ margin: ".3em 0 0 .2em", color: "grey" }} />
              </HtmlTooltip>
            </Box>            

            <Typography
              sx={{
                margin: "0.5em 0 0 0",
                fontSize: "1.1rem",
                fontWeight: "semi bold",
                fontFamily: "'SF Pro Display', sans-serif",
                marginBottom: "10px"
              }}
            >
              Understand the data from each column and identify the target column and identifier column (if any)
            </Typography>
            <CustomTooltip
              open={tooltipId === 13 || tooltipId === 14 ? true : false}
              onOpen={handleOpen}
              onClose={handleClose}
              title={
                tooltipId === 13 ? (
                  <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                    <Typography>Identify the prediction column: This is what you want to predict.
                      It could be the price of a house, whether an email is spam, etc.</Typography>
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(12)}>PREVIOUS</Button>
                      <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(14)}>NEXT</Button>
                    </Box>
                  </Box>
                ) : (
                  <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                    <Typography>Identify the relevant columns: These are factors that might influence your
                      prediction column. For instance, the number of rooms might affect a house’s price.</Typography>
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(13)}>PREVIOUS</Button>
                      <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(100)}>NEXT</Button>
                    </Box>
                  </Box>
                )
              }
              placement="top"
              arrow
            >
              <Box sx={{ height: '75%', overflowX: 'hidden', overflowY: 'auto', borderTop: "1px solid #D3D3D3" }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {columns.map((rows, index) => {
                        return <TableCell key={index}>{rows}</TableCell>;
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values.slice(0, 10).map((value, index) => {
                      return (
                        <TableRow key={index}>
                          {value.map((val, i) => {
                            return <TableCell key={i}>{val}</TableCell>;
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </CustomTooltip>
          </Box>
        
       
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "5px" }}>
        <CustomTooltip
          open={tooltipId === 100 ? true : false}
          onOpen={handleOpen}
          onClose={handleClose}
          title={
            <Box padding="10px" display="flex" flexDirection="column" gap="10px">
              <Typography>After understanding your dataset and how the relevant columns affect the prediction column, click on Analyse Data</Typography>
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(14)}>PREVIOUS</Button>
                <Button variant="contained" onClick={() => setTooltipId(15)}>OKAY</Button>
              </Box>
            </Box>
          }
          placement="top"
          arrow
        >
          <Button
            variant="contained"
            disabled={!disabled && fileName === ""}
            onClick={onClick}
            sx={{ borderRadius: "15px"}}
          >
            Analyse Data
          </Button>
          </CustomTooltip>
        </Box>
        
      </Paper>
      <EditDialog open={openEdit} setOpen={setOpenEdit} modelName={model.name} />
    </Card>
  );
};

export default Body;
