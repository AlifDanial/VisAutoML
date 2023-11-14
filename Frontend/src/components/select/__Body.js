import {
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Switch,
  TableBody,
  TableCell,
  TableContainer,
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
import InfoIcon from "@mui/icons-material/Info";
import { makeStyles } from "@mui/styles";
import { submitModel } from "../../actions/modelAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#000000',
    color: '#ffffff',
    maxWidth: 580,
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #dadde9',
    borderRadius: '8px',
  },
}));


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
      "Logistic regression is easier to implement, interpret, and very efficient to train. If the number of rows is lesser than the number of columns, Logistic Regression should not be used, otherwise, it may lead to overfitting.",
  },
  {
    name: "Random Forest Classifier",
    value: "RandomForestClassifier",
    tooltip:
      "A random forest produces good predictions that can be understood easily. It can handle large datasets efficiently. The random forest algorithm provides a higher level of accuracy in predicting outcomes over the decision tree algorithm.",
  },
  {
    name: "Gradient Boosting Classifier",
    value: "GradientBoostingClassifier",
    tooltip:
      "Gradient boosting trees can be more accurate, faster training speed, and higher efficiency than random forests.",
  },
  {
    name: "Decision Tree Classifier",
    value: "DecisionTreeClassifier",
    tooltip:
      "Decision trees require less effort for data preparation and are simple hence they require less effort for interpreting the algorithm.",
  },
  {
    name: "XGB Classifier",
    value: "XGBClassifier",
    tooltip:
      "XGBClassifier is highly flexible, faster than Gradient boosting and effective with large data sets.",
  },
];

const regressionAlgos = [
  {
    name: "Random Forest Regressor",
    value: "RandomForestRegressor",
    tooltip:
      "A random forest produces good predictions that can be understood easily. It can handle large datasets efficiently. The random forest algorithm provides a higher level of accuracy in predicting outcomes over the decision tree algorithm.",
  },
  {
    name: "Gradient Boosting Regressor",
    value: "GradientBoostingRegressor",
    tooltip:
      "Gradient boosting trees can be more accurate, faster training speed, and higher efficiency than random forests.",
  },
  {
    name: "Extra Trees Regressor",
    value: "ExtraTreesRegressor",
    tooltip:
      "The main advantage of Extra Trees is the reduction in bias and faster training speed.",
  },
];

const Body = ({ backDialogOpen, setBackDialogOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { response, model } = useSelector((state) => state.model);
  const [columns, setColumns] = useState([]);
  // const [isAuto, setIsAuto] = useState(true);
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

  const handleBack = () => {
    setBackDialogOpen(true);
  };
  useEffect(() => {
    if (elements["Prediction Column"].length === 1 && isAuto === "Manual") {
      setDisabled(false);
    } else if (elements["Prediction Column"].length === 1 && isAuto === "Auto") {
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
    const auto = isAuto === "Manual" ? true : false;
    dispatch(
      submitModel({
        elements,
        auto: auto,
        algo: algoValue,
        unit,
        label0,
        label1,
      })
    );
    navigate("/model");
  };

  function valueLabelFormat(value) {
    let scaledValue = value;

    return `${scaledValue} %`;
  }
  const [value, setValue] = useState(50);

  const handleChange = (event, newValue) => {
    if (typeof newValue == 'number') {
      setValue(newValue);
    }
  }

  const [alignment, setAlignment] = useState(() => ["1", "2", "3"]);
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  }
  const alignmentList = [
    "IJM",
    "IOI",
    "MOX",
    "RESORT",
    "IJM",
    "IOI",
    "IJM",
    "IOI",
    "MOX",
    "RESORT",
  ];

  return (
    <Box sx={{ backgroundColor: "#F5F5F5", padding: "30px", width: "100%" }}>
      <Card
        sx={{
          padding: "20px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100%"
        }}
      >
        <Box display="flex">
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bolder",
              fontFamily: "Open Sans",
              marginLeft: "15px"
            }}
          >
            Model Training
          </Typography>
        </Box>
        <Box sx={{ width: "100%", display: "flex", gap: "2.5em" }}>
          <Box width="30%">
            <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ height: "35em" }}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
              >
                Algorithm Selection
              </Typography>
              {/* <Switch
                classes={{
                  root: classes.root,
                  switchBase: classes.switchBase,
                  thumb: classes.thumb,
                  track: classes.track,
                  checked: classes.checked,
                }}
                checked={isAuto}
                onChange={handleChecked}
              /> */}
              <ToggleButtonGroup value={isAuto} exclusive onChange={handleChecked} aria-label="text alignment" color="primary">
                <ToggleButton value="Auto">Auto</ToggleButton>
                <ToggleButton value="Manual">Manual</ToggleButton>
              </ToggleButtonGroup>
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
                      {/* <Tooltip title={algo.tooltip} placement="right">
                        <Typography>{algo.name}</Typography>
                      </Tooltip> */}
                      <HtmlTooltip placement="right"
                        title={
                          <React.Fragment>
                            {algo.tooltip}
                          </React.Fragment>}>
                        <Typography>{algo.name}</Typography>
                      </HtmlTooltip>
                    </MenuItem>
                  ))
                  : classificationAlgos.map((algo) => (
                    <MenuItem key={algo.value} value={algo.value}>
                      {/* <Tooltip title={algo.tooltip} placement="right">
                        <Typography>{algo.name}</Typography>
                      </Tooltip> */}
                      <HtmlTooltip placement="right"
                        title={
                          <React.Fragment>
                            {algo.tooltip}
                          </React.Fragment>}>
                        <Typography>{algo.name}</Typography>
                      </HtmlTooltip>
                    </MenuItem>
                  ))}
              </TextField>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
              >
                Data Split Percentage
              </Typography>
              <Typography
                id="non-linear-slider"
                gutterBottom
                width="100%"
                textAlign="center"
                style={{
                  border: "1px solid #2288FF",
                  borderRadius: "3px"
                }}
              >
                {valueLabelFormat(value)}
              </Typography>
              <Slider
                value={value}
                min={1}
                max={200}
                step={1}
                valueLabelFormat={valueLabelFormat}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
              />
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
              >
                Prediction Column Unit
              </Typography>
              <OutlinedInput
                placeholder="Unit for Prediction Column"
              />
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box width="40%">
            <Box sx={{ height: "5em" }}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
              >
                Feature Engineering
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Open Sans",
                }}
              >
                Drag and drop the columns/features to the respective boards
              </Typography>
            </Box>
            <Lists
              columns={columns}
              elements={elements}
              setElements={setElements}
            />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box minWidth="25%">
            <Box sx={{ height: "5em" }}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bolder",
                  fontFamily: "Open Sans",
                }}
              >
                Data Viewer
              </Typography>
              {/* <Typography
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Open Sans",
                }}
              >
                Add the unit of the prediction column
              </Typography> */}
            </Box>
            <Box width="100%">
              <ToggleButtonGroup value={alignment} onChange={handleAlignment} aria-label="text alignment" color="primary" style={{ display: "flex", flexWrap: "wrap" }}>
                {
                  alignmentList.map((item, index) =>
                    <ToggleButton key={index} style={{ margin: "10px", border: "1px solid", borderRadius: "5px" }} value={index}>{item}</ToggleButton>
                  )
                }
              </ToggleButtonGroup>
            </Box>
            <Box>
              <TableContainer width="100%">
                <TableHead width="100%" style={{ backgroundColor: "#EEEEEE" }}>
                  <TableCell>
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                      <Typography
                        fontSize="1em"
                        style={{ color: "#00CC00", width: "fit-content", marginRight: "10px" }}
                      >
                        123
                      </Typography>
                      <Typography fontSize="1.2em" style={{ width: "fit-content" }}>
                        Custom Key
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                      <Typography
                        fontSize="1em"
                        style={{ color: "#00CC00", width: "fit-content", marginRight: "10px" }}
                      >
                        abc
                      </Typography>
                      <Typography fontSize="1.2em" style={{ width: "fit-content" }}>
                        Custom Name
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                      <Typography
                        fontSize="1em"
                        style={{ color: "#00CC00", width: "fit-content", marginRight: "10px" }}
                      >
                        abc
                      </Typography>
                      <Typography fontSize="1.2em" style={{ width: "fit-content" }}>
                        Custom Address
                      </Typography>
                    </Box>
                  </TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>11</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>13</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>21</TableCell>
                    <TableCell>22</TableCell>
                    <TableCell>23</TableCell>
                  </TableRow>
                </TableBody>
              </TableContainer>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" disabled={disabled} sx={{ borderRadius: "15px" }} onClick={onClick}>
            Next
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Body;
