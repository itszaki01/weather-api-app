import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk('fetchWeather', async () => {
  
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=36.18&lon=5.41&appid=52d0b023728f9bb968f0a630fab3bb54', {
        cancelToken: new axios.CancelToken((c) => c)
    })

    let tempData = {
        number: Math.round(data.main.temp - 272.15),
        description: data.weather[0].description,
        min: Math.round(data.main.temp_min - 272.15),
        max: Math.round(data.main.temp_max - 272.15),
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    }

    return tempData
})


export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weather: {
            number: '',
            min: '',
            max: '',
            isLoading: false
        }
    },
    extraReducers(builder) {
        builder.addCase('fetchWeather/pending', (state, action) => {
            state.weather.isLoading = true
        })
            .addCase(fetchWeather.fulfilled, (state, { payload }) => {

                state.weather = { ...payload, isLoading: false }
            })
    }
})

export const weatherReducer = weatherSlice.reducer