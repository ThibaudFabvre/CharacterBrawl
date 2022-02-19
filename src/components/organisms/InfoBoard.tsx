import React, { FC } from 'react';
import { Turn } from '../../types/fight/turn';


type Props = {
    turns: Array<Turn>,
}

const InfoBoard : FC<Props> = ({ turns }) => {
    return (
        <div style={{backgroundColor: 'green' }}>
            <ul>
                {turns.map((turn : Turn, index : number) => <li key={index}><p>[ ROUND {index} ] : </p><span>{turn.attacker} dealt {turn.damage} damage to { turn.defender} after getting a {turn.diceRoll} dice roll</span></li>)}
            </ul> 
        </div>
    )
}

export default InfoBoard;