import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Api/Api";

/* ================= CREATE STORY ================= */

export const createImpactStory = createAsyncThunk(
  "impact/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/impact/impact", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

/* ================= FETCH STORIES ================= */

export const fetchImpactStories = createAsyncThunk(
  "impact/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/impact/impact");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

/* ================= PUBLISH TOGGLE ================= */

export const togglePublishStory = createAsyncThunk(
  "impact/publish",
  async ({ id, isPublished }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/impact/impact/${id}/publish`, { isPublished });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

/* ================= UPDATE STORY ================= */

export const updateImpactStory = createAsyncThunk(
  "impact/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      // Don't set Content-Type manually — axios sets the correct
      // multipart boundary automatically when the body is FormData.
      const res = await api.put(`/impact/impact/${id}`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

/* ================= DELETE ================= */

export const deleteImpactStory = createAsyncThunk(
  "impact/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/impact/impact/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const impactSlice = createSlice({
  name: "impact",
  initialState: {
    stories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* CREATE */
      .addCase(createImpactStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createImpactStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories.unshift(action.payload);
      })
      .addCase(createImpactStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH */
      .addCase(fetchImpactStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImpactStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(fetchImpactStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE */
      .addCase(updateImpactStory.fulfilled, (state, action) => {
        const index = state.stories.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.stories[index] = action.payload;
      })
      .addCase(updateImpactStory.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* PUBLISH */
      .addCase(togglePublishStory.fulfilled, (state, action) => {
        const i = state.stories.findIndex((s) => s._id === action.payload._id);
        if (i !== -1) state.stories[i] = action.payload;
      })
      .addCase(togglePublishStory.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteImpactStory.fulfilled, (state, action) => {
        state.stories = state.stories.filter((s) => s._id !== action.payload);
      })
      .addCase(deleteImpactStory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default impactSlice.reducer;