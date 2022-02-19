import { TestingStats } from "../../testing/Character";
import { fightATurn } from "./fight";


describe('fightATurn', () => {
    const attackerStats = {
        skillpoints: 0,
        health: 10,
        attack: 6,
        defense: 4,
        magic: 2
    };

    const defenderStats = TestingStats;
    
    const result = fightATurn({attacker: attackerStats, defender: defenderStats});

    it('should calculate damage by substracting attacker dice roll number to defender defense', () => {
        expect(result.damage).toEqual(result.diceRoll - defenderStats.defense);
    })
});