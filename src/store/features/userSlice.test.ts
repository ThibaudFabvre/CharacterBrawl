import { TestingStats } from '../../assets/testing/Character';
import reducer, { endFight, initialState } from './userSlice';

describe('[ Reducer ] endFight()', () => {

    const previousState = {
        connected: true,
        selectedCharacter: TestingStats,
        savedStats: TestingStats,
        canCharacterFight: new Date(),
        characterRank: 3,
      };

    it('should increase rank on win', () => {
        const newState = reducer(initialState, endFight({won: true}));
        expect(newState.characterRank).toEqual(2);
    });

    it('should add skillpoint on win', () => {
        const newState = reducer(initialState, endFight({won: true}));
        expect(newState.selectedCharacter.skillpoints).toEqual(13);
        expect(newState.savedStats.skillpoints).toEqual(13);
    });

    it('should not decrease rank on fight loss if rank equals 1', () => {
        const newState = reducer(initialState, endFight({won: false}));
        expect(newState.characterRank).toEqual(1);
    });

    it('should decrease rank on fight loss if rank higher then 1', () => {

        const newState = reducer(previousState, endFight({won: false}));
        expect(newState.characterRank).toEqual(2);
    });
    it('should disable user ability to fight for 1 hour', () => {
        const newState = reducer(previousState, endFight({won: false}));
        expect(newState.canCharacterFight.getHours()).toBeGreaterThan(previousState.canCharacterFight.getHours());
    })
})

