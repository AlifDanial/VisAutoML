import React from 'react'
import { Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useReducer } from "react";
import { data } from "../data";
import produce from "immer";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from '@mui/material/Button';


const useStyles = makeStyles({
    root: {
      width: "125px",
      height: "62px",
      padding: "0px"
    },
    switchBase: {
      color: "#818181",
      padding: "1px",
      "&$checked": {
        "& + $track": {
          backgroundColor: "#23bf58"
        }
      }
    },
    thumb: {
      color: "white",
      width: "56px",
      height: "56px",
      margin: "2px"
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
        top: "19px"
      },
      "&:after": {
        content: "'Auto'",
        left: "19px"
      },
      "&:before": {
        content: "'Manual'",
        right: "6px"
      }
    },
    checked: {
      color: "#23bf58 !important",
      transform: "translateX(62px) !important"
    }
  });

  const dragReducer = produce((draft, action) => {
    switch (action.type) {
      case "MOVE": {
        draft[action.from] = draft[action.from] || [];
        draft[action.to] = draft[action.to] || [];
        const [removed] = draft[action.from].splice(action.fromIndex, 1);
        draft[action.to].splice(action.toIndex, 0, removed);
      }
    }
  });

const ModelDev = () => {

    const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [dragged, dispatch] = useReducer(dragReducer, {
    items: data,
  });

  const onDragEnd = useCallback((result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      dispatch({
        type: "MOVE",
        from: result.source.droppableId,
        to: result.destination.droppableId,
        fromIndex: result.source.index,
        toIndex: result.destination.index,
      });
    }
  }, []);

  const styles = {
    dragger: `px-4 py-4 my-2 transition-colors duration-150 ease-in-out bg-white rounded-lg shadow hover:bg-gray-100`,
    dropper: `w-auto px-4 min-w-1/4 max-w-1/2`,
    draggerContent: `flex items-center space-x-3 text-lg`,
    draggerIcon: `inline-flex items-center justify-center rounded-full p-1.5 text-white bg-teal-100 text-teal-700`,
    dragging: `bg-gray-200 rounded-xl`,
    dropOver: `bg-gray-200`,
  };


  return (
    <div> 
        <div className='mb-7 min-w-max min-h-max flex flex-wrap lg:flex-nowrap justify-left '>
        <div className="m-2 min-w-max md:mt-0 ml-10 p-2 md:pl-10 pt-4 pb-10 pr-10 bg-white" >
            {/* <Header category="Home" title="Create New Model" /> */}
                <p className='ml-11 mt-7 text-xl font-extrabold tracking-tight text-slate-900 '>
                    ML Learning Algorithm
                </p>
                    <div className='m-2 mt-3 ml-24 mb-6'>
                    <Switch
                    classes={{
                    root: classes.root,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked
                    }}
                    checked={state.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                    </div>
                    <Divider />
                    <div className='mt-6 ml-5'>
                        <FormControl sx={{ m: 1, minWidth: 250 }}>                  
                            <Select
                                // labelId="demo-simple-select-helper-label"
                                // id="demo-simple-select-helper"
                                // value={age}
                                // label="Learning Task"
                                // onChange={handleChange}
                                displayEmpty
                            >
                                
                                <MenuItem value={10}>Classification</MenuItem>
                                <MenuItem value={20}>Regression</MenuItem>
                            </Select>
                        {/* <FormHelperText>With label + helper text</FormHelperText> */}
                        </FormControl>
                    </div>
                    

        </div>
        <div className="w-3/4 md:mt-0 ml-2 md:pl-10 pt-4 pb-10 pr-10 " >
            <div className='flex flex-wrap lg:flex-nowrap justify-left '>
            {/* <Header category="Home" title="Create New Model" /> */}
            <p className='mt-7 mb-5 text-2xl font-extrabold tracking-tight text-slate-900'>
                Inputs
            </p>
            </div>

            <div className='mb-7 flex flex-wrap lg:flex-nowrap'>
          <DragDropContext onDragEnd={onDragEnd}>

        <div className=' w-80  p-2 pb-10 mr-3 '>
          <div className=' mb-3 w-80 min-h-max md:mt-0  p-2 md:pl-10 pt-4 pb-10   bg-white rounded-2xl'>
          <p className=' mb-5 text-xl font-extrabold tracking-tight text-slate-900 '>
                    Prediction Column
                </p>
          <Droppable droppableId="items" type="PERSON">
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={(
                    styles.dropper,
                    snapshot.isDraggingOver && styles.dropOver
                  )}
                >
                  {dragged.items?.map((person, index) => {
                    return (
                      <Draggable
                        key={person.id}
                        draggableId={person.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={(
                                styles.dragger,
                                snapshot.isDragging && styles.dragging
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.draggerContent}>
                                {/* <img
                                  src={person.picture}
                                  className={styles.draggerIcon}
                                /> */}
                                <DragIndicatorIcon />
                                
                                <span>
                                  {person.name.first} {person.name.last}
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          </div>
          
          <div className='mb-3 w-80 min-h-max md:mt-0  p-2 md:pl-10 pt-4 pb-10   bg-white rounded-2xl'>
          <p className=' mb-5 text-xl font-extrabold tracking-tight text-slate-900 '>
                    ID Column
                </p>
          <Droppable droppableId="items2" type="PERSON">
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={(
                    styles.dropper,
                    snapshot.isDraggingOver && styles.dropOver
                  )}
                >
                  {dragged.items2?.map((person, index) => {
                    return (
                      <Draggable
                        key={person.id}
                        draggableId={person.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={(
                                styles.dragger,
                                snapshot.isDragging && styles.dragging
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.draggerContent}>
                                {/* <img
                                  src={person.picture}
                                  className={styles.draggerIcon}
                                /> */}
                                <DragIndicatorIcon />
                                <span>
                                  {person.name.first} {person.name.last}
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          </div>

          <div className='mb-3 w-80 min-h-max md:mt-0  p-2 md:pl-10 pt-4 pb-10   bg-white rounded-2xl'>
          <p className=' mb-5 text-xl font-extrabold tracking-tight text-slate-900 '>
                    Columns to not use
                </p>
          <Droppable droppableId="items3" type="PERSON">
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={(
                    styles.dropper,
                    snapshot.isDraggingOver && styles.dropOver
                  )}
                >
                  {dragged.items3?.map((person, index) => {
                    return (
                      <Draggable
                        key={person.id}
                        draggableId={person.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={(
                                styles.dragger,
                                snapshot.isDragging && styles.dragging
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.draggerContent}>
                                 {/* <img
                                  src={person.picture}
                                  className={styles.draggerIcon}
                                /> */}
                                <DragIndicatorIcon />
                                <span>
                                  {person.name.first} {person.name.last}
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          </div>  
        </div>   

        <div className=' w-80  p-2 pb-10 '>
        <div className=' w-80 min-h-max md:mt-0 p-2 md:pl-10 pt-4 pb-10   bg-white rounded-2xl'>
        <p className=' mb-5 text-xl font-extrabold tracking-tight text-slate-900 '>
                    Columns to use
                </p>
          <Droppable droppableId="items4" type="PERSON">
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={(
                    styles.dropper,
                    snapshot.isDraggingOver && styles.dropOver
                  )}
                >
                  {dragged.items4?.map((person, index) => {
                    return (
                      <Draggable
                        key={person.id}
                        draggableId={person.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className={(
                                styles.dragger,
                                snapshot.isDragging && styles.dragging
                              )}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.draggerContent}>
                                 {/* <img
                                  src={person.picture}
                                  className={styles.draggerIcon}
                                /> */}
                                <DragIndicatorIcon />
                                <span>
                                  {person.name.first} {person.name.last}
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          </div>  
        </div>   
      </DragDropContext>
      </div>        

      <div className='mt-4 flex justify-end ...'>
                <Button variant="contained">
                    Contained
                </Button>
            </div>
        </div>
    </div>
    
    </div>
    
    
  )
}

export default ModelDev