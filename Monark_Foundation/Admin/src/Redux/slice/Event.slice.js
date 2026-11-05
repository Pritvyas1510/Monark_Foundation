import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Api/Api";

/* =======================
   CREATE EVENT
======================= */
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/event/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.event;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* =======================
   FETCH ALL EVENTS
======================= */
export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/event");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* =======================
   FETCH SINGLE EVENT (for the update form)
======================= */
export const fetchEventById = createAsyncThunk(
  "event/fetchEventById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/event/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* =======================
   UPDATE EVENT
======================= */
export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/event/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.event;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* =======================
   UPDATE EVENT STATUS (quick Draft / Published / Cancelled / Completed toggle)
======================= */
export const updateEventStatus = createAsyncThunk(
  "event/updateEventStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const fd = new FormData();
      fd.append("status", status);
      const res = await api.put(`/event/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.event;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* =======================
   DELETE EVENT
======================= */
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/event/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    currentEvent: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH ALL */
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
      })

      /* FETCH SINGLE */
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CREATE */
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload);
      })

      /* UPDATE */
      .addCase(updateEvent.fulfilled, (state, action) => {
        const idx = state.events.findIndex((e) => e._id === action.payload._id);
        if (idx !== -1) state.events[idx] = action.payload;
        state.currentEvent = action.payload;
      })

      /* UPDATE STATUS (quick toggle) */
      .addCase(updateEventStatus.fulfilled, (state, action) => {
        const idx = state.events.findIndex((e) => e._id === action.payload._id);
        if (idx !== -1) state.events[idx] = action.payload;
        if (state.currentEvent?._id === action.payload._id) {
          state.currentEvent = action.payload;
        }
      })

      /* DELETE */
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
      });
  },
});

export const { clearCurrentEvent } = eventSlice.actions;
export default eventSlice.reducer;