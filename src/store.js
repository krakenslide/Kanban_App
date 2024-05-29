import { create } from "zustand";

const store = (set) => ({
  loader: true,
  isLoggedIn: false,
  boards: [],
  areBoardsFetched: false,
  toastMessage: "",
  setToast: (toastMessage) => set({ toastMessage }, false, "setToast"),
  setBoards: (boards) =>
    set({ boards, areBoardsFetched: true }, false, "setBoards"),
  addBoard: (board) =>
    set((old) => ({ boards: [board, ...old.boards] }), false, "addBoard"),

  setLoginStatus: (status) =>
    set(
      {
        isLoggedIn: status,
        loader: false,
        boards: [],
        areBoardsFetched: false,
      },
      false,
      "setLoginStatus",
    ),
});
const useStore = create(store);
export default useStore;
