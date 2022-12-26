import { motion } from "framer-motion";
import styled from "styled-components";
import logo from '../img/logo.png'
import React,{useEffect} from "react";
import {  useNavigate } from "react-router-dom";

const bgColor= "#14532D";
const darkerColor= "#0A2715";
const logoColor= "#F3F0FF";


const Nav2 = ({name}) =>{
 //set navigate const
 const navigate= useNavigate()

 //to login into home page
const logoutFunc = () =>{
//navigate to home
navigate('/')
}

    return(
        <StyledNav>
            <div className="logo">
                <img src={logo} alt="Logo " />
                <span>{name}</span>
            </div>
            <span className="logout" onClick={logoutFunc}>Log out</span>
        </StyledNav>
    )
}


const StyledNav = styled(motion.div)`
position:sticky ;
top:0 ;
z-index:1 ;
width:100% ;
height: 50px;
background: ${bgColor};
display:flex ;
align-items:center ;
justify-content:space-between;
color:${logoColor} ;
padding-left:22px ;

.logo{
    width:auto ;
    height:20px ;
    display:flex ;
    align-items:center ;
    justify-content:space-between ;
    gap:20px;
    cursor: pointer;
    

    img{
        height:100% ;
    }
    span{
        font-size:20px ;
        color: ${logoColor};
        text-transform:uppercase ;
        font-family:'HelveticaNeue Bold', sans-serif ;
    }
}

.logout{
    width: 168px;
    height:100% ;
    background: ${darkerColor};
    display:flex ;
    align-items:center ;
    justify-content:center ;
    font-size:20px ;
    font-family: 'Helvetica Neu Bold', sans-serif;
    transition:.2s ease-in ;
    cursor: pointer;
    
    &:hover{
        width: 180px;
    }
}

@media only screen and (max-width: 480px){
    .logo{
        
        

        span{
            font-size:13px ;
        }
    }
    .logout{
        width: 20%;
        font-size:13px ;
    }
}

@media only screen and (min-width: 481px) and (max-width: 768px){
    .logo{
       
        

        span{
            font-size:16px ;
        }
    }
    .logout{
        width: 168px;
        font-size:20px ;
    }
}
`

export default Nav2;