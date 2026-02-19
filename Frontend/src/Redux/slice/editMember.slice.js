import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ================= FIND MEMBER ================= */

export const findMemberByPhone = createAsyncThunk(
  "editMember/findByPhone",
  async (phone, { rejectWithValue }) => {
    try {
      const res = await api.get(`/member/phone/${phone}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Member not found");
    }
  }
);

/* ================= UPDATE MEMBER ================= */

export const updateMember = createAsyncThunk(
  "editMember/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/member/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

/* ================= SLICE ================= */

const editMemberSlice = createSlice({
  name: "editMember",
  initialState: {
    member: null,
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    clearMember: (state) => {
      state.member = null;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // FIND MEMBER
      .addCase(findMemberByPhone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findMemberByPhone.fulfilled, (state, action) => {
        state.loading = false;
        state.member = action.payload;
      })
      .addCase(findMemberByPhone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE MEMBER
      .addCase(updateMember.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.loading = false;
        state.member = action.payload;
        state.success = true;
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMember } = editMemberSlice.actions;
export default editMemberSlice.reducer;
