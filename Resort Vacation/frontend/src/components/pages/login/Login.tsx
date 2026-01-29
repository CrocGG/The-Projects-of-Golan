import { useForm } from "react-hook-form";
import { UserLoginModel } from "../../../models/UserLogin";
import useTitle from "../../../hooks/use-title";
import { useContext } from "react";
import AuthContext from "../../auth/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css"
import useService from "../../../hooks/use-service";
import AuthService from "../../../services/AuthService";


export default function Login() {

    useTitle('Login');

    const { register, handleSubmit, formState } = useForm<UserLoginModel>();

    const authContext = useContext(AuthContext);

    const authService = useService(AuthService);

    const navigate = useNavigate()
    
    async function submit(login: UserLoginModel) {
        try {
            const { jwt } = await authService.login(login);
            authContext?.newJwt(jwt);
            navigate('/vacation')
        } catch (error) {
            alert('Something messes up with your login - either you do not exist or your mail construction is corrupted')
            console.log(error)
        }
    }

    return (
        <div className='Login'>
            <h1>Resort Website Login</h1>
            <form onSubmit={handleSubmit(submit)}>
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
                        message: 'Password is required'
                    },
                    minLength: {
                        value: 4,
                        message: 'Password must have at least four characters'
                    }
                })} /></label>
                <div className='formError'>{formState.errors.password?.message}</div>
                <button type="submit" className='login-button'>Login</button>
            </form>
            <div>
                <h4>Not a member? So <NavLink to="/sign-up">sign up</NavLink>!</h4>
            </div>
        </div>
    );
}