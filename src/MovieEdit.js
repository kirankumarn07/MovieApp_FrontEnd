import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from 'react';
import { API } from './global';

const movieValidationScheme = yup.object({
    title: yup.string().required("Please enter movie name"),
    poster: yup.string().min(4).required("Please provide movie poster URL").url(),
    rating: yup.number().required("Please enter IMDB rating!!!").min(0).max(10),
    summary: yup.string().min(20).required("Please enter movie summary"),
    trailer: yup.string().min(4).required("Please enter movie trailer URL").url()
});

export function MovieEdit() {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`${API}/movies/${id}`, { method: "GET" })
            .then((data) => data.json())
            .then((mv) => setMovie(mv));
    }, []);

    return (
        <div>
            {movie ? <MovieFormEdit movie={movie} /> : "Loading..."}
        </div>
    )
}
export function MovieFormEdit({ movie }) {

    const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
        initialValues: {
            title: movie.title,
            poster: movie.poster,
            rating: movie.rating,
            summary: movie.summary,
            trailer: movie.trailer
        },
        validationSchema: movieValidationScheme,
        onSubmit: (updatedMovie) => {
            console.log("Submited", values);
            editMovie(updatedMovie)
        }
    })

    const navigate = useNavigate();

    const editMovie = (updatedMovie) => {

        fetch(`${API}/movies/${movie.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedMovie),
            headers: { "Content-type": "application/json" },
        }).then(() => navigate("/movies"));
    };

    return (
        <form onSubmit={handleSubmit} className='add-movie'>
            <h1>Edit Movie</h1>
            <TextField
                label="Movie Name"
                variant="outlined"
                value={values.title}
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && errors.title}
                helperText={touched.title && errors.title ? errors.title : null}
            />
            <TextField
                label="Movie Poster URL"
                variant="outlined"
                value={values.poster}
                name="poster"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.poster && errors.poster}
                helperText={touched.poster && errors.poster ? errors.poster : null}
            />
            <TextField
                label="Rating"
                variant="outlined"
                value={values.rating}
                name="rating"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.rating && errors.rating}
                helperText={touched.rating && errors.rating ? errors.rating : null}
            />
            <TextField
                label="Summary"
                variant="outlined"
                value={values.summary}
                name="summary"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.summary && errors.summary}
                helperText={touched.summary && errors.summary ? errors.summary : null}
            />
            <TextField
                label="Trailer URL"
                variant="outlined"
                value={values.trailer}
                name="trailer"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.trailer && errors.trailer}
                helperText={touched.trailer && errors.trailer ? errors.trailer : null}
            />
            <Button
                variant="contained"
                color='success'
                type='submit'>
                Save Edit
            </Button>
        </form>
    );
}
