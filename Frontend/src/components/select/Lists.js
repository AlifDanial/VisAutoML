import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import { withStyles } from "@mui/styles";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const styles = {
  tooltip: {
    fontSize: '30px',
  },
  MuiTooltip: {
    tooltip: {
      fontSize: '30px',
    },
  },
};

// Define the DraggableElementWithStyles outside of the Lists component
const DraggableElementWithStyles = withStyles({
  tooltip: {
  fontSize: '30px',
},
MuiTooltip: {
  tooltip: {
    fontSize: '30px',
  },
},})(DraggableElement);

const CustomTooltip = withStyles({
  tooltip: {
    minWidth: "450px",
    textAlign: "center",
  }
})(Tooltip);

const Lists = ({ columns, elements, setElements, tooltipId, setTooltipId }) => {
  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const handleOpen = () => { };

  const handleClose = () => { };


  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  useEffect(() => {
    let initialColumns = [];
    columns.map((column, index) =>
      initialColumns.push({
        id: index.toString(),
        prefix: "Columns to use",
        content: column,
      })
    );
    setElements({ ...elements, "Columns to use": initialColumns });
  }, [columns]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (
      (elements["Prediction Column"].length === 1 &&
        result.destination.droppableId === "Prediction Column") ||
      (elements["ID Column"].length === 1 &&
        result.destination.droppableId === "ID Column")
    ) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  return (
    
    <Box sx={{ margin: "1em 0 0 0" }}>
      <DragDropContext onDragEnd={onDragEnd}>
      
        <Box sx={{ display: "flex", gap: "3em" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "3em",
              width: "50%",
            }}
          >
            <CustomTooltip
              open={tooltipId === 28}
              onOpen={handleOpen}
              onClose={handleClose}
              title={
                <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                  <Typography>Select the target variable or the outcome you want your model to predict. This is the main focus of your analysis.</Typography>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(27)}>PREVIOUS</Button>
                    <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(29)}>NEXT</Button>
                  </Box>
                </Box>
              }
              placement="left"
              arrow
            >
              {/* Use a div with minimal styling */}
              <div style={{ display: 'inline-block', width: '100%' }}>
                <DraggableElementWithStyles
                  elements={elements["Prediction Column"]}
                  key={"Prediction Column"}
                  prefix={"Prediction Column*"}
                  tooltip="Column you are trying to predict. Example: Price, Stroke, Survived, and Spam"
                  id={"Prediction Column"}
                />
              </div>
            </CustomTooltip>

            <CustomTooltip
              open={tooltipId === 29 ? true : false}
              onOpen={handleOpen}
              onClose={handleClose}
              title={
                <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                  <Typography>Choose one column that contains unique identifiers for your data entries. These 
                are often used to track rows but shouldn't influence the model's predictions</Typography>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(28)}>PREVIOUS</Button>
                    <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(30)}>NEXT</Button>
                  </Box>
                </Box>
              }
              placement="left"
              arrow
            >
            <div style={{ display: 'inline-block', width: '100%' }}>
            <DraggableElementWithStyles
              elements={elements["ID Column"]}
              key={"ID Column"}
              id={"ID Column"}
              prefix={"ID Column"}
              tooltip="Unique Column for every row. Example: ID, Name, RowNumber"
            />
             </div>
            </CustomTooltip>
            <CustomTooltip
                open={(tooltipId === 30 || tooltipId === 31) ? true : false}
                onOpen={handleOpen}
                onClose={handleClose}
                title={
                  tooltipId === 30 ? (
                    <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                      <Typography>Omit columns that are irrelevant to the prediction like other unique IDs and timestamps to avoid data leakage.</Typography>
                      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(29)}>PREVIOUS</Button>
                        <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(31)}>NEXT</Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                      <Typography>{"Data leakage causes the model to learn from information it shouldn't have access to, leading to overfitting (model performs well on known data but poorly on unseen data)."}</Typography>
                      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(30)}>PREVIOUS</Button>
                        <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(32)}>NEXT</Button>
                      </Box>
                    </Box>
                  )
                }
                placement={tooltipId === 30 ? "left" : 'right'}
                arrow
            > 
            <div style={{ display: 'inline-block', width: '100%' }}>
            <DraggableElementWithStyles
              elements={elements["Columns not to use"]}
              key={"Columns not to use"}
              id={"Columns not to use"}
              prefix={"Column not to use"}
              tooltip="Irrelevant or unwanted columns. Example: Timestamp, URL, CreatedBy, Description"
            />
            </div>
            </CustomTooltip>
          </Box>
          <CustomTooltip
              open={tooltipId === 27 ? true : false}
              onOpen={handleOpen}
              onClose={handleClose}
              title={
                <Box padding="10px" display="flex" flexDirection="column" gap="10px">
                  <Typography>Fine-tune your model's input. Drag and drop columns to select 
                  which features to use, which to predict, and which to ignore.</Typography>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(26)}>PREVIOUS</Button>
                    <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(28)}>NEXT</Button>
                  </Box>
                </Box>
              }
              placement="top"
              arrow
            >
          <Box sx={{ width: "50%" }}>
          <DraggableElementWithStyles
              elements={elements["Columns to use"]}
              key={"Columns to use"}
              id={"Columns to use"}
              prefix={"Columns to use"}
              tooltip="Column(s) to include in the prediction"
            />
            </Box>
            </CustomTooltip>
          </Box>          
        </DragDropContext>
      </Box>
    
  );
};

export default Lists;
