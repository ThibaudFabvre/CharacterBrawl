import { Stats } from "../../../types/character/stats";
import { BASE_ATTACK } from "../../testing/Character";
import { randomIntFromInterval } from "../range";


export const fightATurn = ({attacker, defender } : {attacker : Stats, defender : Stats }) : { damage : number, diceRoll : number} => {
    let totalDamage = BASE_ATTACK;
    const hit = randomIntFromInterval(BASE_ATTACK, attacker.attack);
    if(hit > defender.defense) {
      totalDamage = hit - defender.defense;
      if(attacker.magic === hit - defender.defense) {
        totalDamage += attacker.magic;
      }
    }
  
    return { damage: hit - defender.defense > 0 ? hit - defender.defense : 0, diceRoll: hit};
  };