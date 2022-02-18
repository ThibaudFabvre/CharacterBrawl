import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..';
import { TestingStats } from '../../assets/testing/Character';
import { Skill, Skills, Stats } from '../../types/character/stats';

interface UserState {
  connected: boolean;
  selectedCharacter: Stats;
  savedStats: Stats,
  canCharacterFight: Date;
  characterRank: number;
}

export const initialState: UserState = {
  connected: true,
  selectedCharacter: TestingStats,
  savedStats: TestingStats,
  canCharacterFight: new Date(),
  characterRank: 1,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPoint(state : UserState, action : PayloadAction<{ type: Skill }>) {

      const { skillpoints } = state.selectedCharacter;
      let roundedSkillPointCost = Math.ceil( state.selectedCharacter[action.payload.type] / 5 );

      if(roundedSkillPointCost === 0) {
        roundedSkillPointCost = 1;
      }


      switch(action.payload.type){
        case 'health':
          if(skillpoints >= 1){
            state.selectedCharacter[action.payload.type] += 1;
            state.selectedCharacter['skillpoints'] -= 1;
          };
          break;

        default:
          if(skillpoints >= roundedSkillPointCost) {
            state.selectedCharacter[action.payload.type] += 1;
            state.selectedCharacter['skillpoints'] -= roundedSkillPointCost;
          }
          break;
      } 
    },
    removePoint(state : UserState, action : PayloadAction<{ type: Skill }>) {

      const { skillpoints } = state.selectedCharacter;
      let roundedSkillPointCost = Math.ceil( (state.selectedCharacter[action.payload.type] - 1) / 5 );

      if(roundedSkillPointCost === 0) {
        roundedSkillPointCost = 1;
      }

      switch(action.payload.type){
        case 'health':
          if(skillpoints >= 1){
            state.selectedCharacter[action.payload.type] -= 1;
            state.selectedCharacter['skillpoints'] += 1;
          };
          break;

        default:
          if(skillpoints >= roundedSkillPointCost) {
            state.selectedCharacter[action.payload.type] -= 1;
            state.selectedCharacter['skillpoints'] += roundedSkillPointCost;
          }
          break;
      } 
    },
    saveStats(state : UserState) {
      state.savedStats = state.selectedCharacter;
    },
    endFight(state : UserState, action: PayloadAction<{ won : boolean}>) {

      if ( action.payload.won ) {
        state.savedStats.skillpoints += 1;
        state.selectedCharacter.skillpoints += 1;
        state.characterRank += 1;
      } else {
        state.canCharacterFight = new Date(new Date(state.canCharacterFight).setHours(state.canCharacterFight.getHours() + 1));
        if(state.characterRank > 1) {
          state.characterRank -= 1;
        }
      }
    }
  },
})

export const { addPoint, removePoint, saveStats, endFight } = userSlice.actions

export default userSlice.reducer