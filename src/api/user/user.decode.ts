import { Character } from "../../types/character/stats";


type APICharacter = {
    id: number,
    name: string,
    rank: number,
    skillpoints: number,
    health: number,
    attack: number,
    defense: number,
    magic: number,
    user_id: number,
    created_at: Date,
    updated_at: Date,
    canCharacterFight: number,
}

export const decodeCharacterList = (payload: Array<APICharacter>): Array<Character> => {
    const formatedResponse = payload.map(character => (
        {
            id: character.id,
            name: character.name,
            rank: character.rank,
            stats: {
                skillpoints: character.skillpoints,
                health: character.health,
                attack: character.attack,
                defense: character.defense,
                magic: character.magic,
            },
            canCharacterFight: character.canCharacterFight
        }
    ));
    return formatedResponse;


}

type APISignupResponse = {
    token: string,
    user: {
        "name": string,
        "email": string,
        "updated_at": string,
        "created_at": string,
        "id": number,
    }
}
export const decodeSignUp = (payload : APISignupResponse) => {
    const formatedResponse = {
        token: payload.token,
        userId: payload.user.id
    } ;
    return formatedResponse;
}
