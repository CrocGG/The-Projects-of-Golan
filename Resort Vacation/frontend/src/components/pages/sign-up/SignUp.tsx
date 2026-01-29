import { useForm } from "react-hook-form";
import useTitle from "../../../hooks/use-title";
import { useContext } from "react";
import AuthContext from "../../auth/AuthContext";
import { UserSignUpModel } from "../../../models/UserSignUp";
import { NavLink, useNavigate } from "react-router-dom";
import "./SignUp.css"
import useService from "../../../hooks/use-service";
import AuthService from "../../../services/AuthService";



export default function SignUp() {

    useTitle('Sign-Up');

    const { register, handleSubmit, formState } = useForm<UserSignUpModel>();

    const authContext = useContext(AuthContext);

    const authService = useService(AuthService);

    const navigate = useNavigate()

    async function submit(signUp: UserSignUpModel) {
        try {
            const { jwt } = await authService.signUp(signUp);
            authContext?.newJwt(jwt);
            navigate('/vacation');
        } catch (error) {
            alert('Email must be both unique and valid: the local part without spaces/special characters, a "@" in the middle, and a top-level domain name');
            console.log(error)
        }
    }

    return (
        <div className='singUp'>
            <h1>Resort Website Sign-Up</h1>
            <form onSubmit={handleSubmit(submit)}>
                <label>First Name: <input type="text" {...register('firstName', {
                    required: {
                        value: true,
                        message: 'First name is required'
                    }
                })} /></label>
                <div className='formError'>{formState.errors.firstName?.message}</div>
                <label>Last Name: <input type="text" {...register('lastName', {
                    required: {
                        value: true,
                        message: 'Last Name is required'
                    }
                })} /></label>
                <div className='formError'>{formState.errors.lastName?.message}</div>
                <label>E-Mail: <input type="email" {...register('email', {
                    required: {
                        value: true,
                        message: 'Email is required'
                    }
                })} /></label>
                <div className='formError'>{formState.errors.email?.message}</div>
                <label>Password: <input type="password" {...register('password', {
                    required: {
                        value: true,
                        message: 'Name is required'
                    },
                    minLength: {
                        value: 4,
                        message: 'Password must have at least four characters'
                    }
                })} /></label>
                <div className='formError'>{formState.errors.password?.message}</div>
                <button type="submit" className='sign-up-button'>Sign Up</button>
            </form>
            <div>
                <h4>Want to <NavLink to="/login">login</NavLink> instead? </h4>
            </div>
        </div>
    );
}