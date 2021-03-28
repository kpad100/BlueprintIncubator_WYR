import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'

const LoginPage = ( {users} ) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let correctCredentials = false

    const onClick = (e) => {
        // users.forEach(user => {
        //     if(user.username === username && user.password === password) {
        //         correctCredentials = true;
        //         console.log('correct creds')
        //     }
                
        // });
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
                style={{marginBottom:'10px'}}
                alt=''
            />
            <div style={{marginBottom:'10px'}}>
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
            </div>
            <Button variant='contained' style={{marginBottom:'10px'}} onClick={onClick}>
                Sign in
                {/* {{correctCredentials} && <Link to='/welcome' /> } */}
            </Button>
            <Link to='/forgotpassword'>Forgot password?</Link>
            <footer style={{marginTop:'10px'}}>
                Not a member? <Link to='/signup'>Sign up</Link>
            </footer>
        </Grid>
    )
}

export default LoginPage
