import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StatsBoard from '../../components/organisms/StatsBoard';
import InfoBoard from '../../components/organisms/InfoBoard';
import { RootState } from '../../store';
import { initiateFight } from '../../store/features/userSlice';
import FightHeader from '../../components/organisms/FightHeader';

const Lobby = () => {
    const { characterTemporaryCopy, savedCharacter, turns, fightStatus } = useSelector((state : RootState) => state.user);
    const [ isFightLaunched, setIsFightLaunched ] = useState(false);
    const dispatch = useDispatch();

    return(
        <>
            <StatsBoard stats={characterTemporaryCopy.stats} savedStats={savedCharacter.stats} />
            { <FightHeader fightStatus={fightStatus} />}
            <button onClick={() => { 
                setIsFightLaunched(true);
                dispatch(initiateFight());
            }}>START FIGHT</button>
            { isFightLaunched && <InfoBoard turns={turns} />}
        </>
    )
}

export default Lobby;