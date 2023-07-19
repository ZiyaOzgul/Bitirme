import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//weather
// export const getWeatherAsync = createAsyncThunk(
//   "/planner/getWeatherAsync",
//   async ({ cityName, metric }) => {
//     console.log(cityName, metric + "city");
//     const res = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=32f408218d01bffee2d4c418e9cb9034&units=${metric}`
//     );
//     console.log(res.data);
//     return res.data;
//   }
// );
export const getWeatherData = createAsyncThunk(
  "/planner/getWeatherData",
  async ({ cityName, metric }) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=32f408218d01bffee2d4c418e9cb9034&units=${metric}`
    );

    return res.data;
  }
);

//getNotes
export const getNotesAsync = createAsyncThunk(
  "/planner/getNotesAsync",
  async () => {
    const res = await axios.get("http://localhost:3001/notes");
    return res.data;
  }
);
//addNotes
export const postNotesAsync = createAsyncThunk(
  "/planner/postNotesAsync",
  async (postData) => {
    console.log(postData);
    const res = await axios.post(`http://localhost:3001/notes`, postData);
    return res.data;
  }
);
//setNotes
export const setNotesAsync = createAsyncThunk(
  "/planner/setNotesAsync",
  async ({ id, data }) => {
    const res = await axios.patch(`http://localhost:3001/notes/${id}`, data);
    return res.data;
  }
);
//deleteNotes
export const deleteNotesAsync = createAsyncThunk(
  "/planner/deleteNotesAsync",
  async (id) => {
    const res = await axios.delete(`http://localhost:3001/notes/${id}`);
    return res.data;
  }
);

//getPlans
export const getPlansAsync = createAsyncThunk(
  "/planner/getPlansAsync",
  async () => {
    const res = await axios.get(`http://localhost:3001/plans`);
    return res.data;
  }
);
//postPlans
export const postPlansAsync = createAsyncThunk(
  "/planner/postPlansAsync",
  async (postData) => {
    const res = await axios.post(`http://localhost:3001/plans`, postData);
    console.log(res.data);
    return res.data;
  }
);
//setPlan
export const setPlansAsync = createAsyncThunk(
  "/planner/setPlansAsync",
  async ({ id, postData }) => {
    const res = await axios.patch(`http://localhost:3001/plans${id}`, postData);
    return res.data;
  }
);
//deletePlan
export const deletePlansAsync = createAsyncThunk(
  "/planner/deletePlansAsync",
  async ({ id }) => {
    const res = await axios.delete(`http://localhost:3001/plans${id}`);
    return res.data;
  }
);

export const plannerSlice = createSlice({
  name: "planner",
  initialState: {
    plans: [],
    notes: [],
    forecast: [],
    defaultCity: "tokyo",
    metric: "metric",
    isLoadingPlans: false,
    isLoadingNotes: false,
    isLoadingForecast: false,
    mod: "dark",
    days: [
      // "Monday",
      // "Tuesday",
      // "Wednesday",
      // "Thursday",
      // "Friday",
      // "Saturday",
      // "Sunday",
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ],
    eror: null,
  },
  extraReducers: {
    //get Weather
    // [getWeatherAsync.pending]: (state, action) => {
    //   state.isLoadingForecast = true;
    // },
    // [getWeatherAsync.fulfilled]: (state, action) => {
    //   state.forecast = action.payload;
    //   state.isLoadingForecast = false;
    // },
    // [getWeatherAsync.error]: (state, action) => {
    //   state.error = action.error.message;
    //   state.isLoadingForecast = false;
    // },

    [getWeatherData.pending]: (state, action) => {
      state.isLoadingForecast = true;
    },
    [getWeatherData.fulfilled]: (state, action) => {
      state.forecast = action.payload;

      state.isLoadingForecast = false;
    },
    [getWeatherData.error]: (state, action) => {
      // state.error = action.message.error;
      state.isLoadingForecast = false;
    },
    //getNotes
    [getNotesAsync.pending]: (state, action) => {
      state.isLoadingNotes = true;
    },
    [getNotesAsync.fulfilled]: (state, action) => {
      state.notes = action.payload;
      state.isLoadingNotes = false;
    },
    [getNotesAsync.error]: (state, action) => {
      state.error = action.error.message;
      state.isLoadingNotes = false;
    },
    //postNotes
    [postNotesAsync.pending]: (state, action) => {
      state.isLoadingNotes = true;
    },
    [postNotesAsync.fulfilled]: (state, action) => {
      state.notes = action.payload;
      state.isLoadingNotes = false;
    },
    [postNotesAsync.error]: (state, action) => {
      state.error = action.error.message;
      state.isLoadingNotes = false;
    },
    //setNotes
    [setNotesAsync.pending]: (state, action) => {
      state.isLoadingNotes = true;
    },
    [setNotesAsync.fulfilled]: (state, action) => {
      state.notes = action.payload;
      state.isLoadingNotes = false;
    },
    [setNotesAsync.error]: (state, action) => {
      state.error = action.error.message;
      state.isLoadingNotes = false;
    },
    //delNotes
    [deleteNotesAsync.pending]: (state, action) => {
      state.isLoadingNotes = true;
    },
    [deleteNotesAsync.fulfilled]: (state, action) => {
      state.notes = action.payload;
      state.isLoadingNotes = false;
    },
    [deleteNotesAsync.error]: (state, action) => {
      state.error = action.error.message;
      state.isLoadingNotes = false;
    },

    //getPlans
    [getPlansAsync.pending]: (state, action) => {
      state.isLoadingPlans = true;
    },
    [getPlansAsync.fulfilled]: (state, action) => {
      state.plans = action.payload;
      state.isLoadingPlans = false;
    },
    [getPlansAsync.err]: (state, action) => {
      state.isLoadingPlans = false;
    },
    //postPlans
    [postPlansAsync.pending]: (state, action) => {
      state.isLoadingPlans = true;
    },
    [postPlansAsync.fulfilled]: (state, action) => {
      state.plans = action.payload;
      state.isLoadingPlans = false;
    },
    [postPlansAsync.fulfilled]: (state, action) => {
      state.isLoadingPlans = false;
    },
    //patchPlans
    [setPlansAsync.pending]: (state, action) => {
      state.isLoadingPlans = true;
    },
    [setPlansAsync.fulfilled]: (state, action) => {
      state.plans = action.payload;
      state.isLoadingPlans = false;
    },
    [setPlansAsync.fulfilled]: (state, action) => {
      state.isLoadingPlans = false;
    },
    //deletePlans
    [deletePlansAsync.pending]: (state, action) => {
      state.isLoadingPlans = true;
    },
    [deletePlansAsync.fulfilled]: (state, action) => {
      state.plans = action.payload;
      state.isLoadingPlans = false;
    },
    [deletePlansAsync.fulfilled]: (state, action) => {
      state.isLoadingPlans = false;
    },
  },
  reducers: {
    changeTheme: (state, action) => {
      state.mod = action.payload;
    },
  },
});

export const complatedPlans = (state) =>
  state.planner.plans.filter((planitem) => planitem.complated);
export const currentlyPlans = (state) =>
  state.planner.plans.filter((planitem) => !planitem.complated);
export const daysStore = (state) => state.planner.days;
export const { changeTheme } = plannerSlice.actions;
export default plannerSlice.reducer;
export const lightMod = (state) => state.planner.mod;
export const plans = (state) => state.planner.plans;
export const notes = (state) => state.planner.notes;
export const forecast = (state) => state.planner.forecast;
