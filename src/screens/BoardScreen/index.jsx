import React, { useCallback, useEffect, useMemo, useState } from "react";
import BoardScreenNavBar from "./BoardScreenNavBar.jsx";
import BoardInterface from "./BoardInterface.jsx";
import { useParams } from "react-router-dom";
import useStore from "../../store.js";
import useApp from "../../hooks/UseApp.js";
import AppLoader from "../../components/Layout/AppLoader.jsx";
import BoardNotReady from "./BoardNotReady.jsx";

function BoardScreen() {
  const { boardId } = useParams();
  const { boards } = useStore();
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const { deleteBoard, fetchBoard, fetchBoards } = useApp();
  const board = useMemo(() => boards.find((b) => b.id === boardId));
  const boardData = useMemo(() => data, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!boards.length) {
          setLoading(true);
          await fetchBoards();
        }
        await handleFetchBoard();
      } catch (error) {
        console.log("Error in fetching Boards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [boardId, boards, fetchBoards]);

  const handleDeleteBoard = useCallback(async () => {
    if (!window.confirm("Are you sure you want to delete the board.")) return;
    try {
      setLoading(true);
      await deleteBoard(boardId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFetchBoard = async () => {
    setLoading(true);
    try {
      if (!data) {
        const boardData = await fetchBoard(boardId);
        if (boardData) {
          const { lastUpdated, tabs } = boardData;
          setLastUpdated(lastUpdated.toDate().toLocaleString("en-US"));
          setData(tabs);
        }
      }
    } catch (error) {
      console.log("Error in fetching board:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLastUpdated = useCallback(
    () => setLastUpdated(new Date().toLocaleString("en-US")),
    [],
  );
  if (!board) return null;
  if (loading) {
    return <AppLoader />;
  }

  if (!data) return <BoardNotReady />;
  return (
    <>
      <BoardScreenNavBar
        name={board.name}
        color={board.color}
        lastUpdated={lastUpdated}
        deleteBoard={handleDeleteBoard}
      />
      <BoardInterface
        boardData={boardData}
        boardId={boardId}
        updateLastUpdated={handleUpdateLastUpdated}
      />
    </>
  );
}

export default BoardScreen;
