import { Link } from 'react-router-dom'
import { useState, useEffect} from 'react'
import { Grid, TextField, Button, FormHelperText, FormControl, Card } from '@material-ui/core'
import {signupWithEmailPassword} from '../actions/auth'

function email_test(email, emailcheck)
{


}
const SignupPage = ( props ) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    let passMatch = true;
    let buttonDisabled = true;
    let emailcheck = true;
    let password_length_check = true;
    let uppercase = true;
    let lowercase = true;
    const email_postfix1 = '@scarletmail.rutgers.edu';
    const email_postfix2 = '@rutgers.edu';
    // let email_test = false;
    // let password_test = false;


    //allow submission only when all fields are filled and password match
    //1.validity of email address
    let email_postfix = email.substring(email.indexOf('@'), email.length);
    if(email.length>0)
    {
        if(email_postfix !== email_postfix1 && email_postfix !== email_postfix2)
        {
            emailcheck = false;
        }
        else
        {
            emailcheck = true;
            if(password.length > 0 && password.length <=6)
        {   
            password_length_check = false;
            // test_clear = false;
            // // password_test = password_test && false;
        }
        else if(password > 6)
        {
            password_length_check = true;
            var i = 0;
            var temp1 = false;
            var temp2 = false;
            while(i <= password.length)
            {
                if(!isNaN(password.charAt(i)*1))
                {
                    i++;
                    continue;
                }
                else if(password.charAt(i).toUpperCase === password.charAt(i))
                {
                    temp1 = true;
                    i++;
                    continue;
                }
                else if((/[a-z]/).test(password.charAt(i)))
                {
                    temp2 = true;
                }
                i++;
            }
            uppercase = temp1;
            lowercase = temp2;
            alert(lowercase);
            // password_test = uppercase && lowercase && password_test;
            // test_clear = test_clear && uppercase && lowercase;
            if(uppercase && lowercase && confirmPassword > 0)
            {
                if(password !== confirmPassword)
                {   
                    // password_test = password_test && true;
                    passMatch = false;
                }
                else
                {
                    passMatch = true;
                    if(email.length>0 && password.length>6 && confirmPassword.length>6 && username.length>0 && lastName.length>0 && firstName.length>0 && passMatch && password_length_check && email && uppercase && lowercase)
                    {
                        buttonDisabled = false;
                    }
                }
            }
        }
    }
    }


    const onSubmit = (e) => {
        e.preventDefault()
        signupWithEmailPassword(email, password)
        props.history.push('/dashboard')
    }


        return(
             <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
            <Card>
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <h1>Sign Up</h1>
                <form onSubmit={onSubmit}>
                    <FormControl style={{minWidth:'25vw', padding:'15px'}}>
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
                            // onChange={(e, emailcheck) => email_test(e.target.value, emailcheck)} 
                        />
                        {/* {emailcheck && <FormHelperText style={{color: 'red', marginBottom:'7px', alignSelf:'left'}}>
                            Please use a rutgers email
                        </FormHelperText>} */}
                        {!emailcheck && <FormHelperText style={{color: 'red', marginBottom:'7px', alignSelf:'center'}}>
                            You have to use a rutgers email
                        </FormHelperText>}
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
                        {!password_length_check && <FormHelperText style={{color: 'red', marginBottom:'7px', alignSelf:'center'}}>
                            please enter a password longer than six digits
                        </FormHelperText>}
                        {!(uppercase && lowercase) && <FormHelperText style={{color: 'red', marginBottom:'7px', alignSelf:'center'}}>
                            Include at least one uppercase and one lower case letter
                        </FormHelperText>}
                        <TextField 
                            required 
                            type='password'
                            label='Re-enter Password'  
                            variant='outlined'
                            style={{marginBottom:'7px'}} 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                        {!passMatch && <FormHelperText style={{color: 'red', marginBottom:'7px', alignSelf:'center'}}>
                            Passwords Do Not Match
                        </FormHelperText>}
                        <Button 
                            variant='contained' 
                            color='primary' 
                            type='submit'
                            // onClick = {calltest}
                            disabled={buttonDisabled} 
                        >   
                            Create
                        </Button>
                    </FormControl>
                </form>
                <footer style={{marginBottom:'15px'}}>
                    Already a member? <Link to='/login'>Log in</Link>
                </footer>
            </Grid>
            </Card>
            </Grid>
        )
//    render(<Rendering/>, document.getElementById('root'));
//         var test_clear;
//     function calltest(){
//         test_clear = false;
//         render(<Rendering/>,  render(<Rendering/>, document.getElementById('root')));        
//         test(test_clear)
//         if(test_clear)
//         {
//             onSubmit();
//         }
//     }

}


export default SignupPage
