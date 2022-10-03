import React from 'react'
import { Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';


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

const ModelDev = () => {

    const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
    <div className='mb-7 flex flex-wrap lg:flex-nowrap justify-left '>
        <div className="m-2 w-1/4 md:mt-0 ml-10 p-2 md:pl-10 pt-4 pb-10 pr-10 bg-white" >
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
        <div className="m-2 w-3/4 md:mt-0 ml-2 p-2 md:pl-10 pt-4 pb-10 pr-10 bg-white rounded-3xl" >
            <div className='mb-7 flex flex-wrap lg:flex-nowrap justify-left '>
            {/* <Header category="Home" title="Create New Model" /> */}
            <p className='mt-7 text-2xl font-extrabold tracking-tight text-slate-900'>
                Develop
            </p>
            </div>
        </div>
    </div>
    
  )
}

export default ModelDev