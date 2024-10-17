import { useEffect, useState } from 'react';
import { Movie } from './Movie';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { API } from './global';



export function MovieList() {

    const [movieList, setMovieList] = useState([]);

    const getMovies = () => {
        fetch(`${API}/movies`, { method: "GET" })
            .then((data) => data.json())
            .then((movies) => setMovieList(movies));
    }

    useEffect(() => getMovies(), []);

    const deleteMovie = (id) => {
        fetch(`${API}/movies/${id}`, { method: "DELETE" })
            .then((data) => getMovies());
    }

    const navigate = useNavigate();

    return (
        <div>
            <div className='movie-list'>
                {movieList.map((data) => (
                    <Movie key={data._id} movie={data} idx={data._id}
                        editButton={<IconButton sx={{ marginLeft: 'auto' }}
                            onClick={() => navigate(`/movies/edit/${data._id}`)}
                        ><EditIcon /></IconButton>}
                        deleteButton={<IconButton color='error' sx={{ marginLeft: 'auto' }}
                            onClick={() => deleteMovie(data._id)} aria-label="delete">
                            <DeleteIcon /></IconButton>}
                    />
                ))}
            </div>
        </div>
    );
}

