import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* =======================
   FETCH EVENTS (public — read only)
======================= */
export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/event");
      // Backend returns a plain array — the `.events` fallback is kept
      // in case an older/different endpoint ever wraps it.
      return res.data.events || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;