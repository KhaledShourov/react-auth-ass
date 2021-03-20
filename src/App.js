import logo from './logo.svg';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//   Button
// } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import React, {
  useState,
} from 'react';
import firebaseConfig from './firebase.config';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

firebase.initializeApp(firebaseConfig)

function App() {

  const [user, setUser] = useState({
    isSignedIn:false,
    name: '',
    email: '',
    photo: '',
    password: ''
  })

   var provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn =()=>{
firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
        var token = credential.accessToken;
    var user = result.user;
    console.log(user)
    setUser(user)
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage, email, credential)
  });
  }
 
const handleBlur =(event)=>{
  let isFormValid = true;
  if(event.target.name ==='email'){
   isFormValid = /\S+@\S+\.\S+/.test(event.target.value)
  }
  if(event.target.name ==='password'){
    const isPassValid = event.target.value.length>5;
    const passHasNumber = /\d{1}/.test(event.target.value);
    isFormValid = (isPassValid && passHasNumber)
  }
  if(isFormValid){
    const newUserInfo={...user};
    newUserInfo[event.target.name] = event.target.value;
    setUser(newUserInfo)
  }
}
const handleSubmit = ()=>{

}

  return (
    <div className="App">
       <Home/>
      <Login/>
      <h3>Sign Up</h3>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <form onSubmit ={handleSubmit}>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email" required/> <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required/> <br/>
        <button type="submit">Sign Up</button> <br/>
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>

        {/* <Button variant="primary">
  <span className="sr-only">unread messages</span>
</Button> */}
      </form>
     <h4>Email: {user.email}</h4>
     <img src={user.photoURL} alt=""/>
     
    </div>
  );
}

export default App;
