import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Grid, TextField, Button, Container, FormHelperText } from '@material-ui/core'

const LoginPage = ( {users} ) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let proceedToWelcome = '';

    const onClick = (e) => {
        // users.forEach(user => {
        //     if(user.username === username && user.password === password) {
        //         proceedToWelcome='/welcome'
        //     }
        // });
        if(username === 'admin' && password === 'test') {
            proceedToWelcome='/welcome' //this doesn't work rn for some reason
        }
    }
    
    console.log(username)
    console.log(password)
    console.log(proceedToWelcome)
        
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
                alt=''
            />
            <h1>Log In</h1>
            <Container style={{ maxWidth: '600px' }}>
                {/* {<FormHelperText style={{color: 'red', marginBottom:'7px'}}>
                    Invalid Username/Password combo. Please try again.
                </FormHelperText>} */}
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
                <Button 
                    variant='contained' 
                    style={{marginBottom:'7px' }} 
                    color='primary' 
                    href={proceedToWelcome} 
                    fullWidth 
                    onClick={onClick}
                >
                    Sign In
                </Button>
            </Container>
            <Link to='/forgotpassword'>Forgot password?</Link>
            <footer style={{marginTop:'7px'}}>
                Not a member? <Link to='/signup'>Sign up</Link>
            </footer>
        </Grid>
    )
}

export default LoginPage
