import { Link } from 'react-router-dom'
import { Grid, Button, ButtonGroup } from '@material-ui/core'

const StartPage = () => {
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
            <ButtonGroup orientation='vertical'>
                <Button variant='contained'>
                    <Link to='/login' style={{textDecoration: 'none'}} >Login</Link>
                </Button>
                <Button variant='contained'>
                    <Link to='/signup' style={{textDecoration: 'none'}} >Sign up</Link>
                </Button>
            </ButtonGroup>
        </Grid>
        
    )
}

export default StartPage
