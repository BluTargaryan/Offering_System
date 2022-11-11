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
                <span>Offering system</span>
            </div>
        </StyledNav>
    )
}


const StyledNav = styled(motion.div)`
width:100% ;
height: 50px;
background: ${bgColor};
display:flex ;
align-items:center ;
justify-content:center ;

.logo{
    width:215px ;
    height:20px ;
    display:flex ;
    justify-content:space-between ;
    

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
`

export default Nav;