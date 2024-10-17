import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
    email: yup.string().min(8).required("enter email"),
    password: yup.string().min(4).required("enter password")
});

export function BasicForm() {
    const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: formValidationSchema,
        onSubmit: (values) => {
            console.log("Submited", values);
        }
    })
    return (
        <form className="basic-form" onSubmit={handleSubmit}>
            <h1>Basic Form</h1>
            <input
                type="email"
                value={values.email}
                placeholder="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {touched.email && errors.email ? errors.email : null}
            <br />
            <input
                type="text"
                value={values.password}
                placeholder="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {touched.password && errors.password ? errors.password : null}
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}
