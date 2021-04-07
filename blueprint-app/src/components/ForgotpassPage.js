import { useState, Component } from 'react'
import { Grid, TextField, Button, FormHelperText, FormControl } from '@material-ui/core'
import {  passwordReset } from '../actions';


const ForgotpassPage = ( props ) => {
    const [email, setEmail] = useState('')
    let emailMatch = false;
    let buttonDisabled = false;

    if(setEmail === email && email.length > 0)
        emailMatch = true

    const onSubmit = (e) => {
        e.preventDefault();
        
        //dispatch(passwordReset(email));
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
            <h1>Forgot Password</h1>
            <form onSubmit={onSubmit}>
                {!emailMatch && <FormHelperText style={{color: 'black', marginBottom:'7px'}}>
                    Enter your email
                </FormHelperText>}
                <FormControl>
                    <TextField 
                        required 
                        label='Email' 
                        id='email_field'
                        variant='outlined' 
                        style={{marginBottom:'7px'}} 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <Button 
                        id="#btn-forgotPass"
                        variant='contained' 
                        color='primary' 
                        type='submit'
                        style={{marginBottom:'7px'}} 
                        disabled={buttonDisabled} 
                    >
                        Send email
                    </Button>
                </FormControl>
            </form>
        </Grid>
    )
}



export default ForgotpassPage

