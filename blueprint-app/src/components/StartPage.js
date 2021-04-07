import { Redirect } from 'react-router-dom'
import { Component } from 'react'
import { Grid, Button, ButtonGroup, Card } from '@material-ui/core'

class StartPage extends Component {
    state = {directToLogin: false, directToSignup:false};

    handleLoginClick = () => {
        this.setState({directToLogin:true})
    }

    handleSignupClick = () => {
        this.setState({directToSignup:true})
    }

    render() {
        if(this.state.directToLogin === true)  
            return <Redirect to='/login' />

        if(this.state.directToSignup === true)  
            return <Redirect to='/signup' />
        
        return (
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
                style={{ minWidth: '30vw', padding:'15px' }}
            >
                <img 
                    src='https://se-infra-imageserver2.azureedge.net/clink/images/12e150ea-c835-422a-a07b-8498f3af3d942c70b420-5a42-46c4-8de4-c249585563c9.png?preset=med-sq' 
                    height='80' 
                    style={{marginTop: '15px', marginBottom:'15px'}}
                    alt=''
                />
                <ButtonGroup orientation='vertical' fullWidth style={{marginBottom:'15px'}}>
                    <Button variant='contained' color='primary' style={{padding:'15px'}} onClick={this.handleLoginClick}>
                        Login
                    </Button>
                    <Button variant='contained' color='primary' style={{padding:'15px'}} onClick={this.handleSignupClick}>
                        Sign up
                    </Button>
                </ButtonGroup>
            </Grid>
            </Card>
            </Grid>
        )
    }
}

export default StartPage
