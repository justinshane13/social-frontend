import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const {signup, error, isLoading} = useSignup()
    const {dispatch} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, password)
    }

    const handleGuest = async (e) => {
        e.preventDefault()

        dispatch({type: 'GUEST', payload: null})
    }

    return (
        <div className="login-page">
            <div className="login-page-header">
                <img className='login-social-logo-corner' src='images/Social-Logo.png' alt='Social logo' />
                <div className="login-social-title-corner">Active</div>
            </div>
            <form className="login" onSubmit={handleSubmit}>
                <img className='login-social-logo' src='images/Social-Logo.png' alt='Social logo' />
                <h3 className="login-title">Sign up</h3>
                <p className="login-to-signup">Already have an account? <Link to="/login" className="link">Log in</Link></p>
                <input 
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    placeholder="Username"
                />
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {error && <div className="error-text">{error}</div>}
                {isFocused && <div className="password-requirements">Note: password must include an uppercase letter, lowercase letter, number, and special character.</div>}
                <button>Sign up</button>
                <div className="guest-button" onClick={handleGuest}>Continue as guest</div>
            </form>
        </div>
    )
}

export default Signup