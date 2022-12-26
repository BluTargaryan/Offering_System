import { motion } from "framer-motion";
import styled from "styled-components";
import {  useNavigate } from "react-router-dom";

import React,{useEffect} from "react";
import { password } from "../password";
import {password2} from "../password2"
import {password3} from "../password3"

import Nav from '../comps/navlogin'
import bgimg from '../img/loginimg_desktop.png' 

const formBgColor = "#F8FFFA"
const darkColor = "#14532D"
const darkenColor = "#0A2715"




//to rectify else case 
const changeInput = () =>{
    document.getElementById('password').classList.remove("redded")  
}
const Login = () =>{
    //set navigate const
const navigate= useNavigate()
//prevent going back
useEffect(()=>{
    window.addEventListener('popstate', function(event) {
        navigate('/')
            });
})

//to login into home page
const loginFunc = (e) =>{
    //prevent form default behavior
    e.preventDefault();
    //check if password is equal to password
   let inputValue = document.getElementById('password').value
 
   if((inputValue===password)||(inputValue===password2)||(inputValue===password3)){
    if(inputValue===password){
        //navigate to home
        navigate('/home')
           }
            if(inputValue===password2){
        //navigate to home
        navigate('/home2')
           }
           if(inputValue===password3){
            //navigate to home
            navigate('/home3')
               }
   }else{
    document.getElementById('password').classList.add('redded')
    document.getElementById('password').value=""
    document.getElementById('password').placeholder="Incorrect password"
    }
   

}

    return(
        <StyledLogin>
<Nav/>
<Main>
    <div className="form-section">
<form action="submit" onSubmit={loginFunc}>
<div className="title">
    <h4>sign in</h4>
    <span/>
</div>

<input type="password" placeholder="Password" id="password" onClick={changeInput}/>

<button>Login</button>
</form>
    </div>
</Main>
        </StyledLogin>
    )
}


const StyledLogin = styled(motion.div)`
width:100% ;

`
const Main = styled(motion.div)`
width:100% ;
height:100vh;
background-image:linear-gradient( rgba(20,83,45,.65), rgba(20,83,45,.65)),url(${bgimg}) ;
background-size:cover ;
background-position:bottom ;
display:flex ;
justify-content:flex-end ;
.form-section{
    width:50% ;
    height:100%;
    background:${formBgColor} ;
    display:flex ;
    align-items:center ;
    justify-content:center ;
    

    form{
        display:flex ;
        flex-direction: column;
align-items: center;
padding: 0px;
gap: 76px;
width: 70%;

/*--Input error class--*/
.redded{
    border:2px solid red ;
    color:red ;
    content:"" ;
    &::placeholder{
        color: red;
    }
}

/*--Form elements--*/
.title{
    height:55px ;
    width:100% ;
    display:flex ;
    flex-direction:column ;
    align-items:flex-end ;
    justify-content:space-between ;
    

    h4{
        font-size:25px ;
        text-transform:uppercase ;
    }
    span{
        width:100% ;
        height:4px ;
        background:${darkColor} ;
    }
}

input{
    width:100% ;
    height:48px ;
    border-radius:10px ;
    border:2px solid ${darkColor} ;
    padding:10px 25px ;
    font-size: 25px;
    background:none ;

    
    &::placeholder{
        color:${darkColor} ;
        font-family:'HelveticaNeue Thin', sans-serif ;
    }
}

button{
    cursor: pointer;
    text-transform:uppercase ;
    width:100% ;
    height:60px ;
    background:${darkColor} ;
    color:${formBgColor} ;
    border:none ;
    font-size:25px ;
    border-radius:10px ;
    font-family:'HelveticaNeue Bold', sans-serif ;
    &:hover{
        background:${darkenColor} ;
    }
}
    }
}

@media only screen and (max-width: 480px){

    .form-section{
        width:100% ;
        padding:0 25px ;

        form{
            width:325px ;
            gap:40px;
            .title{
                align-items:center ;
                height: 46px;
            }
        }
    }
}

@media only screen and (min-width: 481px) and (max-width: 768px){
justify-content:center ;
align-items:center ;
padding:0 25px ;

.form-section{
    width:586px;
    height: 575px;
    padding:0 25px ;


    form{
        width: 470px;
        gap:76px;
    }
}
}

@media only screen and (min-width: 769px) and (max-width: 1024px){
justify-content:center ;
align-items:center ;

.form-section{
    
    width:586px;
    height: 575px;

    form{
        width: 470px;
        gap:76px;
    }
}
}

@media only screen and (min-width: 1025px) and (max-width: 1200px){


.form-section{
    form{
        width: 70%;
    }
}
}
`

export default Login;