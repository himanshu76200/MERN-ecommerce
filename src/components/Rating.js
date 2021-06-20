import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const Rating = ({ value, text }) => {
    const stars = [];

    for (let i = 0; i < Math.floor(value); i++) {
        stars.push(<StarIcon style={{ color: '#FFD700' }} />)
    }

    if (!Number.isInteger(value)) {
        stars.push(<StarHalfIcon style={{ color: '#FFD700' }} />)
    }

    return (
        <div>
            <span>
                {stars}{' '}{text && text}
            </span>
        </div>
    )
}

export default Rating
