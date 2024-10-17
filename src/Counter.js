import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';


export function Counter() {
    let [like, setLike] = useState(0);
    let [disLike, setDisLike] = useState(0);

    const incrLikes = () => setLike(like + 1);
    const incrDisLikes = () => setDisLike(disLike + 1);

    return (
        <div>
            <IconButton onClick={incrLikes} color='primary' aria-label="like">
                <Badge badgeContent={like} color="primary">
                    👍
                </Badge>
            </IconButton>
            <IconButton onClick={incrDisLikes} color='error' aria-label="dislike">
                <Badge badgeContent={disLike} color="error">
                    👎
                </Badge>
            </IconButton>
        </div>
    );
}
