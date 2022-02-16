import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { addPoint } from '../../store/features/userSlice';
import { Skill, Stat, Stats } from '../../types/character/stats';

type Props = {
    stats: Stats,
}

const StatsBoard : FC<Props> = ({ stats }) => {
    const dispatch = useDispatch();
    return (
        <div>
            <ul>
                {Object.entries(stats).map(([statname, value], index) => {
                    return (
                    <li key={`${index}${statname}` }>
                        <span>{statname}: {value}</span><button onClick={() => dispatch(addPoint({ type: statname } as { type: Skill }))}>+</button>
                    </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default StatsBoard;