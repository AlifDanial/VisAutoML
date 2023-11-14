import {
  Button,
  Card,
  Divider,
  IconButton,
  MenuItem,
  OutlinedInput,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Lists from "./Lists";
import { makeStyles } from "@mui/styles";
import { submitModel } from "../../actions/modelAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import LoadingDialog from "./LoadingDialog";
import EditDialog from "../common/EditDialog";
import { withStyles } from "@mui/styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import HelpIcon from '@mui/icons-material/Help';

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

const useStyles = makeStyles({
  root: {
    width: "125px",
    height: "62px",
    padding: "0px",
  },
  switchBase: {
    color: "#818181",
    padding: "1px",
    "&$checked": {
      "& + $track": {
        backgroundColor: "#23bf58",
      },
    },
  },
  thumb: {
    color: "white",
    width: "56px",
    height: "56px",
    margin: "2px",
  },
  track: {
    borderRadius: "30px",
    backgroundColor: "#818181",
    opacity: "1 !important",
    "&:after, &:before": {
      color: "white",
      fontSize: "14px",
      fontWeight: "bold",
      position: "absolute",
      top: "19px",
    },
    "&:after": {
      content: "'Auto'",
      left: "19px",
    },
    "&:before": {
      content: "'Manual'",
      right: "6px",
    },
  },
  checked: {
    color: "#23bf58 !important",
    transform: "translateX(62px) !important",
  },
});

const classificationAlgos = [
  {
    name: "Logistic Regression",
    value: "LogisticRegression",
    tooltip:
      "Choose Logistic Regression when you have a binary classification problem with two possible outcomes, like 'yes' or 'no.'It's like a straightforward yes-or-no decision maker for simple problems.",
  },
  {
    name: "Random Forest Classifier",
    value: "RandomForestClassifier",
    tooltip:
      "Consider the Random Forest Classifier when you have a complex classification task with many features. It's like a team of experts voting on a decision, which is helpful for tough decisions with lots of factors.",
  },
  {
    name: "Gradient Boosting Classifier",
    value: "GradientBoostingClassifier",
    tooltip:
      "Gradient Boosting when you need highly accurate predictions and can afford longer training times. It's like a sports team that learns from its mistakes and keeps getting better over time.",
  },
  {
    name: "Decision Tree Classifier",
    value: "DecisionTreeClassifier",
    tooltip:
      "Use a decision tree classifier when you need a model that's easy to understand and can handle a mix of data types. It's like a flowchart that splits the data into branches until it finds the best answers.",
  },
  {
    name: "XGB Classifier",
    value: "XGBClassifier",
    tooltip:
      "Opt for XGBoost when you need top-notch performance and have a large dataset with intricate patterns. Think of it as having a super-smart friend who finds hidden patterns in your data.",
  },
];

const regressionAlgos = [
  {
    name: "Random Forest Regressor",
    value: "RandomForestRegressor",
    tooltip:
      "Go for the Random Forest Regressor when you need to predict continuous values and have multiple input features. It's like getting opinions from multiple appraisers to estimate a house's value.",
  },
  {
    name: "Gradient Boosting Regressor",
    value: "GradientBoostingRegressor",
    tooltip:
      "Consider the Gradient Boosting Regressor when you need high prediction accuracy and can invest more time in training. It's like a teacher who helps you improve your test scores over time.",
  },
  {
    name: "Extra Trees Regressor",
    value: "ExtraTreesRegressor",
    tooltip:
      "Use the Extra Trees Regressor for simpler and faster regression tasks when precision is not the primary concern. Think of it as a quick and simple tool for making predictions.",
  },
];

const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Body = ({ backDialogOpen, setBackDialogOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { response, model, name, type, mode } = useSelector((state) => state.model);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [columns, setColumns] = useState([]);
  const [isAuto, setIsAuto] = useState("Auto");
  const [algoValue, setAlgoValue] = useState("");
  const navigate = useNavigate();
  const [elements, setElements] = useState({
    "Prediction Column": [],
    "ID Column": [],
    "Columns not to use": [],
    "Columns to use": []
  });
  const [unit, setUnit] = useState("");
  const [label0, setLabel0] = useState("");
  const [label1, setLabel1] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [tooltipId, setTooltipId] = useState(0);

  const handleOpen = () => { };

  const handleClose = () => { };

  useEffect(() => {
    setTooltipId(mode);
  }, [mode]);

  useEffect(() => {
    console.log("Select dispatch",tooltipId);
    if (tooltipId === 23 || tooltipId === 34) dispatch({ type: "TOGGLE_MODE", payload: tooltipId });
    console.log("After Select Dispatch Mode:",mode);
    console.log("After Select Dispatch TooltipID:",tooltipId);
  }, [tooltipId])

  const handleBack = () => {
    setBackDialogOpen(true);
  };
  useEffect(() => {
    if (elements["Prediction Column"].length === 1 && isAuto === "Auto") {
      setDisabled(false);
    } else if (elements["Prediction Column"].length === 1 && isAuto === "Manual") {
      if (algoValue !== "") {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else if (
      elements["Prediction Column"].length === 0 ||
      (isAuto === "Auto" && algoValue === "")
    ) {
      setDisabled(true);
    }

  }, [algoValue, elements, isAuto]);
  useEffect(() => {
    if (response && response.columns) {
      setColumns(response.columns);
    }
  }, [response]);
  const handleChecked = (e) => {
    setAlgoValue("");
    // setIsAuto(e.target.checked);
    setIsAuto(prev => {
      if (prev === "Auto")
        return "Manual";
      else
        return "Auto";
    })
  };
  const handleAlgoChange = (e) => {
    setAlgoValue(e.target.value);
  };
  const onClick = (e) => {
    const auto = isAuto === "Auto" ? true : false;
    dispatch(
      submitModel({
        elements,
        auto: auto,
        algo: algoValue,
        unit,
        label0,
        label1,
        split,
      })
    );
    setLoadingOpen(true);
  };

  function valueLabelFormat(value) {
    let scaledValue = value;

    return `${scaledValue} %`;
  }
  const [value, setValue] = useState(50);
  const [split, setSplit] = useState(50);

  const handleChange = (event, newValue) => {
    if (typeof newValue == 'number') {
      setValue(newValue);
      setSplit(newValue);
      console.log(split);
    }
  }

  const [alignment, setAlignment] = useState([0, 1, 2]);

  const handleAlignment = (event, newAlignment) => {
    // Check if the new alignment length is greater than 3
    if (newAlignment.length > 3) {
      // Remove the first (oldest) element from the selection
      newAlignment.shift();
    }
    // Update the state with the new alignment
    setAlignment(newAlignment);
  };

  const handleBack1 = () => {
    navigate("/review");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        padding: "30px",
        width: "100%",
        // maxHeight: "100vh",
        // overflowY: "auto"
      }}
    >
      <Card
        sx={{
          padding: "20px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100%",
        }}
      >
        <Box sx={{ display: "flex" }} justifyContent="space-between">
          <Box sx={{ display: "flex" }}>
            <IconButton onClick={handleBack1}>
              <ArrowBackIcon />
            </IconButton>
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "600",
                fontFamily: "'SF Pro Display', sans-serif",
              }}
            >
              Model Training
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bolder",
              fontFamily: "Open Sans",
              display: "flex",
              alignItems: "center",
              cursor: "pointer"
            }}
            onClick={() => setOpenEdit(true)}
          >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={`/img/${type}.png`} alt={type} />
                <span style={{ marginLeft: "5px" }}>{name}</span>
              </div>
          </Typography>
        </Box>
        <Box sx={{ width: "100%", display: "flex", gap: "2.5em" }}>
          <Box width="20%">
            <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ height: "35em" }}>
              <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}>
              <Typography
               alignItems="center"
                sx={{
                  fontSize: { xl: "1.2rem", lg: "1.1rem", md: "1rem" },
                  fontWeight: "bolder",
                  fontFamily: "'SF Pro Display', sans-serif",
                  marginTop:"1.1em",
                  padding:"0em 0.3em 0em 1.8em"
                }}
              >
                Algorithm Selection
              </Typography>
              <HtmlTooltip
                placement="right" title="Use the best performing algorithm or choose one manually.">
                    <HelpIcon fontSize="small" sx={{ color: "#a3bbd4", marginTop:".9em" }} />
                </HtmlTooltip>
              </Box>
              
              <CustomTooltip
              open={tooltipId === 23 ? true : false}
              onOpen={handleOpen}
              onClose={handleClose}
              title={
                <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                  <Typography>Opt for 'Auto' for the best performing algorithm
                    or 'Manual' to select your desired algorithm.</Typography>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(22)} >PREVIOUS</Button>
                    <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(24)} >NEXT</Button>
                  </Box>
                </Box>
              }
              placement="right"
              arrow
            >
              <Box>
              <ToggleButtonGroup
                value={isAuto}
                exclusive
                onChange={handleChecked}
                aria-label="text alignment"
                color="primary"
                style={{ width: '100%' }} // Add this line to make it full width
              >
                <ToggleButton value="Auto" style={{ width: '50%' }}>Auto</ToggleButton> {/* And adjust the width here */}
                <ToggleButton value="Manual" style={{ width: '50%' }}>Manual</ToggleButton> {/* And here */}
              </ToggleButtonGroup>
              </Box>
              </CustomTooltip>
              <TextField
                select
                fullWidth
                label="Select an algorithm"
                value={algoValue}
                onChange={handleAlgoChange}
                disabled={isAuto === "Auto" ? true : false}
              >
                {model && model.model_type === "RG"
                  ? regressionAlgos.map((algo) => (
                    <MenuItem key={algo.value} value={algo.value}>                      
                      <HtmlTooltip placement="right" title={algo.tooltip} sx={{fontFamily: "'SF Pro Display', sans-serif",}}> 
                      <Box sx={{width:"100%"}}>
                      <Typography sx={{fontFamily: "'SF Pro Display', sans-serif",}}>{algo.name}</Typography>   
                      </Box>                         
                      </HtmlTooltip>     
                    </MenuItem>
                  ))
                  : classificationAlgos.map((algo) => (
                    <MenuItem key={algo.value} value={algo.value}>
                      <HtmlTooltip placement="right" title={algo.tooltip} sx={{fontFamily: "'SF Pro Display', sans-serif",}}> 
                      <Box sx={{width:"100%"}}>
                      <Typography sx={{fontFamily: "'SF Pro Display', sans-serif",}}>{algo.name}</Typography>   
                      </Box>                         
                      </HtmlTooltip>     
                    </MenuItem>
                  ))}
              </TextField>   
              <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}>      
              <Typography
                sx={{
                  fontSize: { xl: "1.2rem", lg: "1.1rem", md: "1rem" },
                  fontWeight: "bolder",
                  fontFamily: "'SF Pro Display', sans-serif",
                  padding:"0em 0.3em 0em 1.6em"
                }}
              >
                Data Split Percentage
              </Typography>
              <HtmlTooltip
                placement="right" title="Decide percentage of data for training. The remainder will be used for testing. ">
                    <HelpIcon fontSize="small" sx={{ color: "#a3bbd4", }} />
                </HtmlTooltip>
              </Box>   
              <Typography
                id="non-linear-slider"
                width="100%"
                textAlign="center"
                style={{
                  border: "1px solid #2288FF",
                  borderRadius: "3px",
                  height:"3em",
                  padding:"1em",
                  paddingBottom:"2.4em",
                  fontFamily: "Open Sans",
                  fontWeight: "bold"

                }}
              >
                {valueLabelFormat(value)}
              </Typography>
              <CustomTooltip
              open={tooltipId === 24 || tooltipId === 25 ? true : false}
              onOpen={handleOpen}
              onClose={handleClose}
              title={
                tooltipId === 24 ? (
                <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                  <Typography>{"Define how you want to split your data for training and testing. A balanced split ensures a robust model performance."}</Typography>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(23)} >PREVIOUS</Button>
                    <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(25)} >NEXT</Button>
                  </Box>
                </Box>
                ) : (
                  <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                    <Typography>{"Consider using a 70-30 or 80-20 split for your data. These are common ratios that offer a good balance between training and testing."}</Typography>
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(24)}>PREVIOUS</Button>
                      <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(26)}>NEXT</Button>
                    </Box>
                  </Box>
                )
              }
              placement="right"
              arrow
            >
              <Box width="100%">
              <Slider
                value={split}                
                min={20}
                max={80}
                step={1}
                valueLabelFormat={valueLabelFormat}
                onChange={handleChange}
                // valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
              />
              </Box>
              </CustomTooltip>
              {model.model_type === "RG" ?
                <>
                <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}>
                  <Typography
                    sx={{
                      fontSize: { xl: "1.2rem", lg: "1.1rem", md: "1rem" },
                      fontWeight: "bolder",
                      fontFamily: "'SF Pro Display', sans-serif",
                      padding:"0em 0.5em 0em 0.9em"
                    }}
                  >
                    Prediction Column Unit
                  </Typography>
                  <HtmlTooltip
                placement="right" title="Specify the Unit for the prediction column. Example: %, Dollars, years, Degree Celsius">
                    <HelpIcon fontSize="small" sx={{ color: "#a3bbd4", }} />
                </HtmlTooltip>
                  </Box>
                  <CustomTooltip
                    open={tooltipId === 26 ? true : false}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    title={
                      <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                        <Typography>Specify the unit for your prediction column. <br />
                            Example Units: years, cm, %, $.</Typography>
                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(25)} >PREVIOUS</Button>
                          <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(27)} >NEXT</Button>
                        </Box>
                      </Box>
                    }
                    placement="right"
                    arrow
                  >
                    <Box sx={{width: "100%"}}>
                  <OutlinedInput
                    sx={{width: "100%",
                    padding:"0.8em"}}
                    placeholder="Unit for Prediction Column"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  />
                  </Box>
                  </CustomTooltip>
                </> :
                <>
                <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}>
                  <Typography
                    sx={{
                      fontSize: { xl: "1.2rem", lg: "1.1rem", md: "1rem" },
                      fontWeight: "bolder",
                      fontFamily: "'SF Pro Display', sans-serif",
                      padding:"0em 0.5em 0em 0.9em"
                    }}
                  >
                    Prediction Column Label
                  </Typography>
                  <HtmlTooltip
                placement="right" title="Labels that represent 0 and 1 in the prediction column. Example: 0=Not Spam & 1=Spam, 0=Healthy & 1=Diseased ">
                    <HelpIcon fontSize="small" sx={{ color: "#a3bbd4", }} />
                </HtmlTooltip>
                  </Box>
                  <CustomTooltip
                    open={tooltipId === 26 ? true : false}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    title={
                      <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                        <Typography>{"Label the values that represent 0 and 1 in your prediction column."} <br /> {"Example Labels: 0=Not Spam & 1=Spam, 0=Healthy & 1=Diseased "}</Typography>
                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(25)} >PREVIOUS</Button>
                          <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(27)} >NEXT</Button>
                        </Box>
                      </Box>
                    }
                    placement="right"
                    arrow
                  >
                    <Box sx={{width: "100%"}}>
                  <OutlinedInput
                  value={label0}
                  onChange={(e) => setLabel0(e.target.value)}
                    sx={{width: "100%",
                          padding:"0.8em",
                          marginBottom: "1em"}}
                    placeholder="Label for Value 0"
                  />
                  
                  
                  <OutlinedInput
                  value={label1}
                  onChange={(e) => setLabel1(e.target.value)}
                    sx={{width: "100%",
                          padding:"0.8em"}}
                    placeholder="Label for Value 1"
                  />
                  </Box>
                  </CustomTooltip>                  
                </>}
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box width="40%">
            <Box sx={{ height: "5em" }}>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bolder",
                  fontFamily: "'SF Pro Display', sans-serif",
                  marginTop:"1.1em"
                }}
              >
                Column Mapping
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontFamily: "'SF Pro Display', sans-serif",
                }}
              >
                Drag and drop the columns to the respective boards
              </Typography>
            </Box>
            <Lists
              columns={columns}
              elements={elements}
              setElements={setElements}
              tooltipId={tooltipId}
              setTooltipId={setTooltipId}
            />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box width="40%">
            <Box sx={{ height: "5em" }}>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bolder",
                  fontFamily: "'SF Pro Display', sans-serif",
                  marginTop:"1.1em"
                }}
              >
                Data Viewer
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontFamily: "'SF Pro Display', sans-serif",
                }}
              >
                Click on the column boxes to peek into your data
              </Typography>
            </Box>
            <CustomTooltip
              open={tooltipId === 32 ? true : false}
              onOpen={handleOpen}
              onClose={handleClose}
              title={
                <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                  <Typography>Get a quick glance at your data. Click on the columns and review the top rows of your 
                        dataset to ensure correct column mapping.</Typography>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(31)}>PREVIOUS</Button>
                    <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(33)}>NEXT</Button>
                  </Box>
                </Box>
              }
              placement="left"
              arrow
            >
            <Box width="100%">
              <ToggleButtonGroup value={alignment} onChange={handleAlignment} aria-label="text alignment" color="primary" style={{ display: "flex", flexWrap: "wrap" }}>
                {
                  response.columns.map((item, index) =>
                    <ToggleButton key={index} style={{ margin: "5px", border: "1px solid", borderRadius: "5px", padding: "5px", fontFamily: "'SF Pro Display', sans-serif",}} value={index}>{item}</ToggleButton>
                  )
                }
              </ToggleButtonGroup>
            </Box>
            </CustomTooltip>
            <Box overflow="auto">
            <Table width="100%">
            <TableHead width="100%" style={{ backgroundColor: "#EEEEEE"}}>
              <tr> {/* Add this <tr> tag to wrap your <TableCell> tags */}
                {alignment.map((one, index) =>
                  <th key={one}> {/* Use <th> for header cells */}
                    <Typography fontSize="1.2em" style={{ width: "fit-content", fontFamily: "'SF Pro Display', sans-serif", fontWeight:"800", padding:"5px"}}>
                      {response.columns[one]}
                    </Typography>
                  </th>
                )}
              </tr> {/* Close the <tr> tag here */}
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) =>
                <TableRow key={`row-${rowIndex}`}>
                  {alignment.map((one, cellIndex) =>
                    <TableCell key={`cell-${rowIndex}-${cellIndex}`}>
                      {response.histogram[response.columns[one]][row]}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>


            </Box>
          </Box>
        </Box>        
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1em" }}>
        <CustomTooltip
              open={tooltipId === 33 ? true : false}
              onOpen={handleOpen}
              onClose={handleClose}
              title={
                <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                  <Typography>{"Once you are done with column mapping and adding the unit/labels for the prediction, click on 'Train Model' "}</Typography>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(32)}>PREVIOUS</Button>
                    <Button variant="contained" onClick={() => setTooltipId(34)}>OKAY</Button>
                    {/* <Button variant="contained"  onClick={() => dispatch({ type: "TOGGLE_MODE", payload: -1 })}>OKAY</Button> */}
                  </Box>
                </Box>
              }
              placement="left"
              arrow
            >
              <Box>
          <Button variant="contained" disabled={disabled} sx={{ borderRadius: "15px" }} onClick={onClick}>
            Train Model
          </Button>
          </Box>
          </CustomTooltip>
        </Box>        
      </Card>
      <LoadingDialog
        open={loadingOpen}
        setOpen={setLoadingOpen}
      />
      <EditDialog open={openEdit} setOpen={setOpenEdit} modelName={name} />
    </Box>
  );
};

export default Body;
