import { motion } from "framer-motion";
import styled from "styled-components";
import logo from '../img/logo.png'
import React from "react";

const bgColor= "#14532D";
const logoColor= "#F3F0FF";


const Nav = () =>{


    return(
        <StyledNav>
            <div className="logo">
                <img src={logo} alt="Logo " />
                <span>Records system</span>
            </div>
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
justify-content:center ;

.logo{
    width:220px ;
    height:20px ;
    display:flex ;
    justify-content:space-between ;
    align-items: center;
    

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

@media only screen and (max-width: 480px){
    .logo{
        width: 150px;
        

        span{
            font-size:13px ;
        }
    }
}

@media only screen and (min-width: 481px) and (max-width: 768px){
    .logo{
        width: 200px;
        

        span{
            font-size:16px ;
        }
    }
}

`

export default Nav;