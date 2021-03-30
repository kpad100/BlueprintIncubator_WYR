import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Grid, TextField, Button, FormHelperText, FormControl } from '@material-ui/core'

const SignupPage = ( props ) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    let passMatch = false;
    let buttonDisabled = true;

    if(confirmPassword === password && password.length > 0)
        passMatch = true

    if(firstName.length>0 && lastName.length>0 && email.length>0 && username.length>0 && passMatch)
        buttonDisabled = false;

    const onSubmit = (e) => {
        e.preventDefault()
        props.history.push('/welcome')
    }

    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        >
            <h1>Sign Up</h1>
            <form onSubmit={onSubmit}>
                {!passMatch && <FormHelperText style={{color: 'red', marginBottom:'7px'}}>
                    Passwords Do Not Match
                </FormHelperText>}
                <FormControl>
                    <TextField 
                        required
                        label='First Name' 
                        variant='outlined' 
                        style={{marginBottom:'7px'}} 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                    />
                    <TextField 
                        required 
                        label='Last Name' 
                        variant='outlined' 
                        style={{marginBottom:'7px'}}
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}  
                    />
                    <TextField 
                        required 
                        label='Email' 
                        variant='outlined' 
                        style={{marginBottom:'7px'}} 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <TextField 
                        required 
                        label='Username' 
                        variant='outlined' 
                        style={{marginBottom:'7px'}} 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <TextField 
                        required 
                        type='password'
                        label='Password' 
                        variant='outlined' 
                        style={{marginBottom:'7px'}} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <TextField 
                        required 
                        type='password'
                        label='Re-enter Password'  
                        variant='outlined'
                        style={{marginBottom:'7px'}} 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    <Button 
                        variant='contained' 
                        color='primary' 
                        type='submit'
                        style={{marginBottom:'7px'}} 
                        disabled={buttonDisabled} 
                    >
                        Create
                    </Button>
                </FormControl>
            </form>
            <footer>
                Already a member? <Link to='/login'>Log in</Link>
            </footer>
        </Grid>
    )
}

export default SignupPage
