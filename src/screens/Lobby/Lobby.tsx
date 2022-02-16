import React, { useReducer } from 'react';
import { useSelector } from 'react-redux';
import { TestingStats } from '../../assets/testing/Character';
import StatsBoard from '../../components/organisms/StatsBoard';
import { RootState } from '../../store';

const Lobby = () => {
    const { selectedCharacter } = useSelector((state : RootState) => state.user);
    return(
        <>
            <StatsBoard stats={selectedCharacter} />
        </>
    )
}

export default Lobby;