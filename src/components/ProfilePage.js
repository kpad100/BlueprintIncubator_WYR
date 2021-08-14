import { Link } from "react-router-dom";
import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { db, myFirebase } from "../firebase/firebase";
import { height, sizing } from "@material-ui/system";
import { auth } from "firebase-admin";
import './profilePage.css';  


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
            <div class="content">
            <h1 style={{textAlign:"center"}}>Edit Profile</h1>
            <br></br>
            <br></br>
            <form>
            <div class="button" >
            <button class="buttonYear">Year</button>
            <br></br>
            <button class="buttonMajor">Major</button>
            <button class="buttonMinor">Minor</button>
            <br></br>
            <button class="buttonClass">Class 1</button>
            <button class="buttonClass">Class 2</button>
            <button class="buttonClass">Class 3</button>
            <br></br>
            <button class="clubButton" >Club 1</button>
            <button class="clubButton">Club 2</button>
            </div>  
            </form>
            
            <form>
            <h3>Personal Biography</h3>
            <textarea id="personalBio" name="personalBio" rows="10" cols="50"></textarea>
            </form>
            </div>
            
            
        </div>
    );
}

export default ProfilePage
