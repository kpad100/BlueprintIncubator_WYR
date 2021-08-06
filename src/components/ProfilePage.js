import { Link } from "react-router-dom";
import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { db, myFirebase } from "../firebase/firebase";
import { height, sizing } from "@material-ui/system";
import { auth } from "firebase-admin";

const styles = () => {
    
}

const ProfilePage = () => {
  
    let user =myFirebase.auth().currentUser;
    if (user){
        let email = user.email;
        let firstName=user.displayName;
        let photoURL=user.photoURL;
    }
    return (
        <div>
            <header>
                <img src="https://cdn.discordapp.com/attachments/812822571094900746/837106499863969812/wyr_transparent.png" height="50"
            style={{
                position: "left",
              marginLeft: "5px",
              marginRight: "auto",
              marginTop: "5px",
            }}
            alt=""></img>
            </header>
            <h1 style={{textAlign:"center"}}>Edit Profile</h1>
            <br></br>
            <br></br>
            <div class="button" style={{position:"stretched"}}>
            <button style={{height: "40px", width: "200px",outline:"none", textAlign: "center", borderRadius:"24px", backgroundColor:"#fb9263", color:"white", alignItems:"center", position:"center"}}>Year</button>
            <br></br>
            <button style={{height: "40px", width: "200px", textAlign: "center", borderRadius:"24px", backgroundColor:"#fb9263", justifyContent:"center", color:"white"}}>Major</button>
            <button style={{height: "40px", width: "200px", textAlign: "center", borderRadius:"24px", backgroundColor:"#fb9263", justifyContent:"center", color:"white"}}>Minor</button>
            <br></br>
            <button style={{height: "40px", width: "200px", textAlign: "center", borderRadius:"24px", backgroundColor:"#4198b5", justifyContent:"center", color:"white"}}>Class 1</button>
            <button style={{height: "40px", width: "200px", textAlign: "center", borderRadius:"24px", backgroundColor:"#4198b5", justifyContent:"center", color:"white"}}>Class 2</button>
            <button style={{height: "40px", width: "200px", textAlign: "center", borderRadius:"24px", backgroundColor:"#4198b5", justifyContent:"center", color:"white"}}>Class 3</button>
            <br></br>
            <button style={{height: "40px", width: "200px", textAlign: "center", borderRadius:"24px", backgroundColor:"#75c1dc", justifyContent:"center", color:"white"}}>Club 1</button>
            <button style={{height: "40px", width: "200px", textAlign: "center", borderRadius:"24px", backgroundColor:"#75c1dc", justifyContent:"center", color:"white"}}>Club 2</button>
            </div>
            
        </div>
    );
}

export default ProfilePage

