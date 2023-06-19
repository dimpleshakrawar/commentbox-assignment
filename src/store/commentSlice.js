import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const counterSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment: (state, { payload }) => {
      state.push(payload);
    },

    addReply: (state, { payload }) => {
      const { commentId, commentData } = payload;
      const findObjectById = (data, id, comment) => {
        const foundObject = data.find((item) => item.id === id);

        if (foundObject) {
          foundObject.items.push(comment);
          return data;
        }

        const nestedItems = data.flatMap((item) => item.items || []);
        console.log(nestedItems, "nestedItemsaddreply");
        findObjectById(nestedItems, id, comment);
      };
      findObjectById(state, commentId, commentData);
    },

    editComment: (state, { payload }) => {
      const { commentId, editCommentData } = payload;

      const findObjectById = (data, id, editComment) => {
        const foundObject = data.find((item) => item.id === id);

        if (foundObject) {
          console.log(foundObject.items, "foundObject.items");
          return data;
        }

        const nestedItems = data.flatMap((item) => item.items || []);
        console.log(nestedItems, "nesteditemsedit");
        findObjectById(nestedItems, id, editComment);
      };
      findObjectById(state, commentId, editCommentData);
    },

    deleteComment: (state, { payload: { commentId } }) => {
      const findObjectById = (data, id) => {
        const foundIndex = data.findIndex((item) => item.id === id);

        if (foundIndex !== -1) {
          data.splice(foundIndex, 1);
          return true;
        }

        for (const item of data) {
          if (item.items && item.items.length > 0) {
            const nestedData = findObjectById(item.items, id);
            if (nestedData) {
              return true;
            }
          }
        }
        return false;
      };
      findObjectById(state, commentId);
    },
  },
});

export const { addComment, addReply, editComment, deleteComment } =
  counterSlice.actions;

export default counterSlice.reducer;
