import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Grid, TextField, Button, FormHelperText, FormControl } from '@material-ui/core'

const LoginPage = ( props ) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [help, setHelp] = useState(false)
    
    const onSubmit = (e) => {
        // users.forEach(user => {
        //     if(user.username === username && user.password === password) {
        //         proceedToWelcome='/welcome'
        //     }
        // });
        e.preventDefault()
        if(username === 'admin' && password === 'test') {
            props.history.push('/welcome')
        } 
        else{
            setUsername('')
            setPassword('')
            setHelp(true)
        }
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
            <img 
                src='https://se-infra-imageserver2.azureedge.net/clink/images/12e150ea-c835-422a-a07b-8498f3af3d942c70b420-5a42-46c4-8de4-c249585563c9.png?preset=med-sq' 
                height='80' 
                alt=''
            />
            <h1>Log In</h1>
            {help && <FormHelperText style={{color: 'red', marginBottom:'7px'}}>
                Invalid Username/Password combo. Please try again.
            </FormHelperText>}
            <form onSubmit={onSubmit}>
                <FormControl>
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
                    <Button 
                        variant='contained' 
                        type='submit'
                        style={{marginBottom:'7px' }} 
                        color='primary' 
                    >
                        Sign In
                    </Button>
                </FormControl>
            </form>
            <Link to='/forgotpassword'>Forgot password?</Link>
            <footer style={{marginTop:'7px'}}>
                Not a member? <Link to='/signup'>Sign up</Link>
            </footer>
        </Grid>
    )
}

export default LoginPage
