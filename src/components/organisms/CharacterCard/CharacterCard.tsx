import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { removeCharacter } from '../../../store/features/userSlice';
import { Character } from '../../../types/character/stats';
import { CardContainer } from './CharacterCard.style';

type Props = {
    character: Character;
    index: number;
    onClick: () => void;
}

const CharacterCard : FC<Props> = ({character, index, onClick }) => {

    const dispatch = useDispatch();
    return (
        <CardContainer>
            <span>{character.name}</span>
            <span>{character.rank}</span>
            {Object.entries(character.stats).map(([statname, value], index) => {
                    return (
                        <li key={`${index}${statname}` }>
                            <span>{statname}: {value}</span>
                        </li>
                    )
                })}
            <button onClick={() => onClick()}> SELECT </button>
            <button onClick={() => dispatch(removeCharacter({ index }))}> DELETE </button>
        </CardContainer>
    );
};

export default CharacterCard;