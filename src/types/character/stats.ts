
export type Character = {
    id: number,
    name: string,
    rank: number,
    stats: Stats,
    canCharacterFight: number;
}

export type Opponent = {
    id: number,
    name: string,
    rank: number,
    stats: Stats,
}

export enum Skills {
    Skillpoints= "skillpoints",
    Health = "health",
    Attack = "attack",
    Defense = "defense",
    Magic = "magic",
}

export type Skill = Skills.Skillpoints | Skills.Health | Skills.Attack | Skills.Defense | Skills.Magic;

export type Stat = {
    [key in Skill ]?: number;
}

export type StatsList = Array<Stat>;

export type Stats = {
    skillpoints: number,
    health: number,
    attack: number,
    defense: number,
    magic: number
}

