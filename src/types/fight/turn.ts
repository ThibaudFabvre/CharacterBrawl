export type Turn = {
    attacker: string,
    defender: string,
    diceRoll: number,
    damage: number,
  }


export type FightStatus = 'pending' | 'lost' | 'won' | 'none';