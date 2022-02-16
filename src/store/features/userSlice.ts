import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..';
import { TestingStats } from '../../assets/testing/Character';
import { Skill, Skills, Stats } from '../../types/character/stats';

interface UserState {
  connected: boolean;
  selectedCharacter: Stats;
}

const initialState: UserState = {
  connected: true,
  selectedCharacter: TestingStats,
}

const userHasRequiredSkillPoints = (skillpoints : number) => {
  return skillpoints >= 1; 
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPoint(state : UserState, action : PayloadAction<{ type: Skill }>){
      if(userHasRequiredSkillPoints(state.selectedCharacter.skillpoints)){
        state.selectedCharacter[action.payload.type] += 1;
        state.selectedCharacter['skillpoints'] -= 1;
      }
    },
  },
})

export const { addPoint } = userSlice.actions

export default userSlice.reducer