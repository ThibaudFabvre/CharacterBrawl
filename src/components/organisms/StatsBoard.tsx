

import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { addPoint, removePoint, saveStats } from '../../store/features/userSlice';
import { Skill,  Stats } from '../../types/character/stats';

type Props = {
    stats: Stats,
    savedStats: Stats,
}

const StatsBoard : FC<Props> = ({ stats, savedStats }) => {
    const dispatch = useDispatch();
    return (
        <div>
            <ul>
                {Object.entries(stats).map(([statname, value], index) => {
                    return (
                        <li key={`${index}${statname}` }>
                            <span>{statname}: {value}</span>
                            { statname !== 'skillpoints' ? <button onClick={() => dispatch(addPoint({ type: statname } as { type: Skill }))}>+</button> : null }
                            {/*@ts-ignore*/}
                            { statname !== 'skillpoints' && savedStats[statname] !== value ? <button onClick={() => dispatch(removePoint({ type: statname } as { type: Skill }))}>-</button> : null }
                        </li>
                    )
                })}
            </ul>
            {stats['skillpoints'] !== savedStats['skillpoints'] && <button onClick={() => dispatch(saveStats())}>VALIDATE</button>}
        </div>
    );
}

export default StatsBoard;