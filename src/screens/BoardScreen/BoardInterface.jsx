import React, { useCallback, useState } from "react";
import { Grid } from "@mui/material";
import BoardTab from "./BoardTab.jsx";
import AddTaskModel from "./AddTaskModel.jsx";
import useApp from "../../hooks/UseApp.js";
import useStore from "../../store.js";
import { DragDropContext } from "react-beautiful-dnd";
import ShiftTaskModel from "./ShiftTaskModel.jsx";

export const statusMap = {
  todos: "To do",
  inProgress: "In Progress",
  completed: "Completed",
};

function BoardInterface({ boardData, boardId, updateLastUpdated }) {
  const [loading, setLoading] = useState(false);
  const [shiftTask, setShiftTask] = useState(null);
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(structuredClone(boardData));
  const [editName, setEditName] = useState("");
  const { updateBoardData } = useApp();
  const { setToast } = useStore();

  const handleOpenAddTaskModel = useCallback(
    (status) => setAddTaskTo(status),
    [],
  );

  const handleOpenShiftTaskModel = useCallback(
    (task) => setShiftTask(task),
    [],
  );

  const updateTabsAndBackend = async (updatedTabs) => {
    setTabs(updatedTabs);
    try {
      setLoading(true);
      await updateBoardData(boardId, updatedTabs);
      updateLastUpdated();
      setToast("Board has been updated.");
    } catch (error) {
      console.error(error);
      setTabs(tabs); // Revert to previous state on error
    } finally {
      setLoading(false);
    }
  };

  const handleShiftTask = async (newStatus) => {
    const dClone = structuredClone(tabs);
    const oldStatus = shiftTask.status;
    if (newStatus === oldStatus) {
      setShiftTask(null);
      return;
    }
    const [task] = dClone[oldStatus].splice(shiftTask.index, 1);
    dClone[newStatus].unshift(task);
    try {
      await updateTabsAndBackend(dClone);
      setShiftTask(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleAddTask = async (text) => {
  //   if (!text.trim()) return setToast("Task cannot be empty!");
  //   const newTask = { text, id: crypto.randomUUID() };
  //
  //   setTabs((prevTabs) => {
  //     const updatedTabs = structuredClone(prevTabs);
  //     updatedTabs[addTaskTo].unshift(newTask);
  //     return updatedTabs;
  //   });
  //
  //   try {
  //     setLoading(true);
  //     await updateBoardData(boardId, {
  //       ...tabs,
  //       [addTaskTo]: [newTask, ...tabs[addTaskTo]],
  //     });
  //     updateLastUpdated();
  //     setAddTaskTo("");
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAddTask = async (text) => {
    if (!text.trim()) return setToast("Task cannot be empty!");
    const newTask = { text, id: crypto.randomUUID() };

    const updatedTabs = structuredClone(tabs);
    updatedTabs[addTaskTo].unshift(newTask);
    await updateTabsAndBackend(updatedTabs);
    setAddTaskTo("");
  };

  // const handleRemoveTask = useCallback(
  //   async (tab, taskId) => {
  //     const updatedTabs = structuredClone(tabs);
  //     const taskIdx = updatedTabs[tab].findIndex((t) => t.id === taskId);
  //     if (taskIdx !== -1) {
  //       updatedTabs[tab].splice(taskIdx, 1);
  //       setTabs(updatedTabs);
  //
  //       try {
  //         setLoading(true);
  //         await updateBoardData(boardId, updatedTabs);
  //         updateLastUpdated();
  //       } catch (error) {
  //         console.log(error);
  //         setTabs(tabs);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   },
  //   [tabs, updateBoardData, boardId, updateLastUpdated],
  // );
  const handleRemoveTask = useCallback(
    async (tab, taskId) => {
      const updatedTabs = structuredClone(tabs);
      const taskIdx = updatedTabs[tab].findIndex((t) => t.id === taskId);
      if (taskIdx !== -1) {
        updatedTabs[tab].splice(taskIdx, 1);
        await updateTabsAndBackend(updatedTabs);
      }
    },
    [tabs, updateBoardData, boardId, updateLastUpdated],
  );
  // const handleDnd = async ({ source, destination }) => {
  //   if (!destination) return;
  //
  //   if (
  //     source.droppableId === destination.droppableId &&
  //     source.index === destination.index
  //   ) {
  //     return;
  //   }
  //   const dClone = structuredClone(tabs);
  //   const [draggedTask] = dClone[source.droppableId].splice(source.index, 1);
  //   dClone[destination.droppableId].splice(destination.index, 0, draggedTask);
  //   setTabs(dClone);
  //
  //   try {
  //     setLoading(true);
  //     await updateBoardData(boardId, dClone);
  //     updateLastUpdated();
  //   } catch (error) {
  //     console.error(error);
  //     setTabs(tabs);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleDnd = async ({ source, destination }) => {
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTabs = structuredClone(tabs);
    const [draggedTask] = updatedTabs[source.droppableId].splice(
      source.index,
      1,
    );
    updatedTabs[destination.droppableId].splice(
      destination.index,
      0,
      draggedTask,
    );
    await updateTabsAndBackend(updatedTabs);
  };
  return (
    <>
      {!!shiftTask && (
        <ShiftTaskModel
          shiftTask={handleShiftTask}
          task={shiftTask}
          onClose={() => setShiftTask(null)}
        />
      )}
      {!!addTaskTo && (
        <AddTaskModel
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo("")}
          addTask={handleAddTask}
          loading={loading}
        />
      )}
      <DragDropContext onDragEnd={handleDnd}>
        <Grid container px={4} mt={2} spacing={2}>
          {Object.keys(statusMap).map((status) => (
            <BoardTab
              key={status}
              tasks={tabs[status]}
              status={status}
              removeTask={handleRemoveTask}
              name={statusMap[status]}
              openAddTaskModel={handleOpenAddTaskModel}
              openShiftTaskModel={handleOpenShiftTaskModel}
            />
          ))}
        </Grid>
      </DragDropContext>
    </>
  );
}

export default BoardInterface;
