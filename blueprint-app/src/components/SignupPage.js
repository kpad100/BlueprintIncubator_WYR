import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Grid, TextField, Button, Container } from '@material-ui/core'

const SignupPage = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    let passMatch = false;
    let buttonDisabled = true;
    let passHelpText = ''

    if(confirmPassword === password && password.length > 0)
        passMatch = true

    if(firstName.length>0 && lastName.length>0 && email.length>0 && username.length>0 && passMatch)
        buttonDisabled = false;

    if(!passMatch)
        passHelpText = 'Passwords Do Not Match'

    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        >
            <img 
                src='https://se-infra-imageserver2.azureedge.net/clink/images/12e150ea-c835-422a-a07b-8498f3af3d942c70b420-5a42-46c4-8de4-c249585563c9.png?preset=med-sq' 
                height='80' 
                style={{marginBottom:'10px'}}
                alt=''
            />
            <Container style={{marginBottom:'10px'}}>
                <TextField 
                    required
                    label='First Name' 
                    variant='outlined' 
                    fullWidth 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                />
                <TextField 
                    required 
                    label='Last Name' 
                    variant='outlined' 
                    fullWidth
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}  
                />
                <TextField 
                    required 
                    label='Email' 
                    variant='outlined' 
                    fullWidth 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <TextField 
                    required 
                    label='Username' 
                    variant='outlined' 
                    fullWidth 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <TextField 
                    required 
                    type='password'
                    label='Password' 
                    variant='outlined' 
                    fullWidth 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <TextField 
                    required 
                    type='password'
                    label='Re-enter Password'  
                    variant='outlined'
                    fullWidth 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    helperText={passHelpText}
                />
            </Container>
            <Button variant='contained' style={{marginBottom:'10px'}} disabled={buttonDisabled} >
                <Link to='/welcome'>Create</Link>
            </Button>
            <footer>
                Already a member? <Link to='/login'>Log in</Link>
            </footer>
        </Grid>
    )
}

export default SignupPage
