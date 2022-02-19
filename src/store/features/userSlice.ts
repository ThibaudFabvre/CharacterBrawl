import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TestingStats } from '../../assets/testing/Character';
import { fightATurn } from '../../assets/utils/fights/fight';
import { randomIntFromInterval } from '../../assets/utils/range';
import { Character, Skill, Stats } from '../../types/character/stats';
import { FightStatus, Turn } from '../../types/fight/turn';

export interface UserState {
  connected: boolean;
  characterTemporaryCopy: Character;
  savedCharacter: Character,
  canCharacterFight: number;
  opponent: Character;
  turns: Array<Turn>;
  fightStatus: FightStatus;
}

export const initialState: UserState = {
  connected: true,
  characterTemporaryCopy: {
    name: 'Fio',
    rank: 1,
    stats: TestingStats,
  },
  savedCharacter: {
    name: 'Fio',
    rank: 1,
    stats: TestingStats,
  },
  canCharacterFight: new Date().getHours(),
  opponent: {
    name: 'Han',
    rank: 1,
    stats: {
      skillpoints: 0,
      health: 10,
      attack: 6,
      defense: 4,
      magic: 2
    },
  },
  turns: [],
  fightStatus: 'none',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPoint(state : UserState, action : PayloadAction<{ type: Skill }>) {

      const { skillpoints } = state.characterTemporaryCopy.stats;
      let roundedSkillPointCost = Math.ceil( state.characterTemporaryCopy.stats[action.payload.type] / 5 );

      if(roundedSkillPointCost === 0) {
        roundedSkillPointCost = 1;
      }


      switch(action.payload.type){
        case 'health':
          if(skillpoints >= 1){
            state.characterTemporaryCopy.stats[action.payload.type] += 1;
            state.characterTemporaryCopy.stats['skillpoints'] -= 1;
          };
          break;

        default:
          if(skillpoints >= roundedSkillPointCost) {
            state.characterTemporaryCopy.stats[action.payload.type] += 1;
            state.characterTemporaryCopy.stats['skillpoints'] -= roundedSkillPointCost;
          }
          break;
      } 
    },
    removePoint(state : UserState, action : PayloadAction<{ type: Skill }>) {

      const { skillpoints } = state.characterTemporaryCopy.stats;
      let roundedSkillPointCost = Math.ceil( (state.characterTemporaryCopy.stats[action.payload.type] - 1) / 5 );

      if(roundedSkillPointCost === 0) {
        roundedSkillPointCost = 1;
      }

      switch(action.payload.type){
        case 'health':
          if(skillpoints >= 1){
            state.characterTemporaryCopy.stats[action.payload.type] -= 1;
            state.characterTemporaryCopy.stats['skillpoints'] += 1;
          };
          break;

        default:
          if(skillpoints >= roundedSkillPointCost) {
            state.characterTemporaryCopy.stats[action.payload.type] -= 1;
            state.characterTemporaryCopy.stats['skillpoints'] += roundedSkillPointCost;
          }
          break;
      } 
    },
    saveStats(state : UserState) {
      state.savedCharacter = state.characterTemporaryCopy;
    },
    endFight(state : UserState, action: PayloadAction<{ won : boolean}>) {

      if ( action.payload.won ) {
        state.savedCharacter.stats.skillpoints += 1;
        state.characterTemporaryCopy.stats.skillpoints += 1;
        state.savedCharacter.rank += 1;
      } else {
        state.canCharacterFight = state.canCharacterFight + 3600;
        if(state.savedCharacter.rank > 1) {
          state.savedCharacter.rank -= 1;
        }
      }
    },
    initiateFight(state: UserState){

      // RESET THE FIGHT HISTORY
      state.turns = [];

      // CHANGE THE FIGHT STATUS
      state.fightStatus = 'pending';

      // COPY A FRESH SET OF THE STATS TO USE SAVED STATS VALUES WITHOUT ALTERING STATE
      const fightingStatsCopy = { ...state.savedCharacter.stats };

      // FIGHT ALTERING ATTACKER AND DEFENDER
      let isItYourTurn = true;
      while(state.opponent.stats.health > 0 && fightingStatsCopy.health > 0 ) {

        if(isItYourTurn) {
          const {damage, diceRoll } = fightATurn({attacker: fightingStatsCopy, defender: state.opponent.stats });
          state.opponent.stats.health -= damage;
          state.turns = state.turns.concat([{
            attacker: state.savedCharacter.name,
            defender: state.opponent.name,
            damage: damage,
            diceRoll,
          }]);
        } else {
          const { damage, diceRoll } = fightATurn({attacker: state.opponent.stats, defender: fightingStatsCopy });
          fightingStatsCopy.health -= damage;
          state.turns = state.turns.concat([{
            attacker: state.opponent.name,
            defender: state.savedCharacter.name,
            damage: damage,
            diceRoll,
          }]);
        }
        isItYourTurn = !isItYourTurn;

      };

      if(state.opponent.stats.health <= 0) {
        endFight({ won : true });
        state.fightStatus='won';
      } else if (fightingStatsCopy.health <= 0) {
        endFight({ won : false });
        state.fightStatus='lost';
      }
    },
  },
})

export const { addPoint, removePoint, saveStats, endFight, initiateFight } = userSlice.actions

export default userSlice.reducer