import React, { memo } from "react";
import {
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Task from "./Task.jsx";
import Droppable from "../../components/utils/StrictModeDroppable.jsx";

function BoardTab({
  name,
  tasks,
  status,
  openAddTaskModel,
  removeTask,
  openShiftTaskModel,
}) {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <Grid
          {...provided.droppableProps}
          ref={provided.innerRef}
          item
          sm={4}
          xs={12}
        >
          <Stack p={3} bgcolor="#000">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontWeight={400} variant="h6">
                {name}
              </Typography>
              <IconButton
                fontSize="small"
                size="small"
                onClick={() => openAddTaskModel(status)}
              >
                <PostAddIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2} mt={3}>
              {tasks.map((task, index) => (
                <Task
                  onClick={
                    isXs
                      ? () =>
                          openShiftTaskModel({
                            text: task.text,
                            index: index,
                            status: status,
                          })
                      : null
                  }
                  key={task.id}
                  text={task.text}
                  id={task.id}
                  index={index}
                  removeTask={() => removeTask(status, task.id)}
                />
              ))}
            </Stack>
            {provided.placeholder}
          </Stack>
        </Grid>
      )}
    </Droppable>
  );
}

export default memo(BoardTab);
