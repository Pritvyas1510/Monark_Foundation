import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ================= FETCH PUBLISHED STORIES ================= */

export const fetchImpactStories = createAsyncThunk(
  "impact/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/impact/impact");
      return res.data;
    } catch {
      return rejectWithValue("Fetch failed");
    }
  },
);

const userImpactSlice = createSlice({
  name: "userImpact",
  initialState: {
    stories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default userImpactSlice.reducer;