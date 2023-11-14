import { Box } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

const ListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <Box
            sx={{
              padding: "10px",
              borderRadius: "6px",
              boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
              background: "white",
              margin: "0 0 8px 0",
              display: "grid",
              gridGap: "20px",
              flexDirection: "column",
              fontFamily: "'SF Pro Display', sans-serif",
            }}
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {item.content}
          </Box>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
