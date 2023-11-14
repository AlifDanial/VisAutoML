import { Box, Grid, Button, Card, Divider, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewModelDialog from "./NewModelDialog";
import RegressDialog from "./RegressDialog";
import ClassDialog from "./ClassDialog";
import VideoDialog from "./VideoDialog";
import DeleteDialog from "./DeleteDialog";
import newModel from "../../static/images/newModel.png";
import forecast from "../../static/images/forecast.png";
import onlinevideo from "../../static/images/online-video.png";
import classifier from "../../static/images/open-door.png";
import { useState } from "react";
import TableComponent from "./Table";
import TutorialDialog from "./TutorialDialog";
import "../../App.css";


const Body = () => {
  const [newModelOpen, setNewModelOpen] = useState(false);
  const [regressOpen, setRegressOpen] = useState(false);
  const [classifyOpen, setclassOpen] = useState(false);
  const [tutorialOpen, setTutorial] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [modelName, setModelName] = useState("");
  const [modelType, setModelType] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const onOpenTutorial = (title, url) => {
    setVideoTitle(title);
    setVideoUrl(url);
    setVideoDialogOpen(true);
  };  

  return (
    <Grid container className="main"
      sx={{
        flex: 1,
        backgroundColor: "lightgrey",
        overflowX: "hidden",
        overflowY: "auto"
      }}
    >
      <Grid item xs={12}>
        <Grid container sx={{padding: "20px", borderBottom: "1px solid black"}}>
          <Grid item xs={3} sx={{textAlign: "center"}}>
            <Typography
              sx={{
                color: "#000000",
                fontWeight: "bolder",
                margin: "0 0 0.5em 0",
                fontFamily: "Open Sans",
                fontSize: "1.5rem",
                textAlign: "center"
              }}
            >
              Home
            </Typography>
            <Box>
              <Card
                elevation={4}
                sx={{
                  width: "90%",
                  height: "13em",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                }}
                onClick={() => setNewModelOpen(true)}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={newModel} style={{ height: "7em" }} />
                </Box>
                <Button
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "#1a97f5",
                    fontWeight: "bold",
                    fontFamily: "Open Sans",
                    borderRadius: "0",
                    "&:hover": {
                      backgroundColor: "#1a97f5",
                      color: "#ffffff",
                    },
                  }}
                  onClick={() => setNewModelOpen(true)}
                >
                  New Model
                </Button>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={9} sx={{borderLeft: "1px solid black"}}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: "#000000",
                    fontWeight: "bolder",
                    fontSize: "1.5rem",
                    margin: "0 0 0.5em 0",
                    fontFamily: "Open Sans",
                    textAlign: "center"
                  }}
                >
                  How it works
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container sx={{paddingLeft: "35px"}}>
                  <Grid item xs={4}>
                    <Card
                      elevation={4}
                      sx={{
                        width: "90%",
                        height: "13em",
                        backgroundColor: "#ffffff",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setRegressOpen(true)}
                    >
                        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                          <img src={forecast} style={{ height: "6em" }} />
                        </Box>
                      <Button
                        fullWidth
                        onClick={() => setRegressOpen(true)}
                        sx={{
                          color: "#ffffff",
                          backgroundColor: "#1a97f5",
                          fontWeight: "bold",
                          fontFamily: "Open Sans",
                          borderRadius: "0",
                          "&:hover": {
                            backgroundColor: "#1a97f5",
                            color: "#ffffff",
                          },
                        }}
                      >
                        Regression
                      </Button>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card
                      elevation={4}
                      sx={{
                        width: "90%",
                        height: "13em",
                        backgroundColor: "#ffffff",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setclassOpen(true)}
                    >
                      <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                        <img src={classifier} style={{ height: "6em" }} />
                      </Box>
                      <Button
                        fullWidth
                        onClick={() => setclassOpen(true)}
                        sx={{
                          color: "#ffffff",
                          backgroundColor: "#1a97f5",
                          fontWeight: "bold",
                          fontFamily: "Open Sans",
                          borderRadius: "0",
                          "&:hover": {
                            backgroundColor: "#1a97f5",
                            color: "#ffffff",
                          },
                        }}
                      >
                        Classification
                      </Button>
                    </Card>
                  </Grid>

                  <Grid item xs={4}>
                    <Card
                      elevation={4}
                      sx={{
                        width: "90%",
                        height: "13em",
                        backgroundColor: "#ffffff",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setTutorial(true)}
                    >
                        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                          <img src={onlinevideo} style={{ height: "6em" }} />
                        </Box>
                      <Button
                        fullWidth
                        onClick={() => setTutorial(true)}
                        sx={{
                          color: "#ffffff",
                          backgroundColor: "#1a97f5",
                          fontWeight: "bold",
                          fontFamily: "Open Sans",
                          borderRadius: "0",
                          "&:hover": {
                            backgroundColor: "#1a97f5",
                            color: "#ffffff",
                          },
                        }}
                      >
                        Tutorial
                      </Button>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{padding: "20px"}}>
          <Grid item xs={12}>
            <Typography
              sx={{
                color: "#000000",
                fontWeight: "bolder",
                fontSize: "1.5rem",
                margin: "0em 0 0.5em 0",
                fontFamily: "Open Sans",
                textAlign: "center"
              }}
            >
              Models
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableComponent setOpen={setDeleteDialogOpen} />
          </Grid>
        </Grid>
      </Grid>
      <NewModelDialog
        open={newModelOpen}
        setOpen={setNewModelOpen}
        name={modelName}
        setName={setModelName}
        type={modelType}
        setType={setModelType}
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
    </Grid>
  );
};

export default Body;