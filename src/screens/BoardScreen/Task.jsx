import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable } from "react-beautiful-dnd";

function Task({ id, text, removeTask, index, onClick }) {
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    removeTask();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Stack
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Typography
            p={1}
            width="100%"
            border="1px solid"
            borderColor="#733869"
            bgcolor="#1B001A"
            {...(!!onClick ? { onClick: onClick } : {})}
          >
            {text}
          </Typography>
          {/*<IconButton*/}
          {/*  onClick={handleDeleteClick}*/}
          {/*  onTouchStart={handleDeleteTouchStart}*/}
          {/*>*/}
          {/*  <DeleteIcon />*/}
          {/*</IconButton>*/}
          <div
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Stack>
      )}
    </Draggable>
  );
}

export default Task;
