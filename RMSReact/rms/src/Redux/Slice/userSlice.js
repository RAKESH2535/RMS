import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {
    userId: null,
    ownerId: null,
    clientId: null,
    isAuthenticated: false,
  },
  propertyMaster: [],
  clientMaster: [],
  ownerMaster: [],
  rentMaster: [],
  rentTranscation: [],
  status: "idle",
  error: "",
};

export const fetchOwnerMaster = createAsyncThunk(
  "user/fetchOwnerMaster",
  async () => {
    const res = await axios.get("http://localhost:5000/ownermaster", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data;
  }
);

export const fetchPropertyMaster = createAsyncThunk(
  "user/fetchPropertyMaster",
  async () => {
    const res = await axios.get("http://localhost:5000/propertymaster", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data;
  }
);

export const fetchRentMaster = createAsyncThunk(
  "user/fetchRentMaster",
  async () => {
    const res = await axios.get("http://localhost:5000/rentmaster", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data;
  }
);

export const fetchClientMaster = createAsyncThunk(
  "user/fetchClientMaster",
  async () => {
    const res = await axios.get("http://localhost:5000/clientmaster", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data;
  }
);

export const fetchrentTranscation = createAsyncThunk(
  "user/fetchrentTranscation",
  async () => {
    const res = await axios.get("http://localhost:5000/rentTranscation", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data;
  }
);

export const deleteMaster = createAsyncThunk(
  "user/deleteMaster",
  async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/propertymaster/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res?.status === 200) return id;
      return `${res.status} : ${res.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.user.userId = action.payload.userId;
      state.user.ownerId = action.payload.ownerId;
      state.user.clientId = action.payload.clientId;
      state.user.isAuthenticated = action.payload.isAuthenticated;
    },
    setReset: (state, action) => {
      state.ownerMaster = action.payload.ownerMaster;
      state.propertyMaster = action.payload.propertyMaster;
      state.clientMaster = action.payload.clientMaster;
      state.rentMaster = action.payload.rentMaster;
    },
  },
  extraReducers(builder) {
    builder
      //Fetch owner cases
      .addCase(fetchOwnerMaster.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOwnerMaster.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ownerMaster = action.payload;
      })
      .addCase(fetchOwnerMaster.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch property master cases
      .addCase(fetchPropertyMaster.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPropertyMaster.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (Array.isArray(action.payload)) {
          state.propertyMaster = action.payload.filter(
            (item) => item.ownerMasters._id === state.user.ownerId
          );
        } else {
          state.propertyMaster = [];
        }
      })
      .addCase(fetchPropertyMaster.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch client master cases
      .addCase(fetchClientMaster.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientMaster.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (Array.isArray(action.payload)) {
          state.clientMaster = action.payload.filter(
            (item) => item.ownerMasters._id === state.user.ownerId
          );
        } else {
          state.clientMaster = [];
        }
      })
      .addCase(fetchClientMaster.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch rent master cases
      .addCase(fetchRentMaster.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRentMaster.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (Array.isArray(action.payload)) {
          state.rentMaster = action.payload.filter(
            (item) => item.ownerMasters._id === state.user.ownerId
          );
        } else {
          state.rentMaster = [];
        }
      })
      .addCase(fetchRentMaster.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch rent master cases
      .addCase(fetchrentTranscation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchrentTranscation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rentTranscation = action.payload
      })
      .addCase(fetchrentTranscation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Delete master case
      .addCase(deleteMaster.fulfilled, (state, action) => {
        state.propertyMaster = state.propertyMaster.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const selectAllOwnerMaster = (state) => state.user.ownerMaster;
export const selectAllPropertyMaster = (state) => state.user.propertyMaster;
export const selectAllClientMaster = (state) => state.user.clientMaster;
export const selectAllRentMaster = (state) => state.user.rentMaster;
export const selectAllRentTranscation = (state) => state.user.rentTranscation;
export const getPropertyMasterStatus = (state) => state.user.status;
export const getPropertyMasterError = (state) => state.user.error;

export const { setAuthenticated, setReset } = userSlice.actions;

export default userSlice.reducer;
