import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CharacterCard from '../../components/organisms/CharacterCard/CharacterCard';
import { RootState } from '../../store';
import { addNewCharacter, selectCharacter } from '../../store/features/userSlice';



const CharacterList : FC<{}> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { characterList } = useSelector((state : RootState) => state.user);
    const [characterName, setCharacterName] = useState('');

    const handleOnSubmit = (event : React.FormEvent) => {
        event?.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <input type="text" placeholder="New Character Name" value={characterName} onChange={(event) => setCharacterName(event.target.value)}/>
                <button onClick={() => dispatch(addNewCharacter({ characterName }))}>+</button>
            </form>
            {characterList.map((character, index) => 
                <CharacterCard 
                    key={index}
                    character={character}
                    index={index}
                    onClick={() => { 
                        dispatch(selectCharacter(character));
                        navigate('/lobby');
                    }}
                />
            )}
            
        </>
    );
}

export default CharacterList;