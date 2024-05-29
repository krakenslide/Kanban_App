const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {
  onDocumentCreated,
  onDocumentDeleted,
} = require("firebase-functions/v2/firestore");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { initializeApp } = require("firebase-admin/app");

initializeApp();

exports.createdBoardData = onDocumentCreated(
  "users/{uid}/boards/{boardId}",
  async (event) => {
    const { uid, boardId } = event.params;

    const firestore = getFirestore();

    return await firestore.doc(`users/${uid}/boardsData/${boardId}`).set({
      tabs: {
        todos: [],
        inProgress: [],
        completed: [],
      },
      lastUpdated: FieldValue.serverTimestamp(),
    });
  },
);

exports.deleteBoardData = onDocumentDeleted(
  "users/{uid}/boards/{boardId}",
  async (event) => {
    const { uid, boardId } = event.params;
    const firestore = getFirestore();

    return await firestore.doc(`users/${uid}/boardsData/${boardId}`).delete();
  },
);
