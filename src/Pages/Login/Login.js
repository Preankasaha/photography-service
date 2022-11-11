import { GoogleAuthProvider, signOut } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';

const Login = () => {
    const { loginUser, providerSignIn, loading, user } = useContext(AuthContext);

    //goggle provider
    const googleProvider = new GoogleAuthProvider();

    const [error, setError] = useState();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // page title
    useTitle('LogIn');

    //loader added
    if (loading) {
        return <progress className="progress w-full"></progress>
    }
    const handleLogIn = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        //log in user
        loginUser(email, password)
            .then(result => {
                if (loading) {
                    return <progress className="progress w-full"></progress>
                }
                const user = result.user;
                console.log(user);
                form.reset();
                setError('');
                navigate(from, { replace: true });
            })

    }

    //sign in with google
    const handleGoogleSignIn = () => {
        providerSignIn(googleProvider)
            .then(result => {
                const user = result.user
                setError('');
                navigate(from, { replace: true });
            }).catch(error => {
                setError(error.message);
            })
    }

    return (
        <div>
            <div className="hero min-h-screen" data-theme="night">
                <div className="hero-content flex-col lg:flex-row glass">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-fuchsia-900">
                        <form onSubmit={handleLogIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className='text-xl text-white'>
                                {error}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary glass">Log In</button>
                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handleGoogleSignIn} className="btn btn-primary glass">Log In With Google</button>
                            </div>
                            <div>
                                If you are new to this site <Link to='/signup' className='btn btn-outline glass'>Sign Up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;