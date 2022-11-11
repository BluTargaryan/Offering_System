import { motion } from "framer-motion";
import styled from "styled-components";

import React from "react";

import Nav from '../comps/navlogin'
import bgimg from '../img/loginimg_desktop.png' 

const formBgColor = "#F8FFFA"
const darkColor = "#14532D"
const darkenColor = "#092816"

const Login = () =>{


    return(
        <StyledLogin>
<Nav/>
<Main>
    <div className="form-section">
<form action="submit">
<div className="title">
    <h4>sign in</h4>
    <span/>
</div>

<input type="password" placeholder="Password"/>

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
height:973px ;
background-image:linear-gradient( rgba(20,83,45,.65), rgba(20,83,45,.65)),url(${bgimg}) ;
background-size:cover ;
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
width: 471px;


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
`

export default Login;