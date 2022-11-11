import { createGlobalStyle } from "styled-components";

import HelveticaNeue from './fonts/HelveticaNeue.ttf'
import HelveticaNeuBold from './fonts/Helvetica Neu Bold.ttf'
import HelveticaNeuMedium from './fonts/HelveticaNeue Medium.ttf'
import HelveticaNeuThin from './fonts/HelveticaNeue Thin.ttf'

//color values
const backGroundColor= "#F8FFFA";
const textColor= "#14532D";


const GlobalStyles = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}

@font-face {
    font-family: 'HelveticaNeue';
    src: local('HelveticaNeue'), url(${HelveticaNeue}) format('truetype');
    font-weight:normal ;
  }
  @font-face {
    font-family: 'Helvetica Neu Bold';
    src: local('Helvetica Neu Bold'), url(${HelveticaNeuBold}) format('truetype');
    font-weight:700 ;
  }
  @font-face {
    font-family: 'HelveticaNeue Thin';
    src: local('HelveticaNeue Thin'), url(${HelveticaNeuThin}) format('truetype');
    font-weight:100 ;
  }
  @font-face {
    font-family: 'HelveticaNeue Medium';
    src: local('HelveticaNeue Medium'), url(${HelveticaNeuMedium}) format('truetype');
    font-weight:500 ;
  }



  body{
    width:100% ;
    background:${backGroundColor} ;
    color:${textColor} ;
    overflow-x:hidden;
font-family:'HelveticaNeue Medium', sans-serif ;
    &::-webkit-scrollbar {
    display: none;
}
  }

  input{
    &:focus{
      outline:none;
    }
  }
`

export default GlobalStyles;