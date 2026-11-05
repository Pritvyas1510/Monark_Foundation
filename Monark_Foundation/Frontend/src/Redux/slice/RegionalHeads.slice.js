import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* FETCH ALL SUB ADMINS */
export const fetchHeads = createAsyncThunk(
  "regionalHeads/fetchHeads",
  async () => {
    const res = await api.get("/member/regional-heads");
    return res.data;
  }
);

/* SEARCH HEADS */
export const searchHeads = createAsyncThunk(
  "regionalHeads/searchHeads",
  async (query) => {
    const res = await api.get(`/member/regional-heads/search?q=${query}`);
    return res.data;
  }
);

/* SEARCH SUGGESTIONS */
export const fetchSuggestions = createAsyncThunk(
  "regionalHeads/fetchSuggestions",
  async (query) => {
    const res = await api.get(
      `/member/regional-heads/suggestions?q=${query}`
    );
    return res.data;
  }
);

const RegionalHeadsSlice = createSlice({
  name: "regionalHeads",
  initialState: {
    heads: [],
    suggestions: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ALL HEADS */
      .addCase(fetchHeads.fulfilled, (state, action) => {
        state.heads = Array.isArray(action.payload) ? action.payload : [];
      })

      /* SEARCH HEADS */
      .addCase(searchHeads.fulfilled, (state, action) => {
        state.heads = Array.isArray(action.payload) ? action.payload : [];
      })

      /* SUGGESTIONS */
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = Array.isArray(action.payload)
          ? action.payload
          : [];
      });
  },
});

export default RegionalHeadsSlice.reducer;