import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ================================
   FETCH PUBLIC STORIES (CLIENT)
================================ */

export const fetchTestimonials = createAsyncThunk(
  "testimonial/fetchPublic",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/stories/public");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load stories");
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    testimonials: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload || [];
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default testimonialSlice.reducer;
