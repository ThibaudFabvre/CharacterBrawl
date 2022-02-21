import { DEFAULT_STATS } from "../../testing/Character";
import { fightATurn } from "./fight";


describe('fightATurn', () => {
    const attackerStats = {
        skillpoints: 0,
        health: 10,
        attack: 6,
        defense: 4,
        magic: 2
    };

    
    const result = fightATurn({attacker: attackerStats, defender: DEFAULT_STATS});

    it('should calculate damage by substracting attacker dice roll number to defender defense', () => {
        expect(result.damage).toEqual(result.diceRoll - DEFAULT_STATS.defense);
    })
});