import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from './global';

const movieValidationScheme = yup.object({
    title: yup.string().required("Please enter movie name"),
    poster: yup.string().min(4).required("Please provide movie poster URL").url(),
    rating: yup.number().required("Please enter IMDB rating!!!").min(0).max(10),
    summary: yup.string().min(20).required("Please enter movie summary"),
    trailer: yup.string().min(4).required("Please enter movie trailer URL").url()
});

export function AddMovie() {

    const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
        initialValues: {
            title: "",
            poster: "",
            rating: "",
            summary: "",
            trailer: ""
        },
        validationSchema: movieValidationScheme,
        onSubmit: (newMovie) => {
            console.log("Submited", values);
            addNewMovie(newMovie)
        }
    })

    const navigate = useNavigate();

    const addNewMovie = (newMovie) => {

        fetch(`${API}/movies`, {
            method: "POST",
            body: JSON.stringify(newMovie),
            headers: { "Content-type": "application/json" },
        }).then(() => navigate("/movies"));
    };

    return (
        <form onSubmit={handleSubmit} className='add-movie'>
            <h1>Add New Movie</h1>
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
                variant="outlined"
                type='submit'>
                Add Movie
            </Button>
        </form>
    );
}
