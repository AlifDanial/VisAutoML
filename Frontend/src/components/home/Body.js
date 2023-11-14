import { Box, Grid, Button, Card, Divider, Typography, Paper, Tooltip as muiTooltip } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from "@mui/icons-material/Add";
import { withStyles } from "@mui/styles";
import NewModelDialog from "./NewModelDialog";
import RegressDialog from "./RegressDialog";
import ClassDialog from "./ClassDialog";
import VideoDialog from "./VideoDialog";
import DeleteDialog from "./DeleteDialog";
import newModel from "../../static/images/newModel.png";
import forecast from "../../static/images/forecast.png";
import onlinevideo from "../../static/images/online-video.png";
import classifier from "../../static/images/open-door.png";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TableComponent from "./Table";
import TutorialDialog from "./TutorialDialog";
import Avatar from '@mui/material/Avatar';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Chip from '@mui/material/Chip';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import "../../App.css";
import { BACKEND_BASE_URL } from "../../config/config.js";
import axios from "axios";
import Cookies from "js-cookie";
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import WelcomeDialog from "./Welcome.js";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const CustomTooltip = withStyles({
  tooltip: {
    minWidth: "450px",
    textAlign: "center",
  }
})(muiTooltip);

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const category = {
  Classification: [
    {
      name: "Logistic Regression",
      value: "LogisticRegression"
    },
    {
      name: "Random Forest Classifier",
      value: "RandomForestClassifier"
    },
    {
      name: "Gradient Boosting Classifier",
      value: "GradientBoostingClassifier"
    },
    {
      name: "Decision Tree Classifier",
      value: "DecisionTreeClassifier"
    },
    {
      name: "XGB Classifier",
      value: "XGBClassifier"
    }
  ],
  Regression: [
    {
      name: "Random Forest Regressor",
      value: "RandomForestRegressor"
    },
    {
      name: "Gradient Boosting Regressor",
      value: "GradientBoostingRegressor"
    },
    {
      name: "Extra Trees Regressor",
      value: "ExtraTreesRegressor"
    },
  ]
}

const Body = () => {
  const [newModelOpen, setNewModelOpen] = useState(false);
  const [tooltipId, setTooltipId] = useState(-1);
  const [regressOpen, setRegressOpen] = useState(false);
  const [classifyOpen, setclassOpen] = useState(false);
  const [tutorialOpen, setTutorial] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [modelName, setModelName] = useState("");
  const [modelType, setModelType] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [clasPercent, setClasPercent] = useState(7);
  const [regPercent, setRegPercent] = useState(93);

  const [rows, setPosts] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [class1, setClass1] = useState('');
  const [class2, setClass2] = useState('');

  const { mode } = useSelector((state) => state.model);

  const dispatch = useDispatch();
  const csrfToken = Cookies.get("csrftoken");

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-CSRFToken": csrfToken,
    },
  };

  const handleOpen = () => { };

  const handleClose = () => { };

  const onOpenTutorial = (title, url) => {
    setVideoTitle(title);
    setVideoUrl(url);
    setVideoDialogOpen(true);
  };

  const handleChange1 = (e) => {
    setClass1(e.target.value);
    if (e.target.value) {
      setChartData(rows.filter(one => one.model_type === e.target.value));
    }
    else {
      setChartData(rows);
    }
    setClass2('');
  };
  const handleChange2 = (e) => {
    setClass2(e.target.value);
    if (e.target.value) {
      setChartData(rows.filter(one => one.model_type === class1 && one.algorithm_name === e.target.value));
    }
    else {
      setChartData(rows.filter(one => one.model_type === class1));
    }
  };

  useEffect(() => {
    axios
      .get(BACKEND_BASE_URL + `table/`, config)
      .then((res) => {
        setPosts(res.data);
        if (class1) {
          if (class2) {
            setChartData(res.data.filter(one => one.model_type === class1 && one.algorithm_name === class2));
          } else {
            setChartData(res.data.filter(one => one.model_type === class1));
          }
        } else {
          setChartData(res.data);
        }
        calcClaspercent(res.data);
        calcRegpercent(res.data);
        dispatch({ type: "GET_REVIEW_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTooltipId(mode);
  }, [mode]);

  useEffect(() => {
    if (tooltipId === 2 || tooltipId === 10) dispatch({ type: "TOGGLE_MODE", payload: tooltipId });
  }, [tooltipId])

  useEffect(() => {
    if (class1) {
      if (class2) {
        setChartData(rows.filter(one => one.model_type === class1 && one.algorithm_name === class2));
      } else {
        setChartData(rows.filter(one => one.model_type === class1));
      }
    } else {
      setChartData(rows);
    }
  }, [rows, class1, class2])

  const calcAvgmark = () => {
    let sum = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].overall_score === null) {
        continue;
      } else {
        sum += rows[i].overall_score / 1;
      }
    }
    var avg = sum / rows.length;
    return avg.toFixed(0);
  }

  const getRecentalgorithm = () => {
    let nameset = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].algorithm_name === "") {
        continue;
      } else {
        nameset.push(rows[i].algorithm_name);
      }
    }
    return nameset[0];
  }

  const calcClaspercent = (data) => {
    let clas = 0;
    let cnt = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].model_type === "Classification") {
        cnt++;
      }
    }
    clas = (cnt / data.length) * 100;
    // return clas.toFixed(0);
    setClasPercent(parseInt(clas));
  }

  const calcRegpercent = (data) => {
    let reg = 0;
    let cnt = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].model_type === "Regression") {
        cnt++;
      }
    }
    reg = (cnt / data.length) * 100;
    // return reg.toFixed(0);
    setRegPercent(parseInt(reg));
  }

  const getMaxValue = () => {
    let max = 0;
    for (let i = 0; i < chartData.length; i++) {
      if (chartData[i]?.overall_score === null || chartData[i]?.overall_score === "0") {
        continue;
      } else {
        if (max < chartData[i]?.overall_score / 1) {
          // console.log(chartData[i].overall_score);
          max = chartData[i]?.overall_score / 1;
        }
      }
    }
    return max;
  }

  const options = {
    responsive: true,
    displayLabel: false,
    scales: {
      xAxes: {
        display: false,
        gridLines: {
          display: false,
          zerolineColor: "transparent"
        }
      },
      yAxes: {
        max: 100,
        display: false,
        gridLines: {
          display: false,
          zerolineColor: "transparent"
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        position: 'average',
        displayColors: false,
        callbacks: {
          title: () => '',
          label: () => { return '' },
          afterLabel: (context) => {
            const label = context.dataset.label || '';
            if (context.parsed.y !== null) {
              return `${context.label}\nOverall Score: ${context.parsed.y}%`;
            }
            // return label;
          },
          labelTextColor: function () {
            return '#344455'
          }
        },
        backgroundColor: 'white',
        titleFont:{size:12, fontFamily: "'SF Pro Display', sans-serif"},
        bodyFont:{size:11.5, fontFamily: "'SF Pro Display', sans-serif"},
      }
    },
    elements: {
      bar: {
        borderRadius: 5
      }
    },
    maintainAspectRatio: false
  };

  const data = {
    labels: chartData.map(one => `Model Name: ${one.model_name}\nModel Type: ${one.model_type}\nAlgorithm: ${one.algorithm_name}`),
    datasets: [{
      data: chartData.map(one => one.overall_score),
      backgroundColor: chartData.map(one => one.overall_score / 1 === getMaxValue() ? "#EAA349" : "#1A97F5")
    }]
  }

  const cdata = {
    datasets: [{
      data: [regPercent, clasPercent],
      backgroundColor: [
        "#1A97F5",
        "#EAA349"
      ],
      borderWidth: 0,
      hoverOffset: 1,
      rotation: 135,
      cutout: "75%"
    }]
  };

  return (
    <Grid container className="main"
      sx={{
        display: "flex",
        backgroundColor: "#F5F5F5",
        overflowX: "hidden",
        overflowY: "auto",
        padding: "20px"
      }}
    >
      <Grid item xs={12} sx={{ width: "100%", height: "35px", padding: "0px 10px 0px 20px", fontWeight: "900",
            fontFamily: "'SF Pro Display', sans-serif", }}>
        <Typography
          sx={{
            fontSize: "1.4rem",
            fontWeight: "bolder",            
          }}
        >
          Home
        </Typography>
        {/* <Typography
          sx={{    
            fontSize: ".9rem",
            fontWeight: "500",
            color: "black",
            fontFamily: "'SF Pro Display', sans-serif",

          }}
        >
          Dashboard
        </Typography> */}
      </Grid>
      <Grid item xs={12} sx={{ width: "100%", height: "220px", marginTop: "0px" }}>
        <Grid container sx={{ width: "100%", height: "100%" }}>
          <Grid item xs={6} md={6} lg={6.17} xl={6.34} sx={{ width: "100%", height: "100%", padding: "10px" }}>
            <Paper sx={{ width: "100%", height: "100%", backgroundColor: "#344455", borderRadius: "20px", padding: "20px" }}>
              <Grid container sx={{ width: "100%", height: "100%" }}>
                <Grid item xs={12} sx={{ width: "100%", height: "25%" }}>
                  <Grid container>
                    <Grid item xs={5}>
                      <Typography
                        sx={{
                          fontSize: "1em",
                          fontWeight: "bold",
                          fontFamily: "'SF Pro Display', sans-serif",
                          color: "white"
                        }}
                      >
                        Model Performance
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'SF Pro Display', sans-serif",
                          fontSize: "0.8em",
                          fontWeight: "500",
                          color: "white"
                        }}
                      >
                        Regression vs Classification
                      </Typography>
                    </Grid>
                    <Grid item xs={0.1}></Grid>
                    <Grid item xs={2.9} sx={{ marginTop: "-5px" }}>
                      <FormControl sx={{ m: 1, width: "100%" }} size="small">
                        <InputLabel sx={{ marginTop: "1px", fontSize: "12px" }}>Type</InputLabel>
                        <Select
                          sx={{ backgroundColor: "white", height: "35px", borderRadius: "5px", fontFamily: "'SF Pro Display', sans-serif", }}
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={class1}
                          label="class1"
                          onChange={handleChange1}
                        >
                          <MenuItem value="" sx={{fontFamily: "'SF Pro Display', sans-serif",}}>
                            <em>All</em>
                          </MenuItem>
                          <MenuItem value="Regression" sx={{fontFamily: "'SF Pro Display', sans-serif",}}>Regression</MenuItem>
                          <MenuItem value="Classification" sx={{fontFamily: "'SF Pro Display', sans-serif",}}>Classification</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} sx={{ padding: "0px 5px 0px 10px", marginTop: "-5px" }}>
                      <FormControl sx={{ m: 1, width: "100%" }} size="small">
                        <InputLabel sx={{ marginTop: "1px", fontSize: "12px" }}>Algorithm</InputLabel>
                        <Select
                          sx={{ backgroundColor: "white", height: "35px", borderRadius: "5px", fontFamily: "'SF Pro Display', sans-serif", }}
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={class2}
                          label="class2"
                          onChange={handleChange2}
                        >
                          <MenuItem value="" sx={{fontFamily: "'SF Pro Display', sans-serif",}}>
                            <em>All</em>
                          </MenuItem>
                          {
                            class1 ? category[class1].map(one => <MenuItem sx={{fontFamily: "'SF Pro Display', sans-serif",}} key={one.name} value={one.value}>{one.name}</MenuItem>) : ''
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ width: "100%", height: "70%", marginTop: "3%" }}>
                  <Bar options={options} data={data} width={"100%"} height={"100%"} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3} md={3} lg={3.08} xl={3.16} sx={{ width: "100%", height: "100%", backgroundColor: "#F5F5F5", padding: "10px" }}>
            <Grid container sx={{ width: "100%", height: "100%" }}>
              <Grid item xs={12} sx={{ width: "100%", height: "25%" }}>
                <Typography
                  sx={{
                    fontSize: "1em",
                    fontWeight: "bolder",
                    fontFamily: "'SF Pro Display', sans-serif",
                  }}
                >
                  Getting Started
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontSize: "0.8em",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  Tutorials and Guides
                </Typography>
              </Grid>
              <CustomTooltip
                open={tooltipId === 3 ? true : false}
                onOpen={handleOpen}
                onClose={handleClose}
                title={
                  <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                    <Typography>New to ML? These guides provide step-by-step
                      introductions to the world of AutoML.</Typography>
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(2)}>PREVIOUS</Button>
                      <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(4)}>NEXT</Button>
                    </Box>
                  </Box>
                }
                placement="bottom-start"
                arrow
              >
                <Grid sx={{ width: "100%" }}>
                  <Grid item xs={12} sx={{ width: "100%", height: "33%" }}>
                    <Grid item width="100%" display="flex" justifyContent="space-between">
                      <Box display="flex" width="70%">
                        <Grid item>
                          <Avatar sx={{ bgcolor: "#1A97F5" }}><BookmarkBorderOutlinedIcon /></Avatar>
                        </Grid>
                        <Grid item sx={{ padding: "5px 0px 0px 8px" }} zeroMinWidth>
                          <Typography
                            sx={{
                              fontFamily: "'SF Pro Display', sans-serif",
                              fontSize: "0.8rem",
                              fontWeight: "500",
                              color: "black",
                            }}
                            noWrap
                          >
                            {"What is Machine Learning (ML)?"}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "'SF Pro Display', sans-serif",
                              fontSize: "0.7rem",
                              fontWeight: "500",
                              color: "black",
                            }}
                            noWrap
                          >
                            Introduction to ML Basics
                          </Typography>
                        </Grid>
                      </Box>
                      <Grid item >
                        <Button
                          variant="contained"
                          color="inherit"
                          margin="dense"
                          size="small"
                          sx={{ borderRadius: "15px", fontSize: "0.7em", backgroundColor: "white", marginTop: "3px" ,fontFamily: "'SF Pro Display', sans-serif", }}
                          component="a"
                          href="https://app.gitbook.com/o/zdPfAuEYtpcuOflHlZr8/s/6YN5g2XG7tUO55uaWKUE/fundamentals/what-is-machine-learning" // Replace with your desired URL
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open
                        </Button>
                      </Grid>
                    </Grid>
                    <Divider sx={{ marginTop: "4px", backgroundColor: "#D3D3D3" }} />
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "33%" }}>
                    <Grid item width="100%" display="flex" justifyContent="space-between">
                      <Box display="flex" width="70%">
                        <Grid item >
                          <Avatar sx={{ bgcolor: "#1A97F5" }}><BookmarkBorderOutlinedIcon /></Avatar>
                        </Grid>
                        <Grid item sx={{ padding: "5px 0px 0px 8px" }} zeroMinWidth>
                          <Typography
                            sx={{
                              fontFamily: "'SF Pro Display', sans-serif",
                              fontSize: "0.8rem",
                              fontWeight: "500",
                              color: "black",
                            }}
                            noWrap
                          >
                            {"What is AutoML?"}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "'SF Pro Display', sans-serif",
                              fontSize: "0.7rem",
                              fontWeight: "500",
                              color: "black",
                            }}
                            noWrap
                          >
                            {"Introduction to AutoML"}
                          </Typography>
                        </Grid>
                      </Box>
                      <Grid item >
                        <Button
                          variant="contained"
                          color="inherit"
                          margin="dense"
                          size="small"
                          sx={{ borderRadius: "15px", fontSize: "0.7em", backgroundColor: "white", marginTop: "3px", fontFamily: "'SF Pro Display', sans-serif", }}                          
                          component="a"
                          href="https://app.gitbook.com/o/zdPfAuEYtpcuOflHlZr8/s/6YN5g2XG7tUO55uaWKUE/fundamentals/what-is-automl" // Replace with your desired URL
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open
                        </Button>
                      </Grid>
                    </Grid>
                    <Divider sx={{ marginTop: "4px", backgroundColor: "#D3D3D3" }} />
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "33%" }}>
                    <Grid item width="100%" display="flex" justifyContent="space-between">
                      <Box display="flex" width="70%">
                        <Grid item >
                          <Avatar sx={{ bgcolor: "#1A97F5" }}><BookmarkBorderOutlinedIcon /></Avatar>
                        </Grid>
                        <Grid item sx={{ padding: "5px 0px 0px 8px" }} zeroMinWidth>
                          <Typography
                            sx={{
                              fontFamily: "'SF Pro Display', sans-serif",
                              fontSize: "0.8rem",
                              fontWeight: "500",
                              color: "black",
                            }}
                            noWrap
                          >
                            Regression or Classification?
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "'SF Pro Display', sans-serif",
                              fontSize: "0.7rem",
                              fontWeight: "500",
                              color: "black",
                            }}
                            noWrap
                          >
                            Identifying the Learning Task
                          </Typography>
                        </Grid>
                      </Box>
                      <Grid item >
                        <Button
                          variant="contained"
                          color="inherit"
                          margin="dense"
                          size="small"
                          sx={{ borderRadius: "15px", fontSize: "0.7em", backgroundColor: "white", marginTop: "3px" ,fontFamily: "'SF Pro Display', sans-serif", }}
                          component="a"
                          href="https://app.gitbook.com/o/zdPfAuEYtpcuOflHlZr8/s/6YN5g2XG7tUO55uaWKUE/fundamentals/regression-or-classification" // Replace with your desired URL
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open
                        </Button>
                      </Grid>
                    </Grid>
                    <Divider sx={{ marginTop: "4px", backgroundColor: "#D3D3D3" }} />
                  </Grid>
                </Grid>
              </CustomTooltip>
            </Grid>
          </Grid>
          <Grid item xs={3} md={3} lg={2.75} xl={2.5} sx={{ width: "100%", height: "100%", padding: "10px" }}>
            <Paper sx={{ width: "100%", height: "100%", backgroundColor: "#344455", borderRadius: "20px", padding: "20px" }}>
              <Grid container sx={{ width: "100%", height: "100%" }}>
                <Grid item xs={12} sx={{ width: "100%", height: "25%" }}>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      fontFamily: "'SF Pro Display', sans-serif",
                      color: "white"
                    }}
                  >
                    Model Types
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'SF Pro Display', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                      color: "white"
                    }}
                  >
                    Classification vs Regression
                  </Typography>
                </Grid>
                <Grid item width="100%" height="90%" display="flex" alignItems="center" justifyContent="space-between" paddingBottom="10px" sx={{}}>
                  <Grid item xs={5} width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
                    {/* <Paper sx={{
                    position:'absolute',
                    top:'20px',
                    left: "10px",
                    paddingTop:'10px',
                    borderRadius:'50%', backgroundColor:'white', width:'80%',height:'75%'}}>
                  </Paper> */}
                    <Doughnut data={cdata} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                  </Grid>
                  <Grid item xs={7} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Box
                      width="fit-content"
                      display="flex"
                      flexDirection="column"
                      gap="1em"
                    >
                      <Box 
                        width="fit-content"
                        display="flex"
                        flexDirection="row"
                        sx={{alignItems: 'center',}}
                        >
                      <Box                        
                          sx={{
                            width: '7px', // Diameter of the circle
                            height: '7px',
                            backgroundColor: "#EAA349", // Same color as the text for this row
                            borderRadius: '50%', // Makes it a circle
                            marginRight: { xl: "10px", lg: "9x", md: "8px" }, // Spacing between circle and text
                          }}
                        />
                      <Typography
                        sx={{
                          fontFamily: "'SF Pro Display', sans-serif",
                          fontSize: { xl: "14px", lg: "12px", md: "10px" },
                          fontWeight: "500",
                          color: "white",
                          textAlign: "right",
                          marginRight: { xl: "10px", lg: "9x", md: "8px" },
                        }}
                      >
                        Classification: {clasPercent}%
                      </Typography>                      
                      </Box>
                      <Box 
                        width="fit-content"
                        display="flex"
                        flexDirection="row"
                        sx={{alignItems: 'center',}}
                        >
                        <Box                        
                            sx={{
                              width: '7px', // Diameter of the circle
                              height: '7px',
                              backgroundColor: "#1A97F5", // Same color as the text for this row
                              borderRadius: '50%', // Makes it a circle
                              marginRight: { xl: "10px", lg: "9x", md: "8px" }, // Spacing between circle and text
                            }}
                          />
                        <Typography
                          sx={{
                            fontFamily: "'SF Pro Display', sans-serif",
                            fontSize: { xl: "14px", lg: "12px", md: "10px" },
                            fontWeight: "500",
                            color: "white",
                            textAlign: "right"
                          }}
                        >
                          Regression: {regPercent}%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid >
      <Grid item xs={9} md={9} lg={9.25} xl={9.5} sx={{ width: "100%", height: "740px", backgroundColor: "#F5F5F5" }}>
        <Grid container sx={{ width: "100%", height: "100%" }}>
          <Grid item xs={12} sx={{ width: "100%", height: "150px" }}>
            <Grid container sx={{ width: "100%", height: "100%" }}>
              <Grid item xs={4} sx={{ height: "100%", padding: "10px"}}>
                <Paper sx={{ width: "100%", height: "100%", padding: "20px", backgroundColor: "#1A97F5", borderRadius: "20px" }}>
                  <Grid container sx={{ width: "100%", height: "100%", alignItems: "center", }}>
                    <Grid item xs={12} sx={{ width: "100%", height: "20%" }}>
                      <Grid container>
                        <Grid item xs={10}>
                          <Typography
                            sx={{
                              fontFamily: "'SF Pro Display', sans-serif",
                              fontSize: ".9rem",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            Models Created
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Avatar alt="1" src="/img/1.png" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ width: "100%", height: "60%" }}>
                      <Typography
                        sx={{
                          fontFamily: "'SF Pro Display', sans-serif",
                          fontSize: "2.5em",
                          fontWeight: "700",
                          color: "white",
                        }}
                      >
                        {rows.length}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ width: "100%", height: "20%" }}>
                      <Typography
                        sx={{
                          fontFamily: "Open Sans",
                          fontSize: "0.7rem",
                          fontWeight: "500",
                          color: "white",
                        }}
                      >
                        All completed & saved models
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={4} sx={{ height: "100%", padding: "10px" }}>
                <Paper sx={{ width: "100%", height: "100%", padding: "20px", borderRadius: "20px" }}>
                  <Grid container sx={{ width: "100%", height: "100%", alignItems: "center", }}>
                    <Grid item xs={12} sx={{ width: "100%", height: "20%" }}>
                      <Grid container>
                        <Grid item xs={10}>
                          <Typography
                            sx={{
                              fontFamily: "'SF Pro Display', sans-serif",
                              fontSize: "0.8rem",
                              fontWeight: "600",
                            }}
                          >
                            Model Average Score
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Avatar alt="2" src="/img/2.png" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ width: "100%", height: "60%" }}>
                      <Typography
                        sx={{
                          fontFamily: "'SF Pro Display', sans-serif",
                          fontSize: "2.5em",
                          fontWeight: "700"
                        }}
                      >
                        {calcAvgmark()}%
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ width: "100%", height: "20%" }}>
                      <Typography
                        sx={{
                          fontFamily: "'SF Pro Display', sans-serif",
                          fontSize: "0.75rem",
                          fontWeight: "500"
                        }}
                      >
                        Average score for all models
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={4} sx={{ height: "100%", padding: "10px" }}>
                <Paper sx={{ width: "100%", height: "100%", padding: "20px", borderRadius: "20px" }}>
                  <Grid container sx={{ width: "100%", height: "100%" , alignItems: "center", }}>
                    <Grid item xs={12} sx={{ width: "100%", height: "40%" }}>
                      <Grid container>
                        <Grid item xs={10}>
                          <Typography
                            sx={{
                              fontFamily: "'SF Pro Display', sans-serif",
                              fontSize: "0.8rem",
                              fontWeight: "600"
                            }}
                          >
                            Recently Used Algorithm
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Avatar alt="3" src="/img/3.png" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ width: "100%", height: "40%" }}>
                      <Typography
                        sx={{
                          fontFamily: "'SF Pro Display', sans-serif",
                          fontSize: "1.5em",
                          fontWeight: "700"
                        }}
                      >
                        {getRecentalgorithm()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ width: "100%", height: "20%" }}>
                      <Typography
                        sx={{
                          fontFamily: "'SF Pro Display', sans-serif",
                          fontSize: "0.75rem",
                          fontWeight: "500"
                        }}
                      >
                        Algorithm used in recent model
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ width: "100%", height: "590px", padding: "10px" }}>
            <Paper sx={{ width: "100%", height: "100%", padding: "20px", borderRadius: "20px" }}>
              <Grid container>
                <Grid item xs={12} sx={{ padding: "0 5px" }}>
                  <Grid container>
                    <Grid item xs={3} sx={{ textAlign: "left" }}>
                      <Typography
                        sx={{
                          fontSize: "1.4em",                          
                          marginTop: "5px",
                          fontFamily: "'SF Pro Display', sans-serif",
                          fontWeight: "bolder",
                        }}
                      >
                        Models
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: "right" }}>
                      <CustomTooltip
                        open={tooltipId === 5 ? true : false}
                        onOpen={handleOpen}
                        onClose={handleClose}
                        title={
                          <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                            <Typography>Click on the New Model button to begin developing a
                              machine learning model.</Typography>
                            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(4)}>PREVIOUS</Button>
                              <Button variant="contained" onClick={() => setTooltipId(6)}>OKAY</Button>
                            </Box>
                          </Box>
                        }
                        placement="left"
                        arrow
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          margin="dense"
                          size="medium"
                          sx={{ borderRadius: "12px", fontFamily: "'SF Pro Display', sans-serif", }}
                          onClick={() => setNewModelOpen(true)}
                        >
                          New Model
                        </Button>
                      </CustomTooltip>
                    </Grid>
                  </Grid>
                </Grid>
                <CustomTooltip
                  open={tooltipId === 4 ? true : false}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  title={
                    <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                      <Typography>Your model repository! Access, view, and manage your
                        models from this list.</Typography>
                      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(3)}>PREVIOUS</Button>
                        <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(5)}>NEXT</Button>
                      </Box>
                    </Box>
                  }
                  placement="top"
                  arrow
                >
                  <Grid item xs={12} sx={{ marginTop: "10px", padding: "5px" }}>
                    <TableComponent rows={rows} setPosts={setPosts} />
                  </Grid>
                </CustomTooltip>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid >
      <Grid item xs={3} md={3} lg={2.75} xl={2.5} sx={{ width: "100%", height: "740px", backgroundColor: "#F5F5F5" }}>
        <CustomTooltip
          open={tooltipId === 30 ? true : false}
          onOpen={handleOpen}
          onClose={handleClose}
          title={
            <Box padding="10px" display="flex" flexDirection="column" gap="10px">
              <Typography>New to ML? These guides provide step-by-step
                introductions to the world of AutoML.</Typography>
              <Box style={{ textAlign: "end" }}>
                <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(3)}>PREVIOUS</Button>
                <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(3)}>NEXT</Button>
              </Box>
            </Box>
          }
          placement="bottom-start"
          arrow
        >
          <Grid container sx={{ width: "100%", height: "100%" }}>
            <Grid item xs={12} sx={{ width: "100%", height: "33.3%", padding: "10px" }}>
              <Paper sx={{ width: "100%", height: "100%", padding: "20px", borderRadius: "20px" }}>
                <Grid container sx={{ width: "100%", height: "100%" }}>
                  <Grid item xs={12} sx={{ width: "100%", height: "15%" }}>
                    <Typography
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "0.8rem",
                        fontWeight: "500"
                      }}
                    >
                      Guides and Tutorials
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "30%" }}>
                    <Typography
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "1.1em",
                        fontWeight: "700"
                      }}
                    >
                      Video Tutorial: VisAutoML
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "10%" }}>
                    <Typography
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: "500"
                      }}
                    >
                      Topics Covered:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "25%" }}>
                    <Box
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: "500"
                      }}
                    >
                      <Chip label="ML Pipeline" sx={{ fontFamily: "'SF Pro Display', sans-serif",borderRadius: "4px" }}/> <Chip label="AutoML" sx={{ fontFamily: "'SF Pro Display', sans-serif",borderRadius: "4px" }} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "20%", textAlign: "center" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      margin="dense"
                      size="medium"
                      sx={{ borderRadius: "5px", fontFamily: "'SF Pro Display', sans-serif" }}
                      component="a"
                      href="https://app.gitbook.com/o/zdPfAuEYtpcuOflHlZr8/s/6YN5g2XG7tUO55uaWKUE/" // Replace with your desired URL
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Play Video
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} sx={{ width: "100%", height: "33.4%", padding: "10px" }}>
              <Paper sx={{ width: "100%", height: "100%", padding: "20px", borderRadius: "20px" }}>
                <Grid container sx={{ width: "100%", height: "100%" }}>
                  <Grid item xs={12} sx={{ width: "100%", height: "15%" }}>
                    <Typography
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "0.8rem",
                        fontWeight: "500"
                      }}
                    >
                      Guides and Tutorials
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "30%" }}>
                    <Typography
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "1.1em",
                        fontWeight: "700"
                      }}
                    >
                      How to Understand Model Evaluation?
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "10%" }}>
                    <Typography
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: "500"
                      }}
                    >
                      Topics Covered:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "25%" }}>
                    <Box
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: "500"
                      }}
                    >
                      <Chip label="Shap" sx={{ fontFamily: "'SF Pro Display', sans-serif",borderRadius: "4px" }} /> <Chip label="ML Metrics" sx={{ fontFamily: "'SF Pro Display', sans-serif",borderRadius: "4px" }} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "20%", textAlign: "center" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="inherit"
                      margin="dense"
                      size="medium"
                      sx={{ borderRadius: "5px", fontFamily: "'SF Pro Display', sans-serif" }}
                      component="a"
                      href="https://app.gitbook.com/o/zdPfAuEYtpcuOflHlZr8/s/6YN5g2XG7tUO55uaWKUE/beginner-tips/how-to-evaluate-your-model" // Replace with your desired URL
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sx={{ width: "100%", height: "33.3%", padding: "10px" }}>
              <Paper sx={{ width: "100%", height: "100%", padding: "20px", borderRadius: "20px" }}>
                <Grid container sx={{ width: "100%", height: "100%" }}>
                  <Grid item xs={12} sx={{ width: "100%", height: "15%" }}>
                    <Typography
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "0.8rem",
                        fontWeight: "500"
                      }}
                    >
                      Guides and Tutorials
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "30%" }}>
                    <Typography
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "1.1em",
                        fontWeight: "700"
                      }}
                    >
                      How to Optimize Model Performance?
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "10%" }}>
                    <Typography
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: "500"
                      }}
                    >
                      Topics Covered:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "25%" }}>
                    <Box
                      sx={{
                        fontFamily: "'SF Pro Display', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: "500"
                      }}
                    >
                      <Chip label="Quality" sx={{ fontFamily: "'SF Pro Display', sans-serif",borderRadius: "4px" }}/> <Chip label="Preprocessing" sx={{ fontFamily: "'SF Pro Display', sans-serif",borderRadius: "4px" }}/>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%", height: "20%", textAlign: "center" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="inherit"
                      margin="dense"
                      size="medium"
                      sx={{ borderRadius: "5px", fontFamily: "'SF Pro Display', sans-serif" }}
                      component="a"
                      href="https://app.gitbook.com/o/zdPfAuEYtpcuOflHlZr8/s/6YN5g2XG7tUO55uaWKUE/beginner-tips/how-to-optimize-model-performance" // Replace with your desired URL
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </CustomTooltip>
      </Grid>

      <NewModelDialog
        open={newModelOpen}
        setOpen={setNewModelOpen}
        name={modelName}
        setName={setModelName}
        type={modelType}
        setType={setModelType}
        tooltipId={tooltipId}
        setTooltipId={setTooltipId}
      />
      <RegressDialog
        open={regressOpen}
        setOpen={setRegressOpen}
      />
      <ClassDialog
        open={classifyOpen}
        setOpen={setclassOpen}
      />
      <TutorialDialog
        open={tutorialOpen}
        setOpen={setTutorial}
      />
      <VideoDialog
        open={videoDialogOpen}
        setOpen={setVideoDialogOpen}
        title={videoTitle}
        url={videoUrl}
      />
      <DeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} />
      <WelcomeDialog open={tooltipId === -3} setOpen={setTooltipId} />
    </Grid >
  );
};

export default Body;