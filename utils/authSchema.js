import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().required('Password is required').min(6, 'Password must be atleast 6 characters long'),
})