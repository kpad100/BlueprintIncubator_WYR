import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Grid, TextField, Button, Container, FormHelperText } from '@material-ui/core'

const SignupPage = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    let passMatch = false;
    let buttonDisabled = true;
    let buttonColor='secondary'

    if(confirmPassword === password && password.length > 0)
        passMatch = true

    if(firstName.length>0 && lastName.length>0 && email.length>0 && username.length>0 && passMatch)
        buttonDisabled = false;

    if(!buttonDisabled)
        buttonColor='primary'

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
            <Container style={{maxWidth: '600px'}} >
                {!passMatch && <FormHelperText style={{color: 'red', marginBottom:'7px'}}>
                        Passwords Do Not Match
                </FormHelperText>}
                <TextField 
                    required
                    label='First Name' 
                    variant='outlined' 
                    style={{marginBottom:'7px'}}
                    fullWidth 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                />
                <TextField 
                    required 
                    label='Last Name' 
                    variant='outlined' 
                    style={{marginBottom:'7px'}}
                    fullWidth
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}  
                />
                <TextField 
                    required 
                    label='Email' 
                    variant='outlined' 
                    style={{marginBottom:'7px'}}
                    fullWidth 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <TextField 
                    required 
                    label='Username' 
                    variant='outlined' 
                    style={{marginBottom:'7px'}}
                    fullWidth 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <TextField 
                    required 
                    type='password'
                    label='Password' 
                    variant='outlined' 
                    style={{marginBottom:'7px'}}
                    fullWidth 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <TextField 
                    required 
                    type='password'
                    label='Re-enter Password'  
                    variant='outlined'
                    style={{marginBottom:'7px'}}
                    fullWidth 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                <Button 
                    variant='contained' 
                    style={{marginBottom:'7px' }} 
                    color='primary' 
                    href='/welcome' 
                    fullWidth 
                    disabled={buttonDisabled} 
                >
                    Create
                </Button>
            </Container>
            <footer>
                Already a member? <Link to='/login'>Log in</Link>
            </footer>
        </Grid>
    )
}

export default SignupPage
