import { useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from "react";
import { API } from "./global";

export function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetch(`${API}/movies/${id}`, { method: "GET" })
            .then((data) => data.json())
            .then((mv) => setMovie(mv));
    }, []);

    const styles = {
        color: movie.rating >= 8 ? "green" : "red"
    };
    const navigate = useNavigate();
    return (
        <div>
            <iframe
                width="100%"
                height="700"
                src={movie.trailer}
                title="Sardar Official Trailer | Karthi, Raashii Khanna, Rajisha | GV Prakash Kumar | P.S Mithran"
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
            <div className='movie-details-container'>
                <div className='movieSpecs'>
                    <h4 className="title">{movie.name}
                    </h4>
                    <p style={styles} className="rating">⭐{movie.rating}</p>
                </div>
                <p className="summary">{movie.summary}</p>
                <Button variant="contained" onClick={() => navigate(-1)}><ArrowBackIosIcon />Back</Button>
            </div>
        </div>
    );
}
