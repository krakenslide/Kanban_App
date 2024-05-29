import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc as firestoreDoc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
import useStore from "../store.js";

const useApp = () => {
  const {
    currentUser: { uid },
  } = getAuth();
  const boardsColRef = collection(db, `users/${uid}/boards`);
  const { boards, setBoards, addBoard, setToast } = useStore();
  const navigate = useNavigate();
  const createBoard = async ({ name, color }) => {
    try {
      const doc = await addDoc(boardsColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      addBoard({
        name,
        color,
        createdAt: new Date().toLocaleDateString(),
        id: doc.id,
      });
    } catch (error) {
      setToast("Error creating board.");
      throw error;
    }
  };

  const fetchBoard = async (boardId) => {
    try {
      const docRef = firestoreDoc(db, `users/${uid}/boardsData/${boardId}`);
      const doc = await getDoc(docRef);
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    } catch (error) {
      setToast("Error fetching board.");
      throw error;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const queryFirebase = await query(
        boardsColRef,
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(queryFirebase);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString("en-US"),
      }));
      setBoards(boards);
    } catch (error) {
      setToast("Error fetching boards.");
    } finally {
      if (setLoading) {
        setLoading(false);
      }
    }
  };

  const updateBoardData = async (boardId, tabs) => {
    try {
      const docRef = firestoreDoc(db, `users/${uid}/boardsData/${boardId}`);
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (error) {
      setToast("Error updating board.");
      throw error;
    }
  };

  // const deleteBoard = async (boardId) => {
  //   try {
  //     await runTransaction(db, async (transaction) => {
  //       const boardDocRef = firestoreDoc(db, `users/${uid}/boards/${boardId}`);
  //       const boardDataRef = firestoreDoc(
  //         db,
  //         `users/${uid}/boardsData/${boardId}`,
  //       );
  //       transaction.delete(boardDocRef);
  //       transaction.delete(boardDataRef);
  //     });
  //     const updatedBoards = boards.filter((board) => board.id !== boardId);
  //     setBoards(updatedBoards);
  //     navigate("/boards");
  //   } catch (error) {
  //     setToast("Error Deleting the board");
  //     throw error;
  //   }
  // };

  const deleteBoard = async (boardId) => {
    try {
      const boardDocRef = firestoreDoc(db, `users/${uid}/boards/${boardId}`);
      const boardDataRef = firestoreDoc(
        db,
        `users/${uid}/boardsData/${boardId}`,
      );

      // Delete the board document
      await deleteDoc(boardDocRef);

      // Optionally delete the related board data document
      await deleteDoc(boardDataRef);

      // Filter out the deleted board from the local state
      const updatedBoards = boards.filter((board) => board.id !== boardId);
      setBoards(updatedBoards);

      navigate("/boards");
    } catch (error) {
      setToast("Error deleting the board.");
      console.error("Error deleting the board:", error);
      throw error;
    }
  };

  return { createBoard, fetchBoards, fetchBoard, updateBoardData, deleteBoard };
};

export default useApp;
