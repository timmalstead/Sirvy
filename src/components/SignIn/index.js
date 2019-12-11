import React from 'react'

const SignIn = (props) => {
    return(
        <form onSubmit={props.signInOrSignUp}>
            {/* <h3>Sign In</h3> */}
            <input type='text' name='email' value={props.email} placeholder='Your Email' onChange={props.onChange}/>
            <input type='password' name='password' value={props.password} placeholder='Password' onChange={props.onChange}/>
            <input type='password' name='confirmPassword' value={props.confirmPassword} placeholder='Confirm Password' onChange={props.onChange}/>
            <button 
            type='submit' 
            disabled={props.isInvalid} 
            value='signIn'
            onMouseEnter={props.setSignInOrSignUp}>
            Sign In
            </button>
            <button type='button' onClick={props.changeSignInAndSignup}>
                {props.signingUp ? 'Sign In' : 'Sign Up'}
            </button>
        </form>
    )
}

export default SignIn