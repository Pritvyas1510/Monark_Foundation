import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Api/Api";

/* FETCH ADMIN STORIES */
export const fetchStories = createAsyncThunk("story/fetch", async () => {
  const res = await api.get("/stories");
  return res.data;
});

export const togglePublishStory = createAsyncThunk(
  "story/togglePublish",
  async ({ id, isPublished }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/stories/${id}`, { isPublished });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

/* CREATE */
export const createStory = createAsyncThunk(
  "story/create",
  async (formData) => {
    const res = await api.post("/stories", formData);
    return res.data;
  },
);

/* UPDATE */
export const updateStory = createAsyncThunk(
  "story/update",
  async ({ id, formData }) => {
    const res = await api.put(`/stories/${id}`, formData);
    return res.data;
  }
);


/* DELETE */
export const deleteStory = createAsyncThunk("/stories/delete", async (id) => {
  await api.delete(`/stories/${id}`);
  return id;
});

const storySlice = createSlice({
  name: "story",
  initialState: {
    stories: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchStories.fulfilled, (s, a) => {
        s.loading = false;
        s.stories = a.payload;
      })
      .addCase(togglePublishStory.fulfilled, (state, action) => {
        const index = state.stories.findIndex(
          (s) => s._id === action.payload._id,
        );
        if (index !== -1) {
          state.stories[index] = action.payload;
        }
      })

      .addCase(createStory.fulfilled, (s, a) => {
        s.stories.unshift(a.payload);
      })

      .addCase(updateStory.fulfilled, (s, a) => {
        const i = s.stories.findIndex((x) => x._id === a.payload._id);
        if (i !== -1) s.stories[i] = a.payload;
      })

      .addCase(deleteStory.fulfilled, (s, a) => {
        s.stories = s.stories.filter((x) => x._id !== a.payload);
      });
  },
});

export default storySlice.reducer;
