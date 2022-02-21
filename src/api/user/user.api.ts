import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "../../types/character/stats";
import { decodeCharacterList, decodeSignUp } from "./user.decode";
import { APICharacter, APISignIn, APISignUp, encodeSignIn, encodeSignUp } from "./user.encode";

const axios = require('axios');

const DEFAULT_API_URL = 'https://idle-rpg-test-technique.herokuapp.com/api';


export const SignUp = createAsyncThunk(
    'users/fetchByIdStatus',
    async (payload : APISignUp) => {
      const response = await axios.post(`${DEFAULT_API_URL}/auth/register`, encodeSignUp(payload));
      return decodeSignUp(response.data);
    }
);

export const signIn = async ( payload : APISignIn) => {
    const response = await axios.post(`${DEFAULT_API_URL}/auth/login`, encodeSignIn(payload));
    return response;
}

export const getOpponent = async ({ index }: {index: number}) => {
    const response = await axios.get(`${DEFAULT_API_URL}/characters/${index}`);
    return response;
}

export const getCharacterList = async () => {
    const response = await axios.get(DEFAULT_API_URL + '/characters');
    return decodeCharacterList(response);
}

export const deleteCharacter = async ({ index } : { index: number} ) => {
    const response = await axios.delete(`${DEFAULT_API_URL}/characters/${index}`);
    console.log(response);
    return response;
}

export const createCharacter = async ({ name } : { name: string }) => {
    const response = await axios.post(DEFAULT_API_URL + '/characters', name);
    return response;
}

export const updateCharacter = async ({ index, payload } : { index : number, payload : APICharacter}) => {
    const response = await axios.put(`${DEFAULT_API_URL}/characters/${index}`, payload);
    return response;
}