import { FC } from 'react';
import { FightStatus } from '../../types/fight/turn';

type Props = {
    fightStatus: FightStatus;
}

const FightHeader : FC<Props> = ({ fightStatus }) => {
    switch(fightStatus) {
        case 'pending':
            return(<div><span>COMBAT IN PROGRESS</span></div>);
        case 'won':
            return(<div><span>YOU WON THE FIGHT</span></div>);
        case 'lost':
            return(<div><span>YOU LOST THE FIGHT</span></div>);
        default:
            return(<div><span>CLICK 'START FIGHT'</span></div>);
    }
}

export default FightHeader;