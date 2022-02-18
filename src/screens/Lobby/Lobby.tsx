import React from 'react';
import { useSelector } from 'react-redux';
import StatsBoard from '../../components/organisms/StatsBoard';
import { RootState } from '../../store';

const Lobby = () => {
    const { selectedCharacter, savedStats } = useSelector((state : RootState) => state.user);
    return(
        <>
            <StatsBoard stats={selectedCharacter} savedStats={savedStats} />
        </>
    )
}

export default Lobby;