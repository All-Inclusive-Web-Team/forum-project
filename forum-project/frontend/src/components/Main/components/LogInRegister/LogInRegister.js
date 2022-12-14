import './logInRegister.css'
import { useReducer, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const ACTIONS = {
    REGISTER_SUBMIT: 'registration-submit',
    LOGIN_SUBMIT: 'login-submit',
    CLEAR: 'clear'
}

const LogInRegister = () => {
    const [loading, setLoading] = useState(null)
    const [formResponse, setFormResponse] = useState(null)
    const navigate = useNavigate()


    const formReducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.REGISTER_SUBMIT :
                return {...state, registerForm: {...state.registerForm, [action.field]: action.payload}}
            case ACTIONS.LOGIN_SUBMIT:
                return {...state, logInForm: {...state.logInForm, [action.field]: action.payload}}
            case ACTIONS.CLEAR:
                return init()
            default: 
                return state
        }
    }

    function init() {
        return {
            registerForm: {
                name: '',
                userEmail: '',
                userPassword: '',
            },
            logInForm: {
                userEmail: '',
                userPassword: '',
            }
        }
    }
    
    const [formData, dispatch] = useReducer(formReducer, {
        registerForm: {
            userEmail: '',
            userPassword: '',
            name: ''
        },
        logInForm: {
            userEmail: '',
            userPassword: '',
        }
    })

    function handleRegisterTextChange(e) {
        dispatch({
            type: ACTIONS.REGISTER_SUBMIT, 
            field: e.target.name,
            payload: e.target.value
        })
    }

    function handleLogInTextChange(e) {
        dispatch({
            type: ACTIONS.LOGIN_SUBMIT, 
            field: e.target.name,
            payload: e.target.value
        })
    }

    const regsiter = async () => {
        setLoading('Loading...')
        try {
            const result = await axios.post('http://localhost:3001/register', {
                userEmail: formData.registerForm.userEmail,
                userPassword: formData.registerForm.userPassword,
                name: formData.registerForm.name
            })
            if (result.status === 200) {
                setFormResponse('Account Created, please log in')
                dispatch({type: ACTIONS.CLEAR})
                setTimeout(() => {
                    setFormResponse(null)
                },4000)
            }
            setLoading(null)
        } catch (error) {
            console.log(error)
        }
    }

    const logIn = async () => {
        setLoading('Loading...')
        try {
            const result = await axios.post('http://localhost:3001/log-in', {
                email: formData.logInForm.userEmail,
                password: formData.logInForm.userPassword,
            }, {withCredentials: true})
            dispatch({type: ACTIONS.CLEAR})
            setLoading(null)
            return result 
        } catch (error) {
            console.log(error)
        }
    }

    const handleLoginOnSubmit = async (e) => {
        e.preventDefault()
        const results = await logIn()
        if (results.data.success === true) {
            navigate(-1)
        } else {
            setFormResponse(results.data.msg)
        }
    }


    return (
        <div className="log-in-register">
            <Link to='/' style={{textDecoration: 'none'}}><FontAwesomeIcon icon={faXmark} className="login-register-page-exit-btn"/></Link>
            <div className="form-response">{formResponse}</div>
            <div className="log-in-register-wrap">
                <form className='log-in-form' onSubmit={e => handleLoginOnSubmit(e)}>
                    <h3 className='log-in-register-header'>Log In</h3>
                    <div className="log-in-register-form-label-input-pair">
                        <div className="log-in-register-form-label">
                            <label htmlFor="userEmail">Email</label>
                        </div>
                        <div className="log-in-register-form-input">
                            <input type="email" name="userEmail" value={formData.logInForm.userEmail} onChange={handleLogInTextChange}/>
                        </div>
                    </div>
                    <div className="log-in-register-form-label-input-pair">
                        <div className="log-in-register-form-label">
                            <label htmlFor="userPassword">Password</label>
                        </div>
                        <div className="log-in-register-form-input">
                            <input type="password" name='userPassword' value={formData.logInForm.userPassword} onChange={handleLogInTextChange}/>
                        </div>
                    </div>
                    <div className="log-in-register-form-submit-btn-wrap">
                        <button className="log-in-and-register-btn">Log in</button>
                    </div>
                </form>
                <form className='register-form' onSubmit={(e) => {
                    e.preventDefault()
                    regsiter()
                }}>
                    <h3 className='log-in-register-header'>Register</h3>
                    <div className="log-in-register-form-label-input-pair">
                        <div className="log-in-register-form-label">
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="log-in-register-form-input">
                            <input type="text" name="name" value={formData.registerForm.name} onChange={handleRegisterTextChange} required/>
                        </div>
                    </div>
                    <div className="log-in-register-form-label-input-pair">
                        <div className="log-in-register-form-label">
                            <label htmlFor="userEmail">Email</label>
                        </div>
                        <div className="log-in-register-form-input">
                            <input type="email" name="userEmail" value={formData.registerForm.userEmail} onChange={handleRegisterTextChange} required/>
                        </div>
                    </div>
                    <div className="log-in-register-form-label-input-pair">
                        <div className="log-in-register-form-label">
                            <label htmlFor="userPassword">Password</label>
                        </div>
                        <div className="log-in-register-form-input">
                            <input type="password" name='userPassword' value={formData.registerForm.userPassword} onChange={handleRegisterTextChange} required/>
                        </div>
                    </div>
                    <div className="log-in-register-form-submit-btn-wrap">
                        <button className="log-in-and-register-btn">Register</button>
                    </div>
                </form>
                {
                    loading && <div className="loading">{loading}</div>
                }
            </div>
        </div>
    )
}

export default LogInRegister