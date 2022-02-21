

export type APICharacter = {
    "user_id": number,
    "id": number,
    "name": string,
    "rank": number,
    "skillpoints": number,
    "health": number,
    "attack": number,
    "defense": number,
    "magic": number,
    "canCharacterFight": number,
}

export type APISignUp = {
    "email" : string,
    "password" : string,
    "name" : string,
}

export const encodeSignUp = ( payload : APISignUp) => {
    const formatedBody = { ...payload, device_name: 'web'};
    return formatedBody;
}


export type APISignIn = {
    "email" : string,
    "password" : string,
}

export const encodeSignIn = ( payload : APISignIn) => {
    const formatedBody = { ...payload, device_name: 'web'};
    return formatedBody;
}