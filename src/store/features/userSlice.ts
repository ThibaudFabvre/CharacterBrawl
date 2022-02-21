import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignUp } from '../../api/user/user.api';
import { DEFAULT_STATS } from '../../assets/testing/Character';
import { fightATurn } from '../../assets/utils/fights/fight';
import { Character, Opponent, Skill } from '../../types/character/stats';
import { FightStatus, Turn } from '../../types/fight/turn';

export interface UserState {
  userId: number,
  characterTemporaryCopy: Character;
  savedCharacter: Character,
  opponent: Opponent;
  turns: Array<Turn>;
  fightStatus: FightStatus;
  characterList: Array<Character>;
}

export const initialState: UserState = {
  userId: 0,
  characterTemporaryCopy: {
    name: 'Fio',
    rank: 1,
    stats: DEFAULT_STATS,
    canCharacterFight: 0,
    id: 1,
  },
  savedCharacter: {
    name: 'Fio',
    rank: 1,
    stats: DEFAULT_STATS,
    canCharacterFight: 0,
    id: 1,
  },
  opponent: {
    id: 1,
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
  characterList: [],
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
        state.savedCharacter.canCharacterFight = state.savedCharacter.canCharacterFight + 3600;
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
    selectCharacter(state: UserState, action : PayloadAction<Character>) {
      state.savedCharacter = action.payload;
    },
    addNewCharacter(state: UserState, action: PayloadAction<{ characterName : string }>) {
      
      state.characterList = state.characterList.concat({
        id: 0,
        name: action.payload.characterName,
        rank: 1, 
        stats: DEFAULT_STATS, 
        canCharacterFight: 0,
      })
    },
    removeCharacter(state: UserState, action: PayloadAction<{ index : number }>) {
      state.characterList = state.characterList.filter((character, index) => state.characterList[index] !== state.characterList[action.payload.index]);
      console.log(state.characterList);
    }, 
    signUp(state : UserState, action: PayloadAction<{ email : string, password : string, name : string } >) {
      // TO DO SIGN UP
    },
    signIn(state : UserState, action: PayloadAction<{ email : string, password : string } >) {
      // TO DO LOGIN
    }
  },

})

export const { addPoint, removePoint, saveStats, endFight, initiateFight, addNewCharacter, removeCharacter, signIn, signUp, selectCharacter } = userSlice.actions

export default userSlice.reducer