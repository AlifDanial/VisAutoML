import { Droppable, Draggable  } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import { Box, Icon, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { tooltipClasses } from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


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
    padding: '0.8rem',
    fontFamily: "'SF Pro Display', sans-serif",

  },
}));

const DraggableElement = ({ prefix, elements, id, tooltip }) => {
  return (
    <Box
      sx={{
        padding: "10px",
        borderRadius: "6px",
        backgroundColor: "#f3f4f7",
        
        }}
      >
      <Box
        sx={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
          <Typography
            sx={{ 
              padding:"0.2rem",
              fontWeight: 550, 
              fontFamily: "'SF Pro Display', sans-serif", 
              fontSize: { xl: "1.1rem", lg: "0.9rem", md: "0.8rem" },
            }}
          >
            {prefix}
          </Typography>        
          
          <HtmlTooltip
          placement="right" title={tooltip}>
              <HelpIcon fontSize="small" sx={{ color: "grey" }} />
          </HtmlTooltip>
      </Box>

<Droppable droppableId={`${id}`}>
  {(provided) => (
    <div
      {...provided.droppableProps}
      ref={provided.innerRef}
      style={{
        position: 'relative',
        padding: 4,
        ...(id === "Prediction Column" || id === "ID Column" || id === "Columns not to use"
          ? {              
              borderRadius: '8px',
              minHeight: 50,
              backgroundColor: '#fffffe', 
              border: id === "Prediction Column" && elements.length === 0 ? "1px dashed #bf0000" : "1px dashed gray",
            }
          : {}),
      }}
    >
      {elements.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps} // This applies the drag handle to the entire item
              style={{
                ...provided.draggableProps.style,
                display: 'flex', // Use flexbox to align items
                alignItems: 'center', // Center items vertically
                justifyContent: 'space-between', // Put space between the content and the icon
                padding: '10px', // Add some padding for aesthetics
                fontFamily: "'SF Pro Display', sans-serif",
                margin: '4px 0', // Add some margin between items
                height: '50px', // Increase the height of the list item
                backgroundColor: 'white', // Add a background color for the list items
                borderRadius: '4px', // Optional: if you want rounded corners
                border: '1px solid #ddd', // Optional: if you want borders around list items
              }}
            >
              {/* Your ListItem component or content */}
              {item.content}
              <DragIndicatorIcon />
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  )}
</Droppable>


    </Box>
  );
};

export default DraggableElement;
