import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../_actions';

const LoginPage = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const {username, password} = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const {from} = location.state || {from: {pathname: "/home"}};
            dispatch(userActions.login(username, password, from, navigate));
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-8" style={{backgroundColor: '#efefef'}}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="container table-container">
                                <div className="row form-row"
                                     style={{color: '#fff', backgroundColor: '#2a4262', padding: '0.25em'}}>
                                    <div className="col-md-6 text-center" style={{marginTop: '0.25em'}}>
                                        <h4>Techsophy Token Management Admin</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8" style={{backgroundColor: '#efefef'}}>
                    <div className="row">
                        <div className="col-md-6" style={{borderRight: '4px solid #fff'}}>
                            <div className="container table-container">
                                <div className="row"
                                     style={{color: '#000', backgroundColor: '#efefef'}}>
                                    <div className="col-md-12">
                                        <p>
                                            Hi Guest,<br/>
                                            Welcome to Techsophy Token Management, configuration Administration.<br/>
                                            Its a enables you to attach the Token management with any pre-existing
                                            application.<br/><br/>
                                            Please login yourself to start the configuration.<br/><br/>
                                            Thanking You.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="container table-container">
                                <div style={{backgroundColor: '#fff'}}>
                                    <div style={{backgroundColor: '#efefef'}}>
                                        <div className="row form-row">
                                            <div className="col-md-12">
                                                Provide your credentials
                                            </div>
                                        </div>
                                        <hr/>
                                        <form name="form" onSubmit={handleSubmit}>
                                            <div className="row form-row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text required"
                                                                      id="username">User Name</span>
                                                            </div>
                                                            <input type="text" id="username" name="username"
                                                                   value={username} onChange={handleChange}
                                                                   className={'form-control' + (submitted && !username ? ' is-invalid' : '')}/>
                                                            {submitted && !username &&
                                                                <div className="invalid-feedback">Username is
                                                                    required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text required"
                                                                      id="password">Password</span>
                                                            </div>
                                                            <input type="password" id="password" name="password"
                                                                   value={password} onChange={handleChange}
                                                                   className={'form-control' + (submitted && !password ? ' is-invalid' : '')}/>
                                                            {submitted && !password &&
                                                                <div className="invalid-feedback">Password is
                                                                    required</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row form-row">
                                                <div className="form-group  text-end">
                                                    <button className="btn btn-primary">
                                                        {loggingIn && <span
                                                            className="spinner-border spinner-border-sm mr-1"></span>}
                                                        Login
                                                    </button>
                                                    {/*<Link to="/register" className="btn btn-link">Register</Link>*/}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8" style={{backgroundColor: '#efefef'}}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="container table-container">
                                <div className="row form-row"
                                     style={{color: '#fff', backgroundColor: '#2a4262', padding: '0.25em'}}>
                                    <div className="col-md-12 text-end" style={{marginTop: '0.25em'}}>
                                        Techsophy @Copyright 2022
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;