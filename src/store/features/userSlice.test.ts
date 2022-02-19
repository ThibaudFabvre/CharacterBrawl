import { TestingStats } from '../../assets/testing/Character';
import reducer, { endFight, initialState, UserState } from './userSlice';

describe('[ Reducer ] endFight()', () => {

    const previousState : UserState = {
        connected: true,
        characterTemporaryCopy: {
          name: 'Fio',
          rank: 3,
          stats: TestingStats,
        },
        savedCharacter: {
          name: 'Fio',
          rank: 3,
          stats: TestingStats,
        },
        canCharacterFight: new Date().getHours(),
        opponent: {
          name: 'Han',
          rank: 3,
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
      };

    it('should increase rank on win', () => {
        const newState = reducer(initialState, endFight({won: true}));
        expect(newState.savedCharacter.rank).toEqual(2);
    });

    it('should add skillpoint on win', () => {
        const newState = reducer(initialState, endFight({won: true}));
        expect(newState.characterTemporaryCopy.stats.skillpoints).toEqual(13);
        expect(newState.savedCharacter.stats.skillpoints).toEqual(13);
    });

    it('should not decrease rank on fight loss if rank equals 1', () => {
        const newState = reducer(initialState, endFight({won: false}));
        expect(newState.savedCharacter.rank).toEqual(1);
    });

    it('should decrease rank on fight loss if rank higher then 1', () => {

        const newState = reducer(previousState, endFight({won: false}));
        expect(newState.savedCharacter.rank).toEqual(2);
    });
    it('should disable user ability to fight for 1 hour', () => {
        const newState = reducer(previousState, endFight({won: false}));
        expect(newState.canCharacterFight).toBeGreaterThan(previousState.canCharacterFight);
    })
})

