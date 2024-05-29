import React, { useEffect, useState } from "react";
import CreateBoardModel from "./CreateBoardModel.jsx";
import BoardScreenNavBar from "./BoardScreenNavBar.jsx";
import { Grid, Stack } from "@mui/material";
import BoardCard from "./BoardCard.jsx";
import useApp from "../../hooks/UseApp.js";
import AppLoader from "../../components/Layout/AppLoader.jsx";
import useStore from "../../store.js";
import NoBoards from "./NoBoards.jsx";

function BoardsScreen() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { fetchBoards } = useApp();
  const { boards, areBoardsFetched } = useStore();
  useEffect(() => {
    if (!areBoardsFetched) fetchBoards(setLoading);
    else setLoading(false);
  }, []);
  if (loading) return <AppLoader />;
  return (
    <>
      <BoardScreenNavBar openModal={() => setShowModal(true)} />
      {showModal && <CreateBoardModel closeModal={() => setShowModal(false)} />}
      {!boards.length ? (
        <NoBoards />
      ) : (
        <Stack mt={5} px={3}>
          <Grid container spacing={4}>
            {boards.map((board) => (
              <BoardCard key={board.id} {...board} />
            ))}
          </Grid>
        </Stack>
      )}
    </>
  );
}

export default BoardsScreen;
