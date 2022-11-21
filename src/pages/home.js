import { motion } from "framer-motion";
import { useRef } from "react";
import { useDownloadExcel } from 'react-export-table-to-excel';
import styled from "styled-components";
import Nav2 from "../comps/navhome";
import welcomeImg from '../img/welcomeimg.png'
import { HashLink } from 'react-router-hash-link';
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import { useState } from "react";






const formBgColor = "#F8FFFA"
const darkColor = "#14532D"
const darkenColor = "#0A2715"

const Home = ()=>{
    //TO handle table section
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })

    const hideAlert = () =>{
        document.getElementById('alert').style.display="none"
    }
    const showAlert = () =>{
        document.getElementById('alert').style.display="flex"
    }

    //State
    const [period, setPeriod] = useState(1)
    //create collection records and add d
    const recordsRef = collection(db, 'records');
//to put offering data
    const offeringSubmit = async (e)=>{
        e.preventDefault()
try{
    
   

       //create values for input data
       let offering_event= document.getElementById('event-offering').value
       let offering_week= parseInt(document.getElementById('week-offering').value)
       let offering_date= new Date(document.getElementById('date-offering').value)
       let amount= parseInt(document.getElementById('amount').value)
       let type= document.getElementById('type-offering').value

       const record =await addDoc(recordsRef, {
        created: Timestamp.now(),
        section:"offerings",
        period:period,
        event:offering_event,
        week:offering_week,
        date:offering_date,
        amount:amount,
        type:type
      })
     
      //clear up data after
      document.getElementById('event-offering').selectedIndex=0
      document.getElementById('week-offering').selectedIndex=0
      document.getElementById('date-offering').value=""
      document.getElementById('amount').value=""
      document.getElementById('type-offering').selectedIndex=0
 
}catch{
    alert("Error ooo")
}
    }

    //to put attendance data
    const attendanceSubmit = async (e)=>{
        e.preventDefault()
try{
    
   

       //create values for input data
       let attendance_event= document.getElementById('event-attendance').value
       let attendance_week= parseInt(document.getElementById('week-attendance').value)
       let men= parseInt(document.getElementById('men').value)
       let women= parseInt(document.getElementById('women').value)
       let children= parseInt(document.getElementById('children').value)
       let newcomer= parseInt(document.getElementById('newcomers').value)
       let attendance_date= new Date(document.getElementById('date-attendance').value)
       

       const record =await addDoc(recordsRef, {
        created: Timestamp.now(),
        section:"attendance",
        period:period,
        event:attendance_event,
        week:attendance_week,
        date:attendance_date,
        men:men,
        women:women,
        children:children,
        newcomer:newcomer
      })

      //clear up data after
      document.getElementById('event-attendance').selectedIndex=0
      document.getElementById('week-attendance').selectedIndex=0
      document.getElementById('date-attendance').value=""
      document.getElementById('men').value=""
      document.getElementById('women').value=""
      document.getElementById('children').value=""
      document.getElementById('newcomers').value=""
      
     
 
}catch{
    alert("Error ooo")
}
    }



    return(
        <StyledHome>
<Nav2/>
<Main>
<div className="intro"  id="buttons">
<div className="welcome">
    <div className="img"/>
<h1>Welcome to the rccg offering system</h1>
</div>
<p className="introtext">What would you like to do?</p>
<div className="buttons">
<HashLink smooth to='/home/#main-form' ><div className="button">data entry</div></HashLink>
<HashLink smooth to='/home/#reports' ><div className="button">view report</div></HashLink>
</div>
</div>

<div id="main-form">
<h2>Data entry</h2>
<div className="main">
    <form className="mini-form" action="submit" >
    <div className="title">
    <h3>Offering</h3>
    <span className="line"/>
    </div>
    <div className="form">
<div className="input">
<h4>Event</h4>
<select name="Event" id="event-offering">
  <option value="not valid">--Please pick an event type--</option>
  <option value="Sunday service">Sunday service</option>
  <option value="Sunday school">Sunday school</option>
  <option value="House fellowship">House fellowship</option>
  <option value="Tuesday service">Tuesday service</option>
  <option value="Thursday service">Thursday service</option>
  <option value="Friday night vigil">Friday night vigil</option>
  <option value="No event, just records">No event, just records</option>
</select>

</div>
<div className="input">
<h4>Week</h4>
<select name="Event" id="week-offering">
  <option value="not valid">--Please pick a week number--</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>

</select>

</div>

<div className="input">
<h4>Date</h4>
<input type="date" id="date-offering"/>
</div>
<div className="input">
<h4>Amount</h4>
<input type="number" id="amount"/>
</div>
<div className="input">
<h4>Offering type</h4>
<select name="cars" id="type-offering">
<option value="volvo">--Please pick an offering type--</option>
  <option value="General tithe">General tithe</option>
  <option value="Minister's tithe">Minister's tithe</option>
  <option value="Sunday love offering">Sunday love offering</option>
  <option value="Thanksgiving">Thanksgiving</option>
  <option value="CRM">CRM</option>
  <option value="Children offering">Children offering</option>
  <option value="First fruit">First fruit</option>
  <option value="Gospel fund">Gospel fund</option>
  <option value="House fellowship offering">House fellowship offering</option>
  <option value="Sunday school">Sunday school</option>
  <option value="Donation">Donation</option>
</select>
</div>

    </div>
    <button onClick={offeringSubmit}>Submit</button>

    
    </form>

    <form className="mini-form" action="submit" >
    <div className="title">
    <h3>Attendance</h3>
    <span className="line"/>
    </div>
    <div className="form">
    <div className="input">
<h4>Event</h4>
<select name="Event" id="event-attendance">
  <option value="not valid">--Please pick an event type--</option>
  <option value="Sunday service">Sunday service</option>
  <option value="Sunday school">Sunday school</option>
  <option value="House fellowship">House fellowship</option>
  <option value="Tuesday service">Tuesday service</option>
  <option value="Thursday service">Thursday service</option>
  <option value="Friday night vigil">Friday night vigil</option>
  <option value="No event, just records">No event, just records</option>
</select>

</div>
<div className="input">
<h4>Week</h4>
<select name="Event" id="week-attendance">
  <option value="not valid">--Please pick a week number--</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>

</select>

</div>
<div className="input">
<h4>Date</h4>
<input type="date" id="date-attendance"/>
</div>
<div className="input">
<h4>Men</h4>
<input type="number" id="men"/>
</div>
<div className="input">
<h4>Women</h4>
<input type="number" id="women"/>
</div>
<div className="input">
<h4>Children</h4>
<input type="number" id="children"/>
</div>
<div className="input">
<h4>Newcomers</h4>
<input type="number" id="newcomers"/>
</div>


    </div>
    <button onClick={attendanceSubmit}>Submit</button>
    
    
    </form>

</div>
</div>

<div id="reports">
    <div className="report-section">
    <h2>View report</h2>
    <p>Set range of report or click <span>LOAD</span> to generate full report. Click <span>EDIT</span> to edit records.</p>
    <div className="settings">
<h4>Week:</h4>
<input type="number" min="1" max="4"/>
<h4>to</h4>
<input type="number" min="1" max="4"/>
<button>load</button>
<button>edit</button>
    </div>

    <div className="table">


<table ref={tableRef}>
    <tbody>
    <tr>
            <th id="type">Attendance</th>
        </tr>
        <tr>
            <th id="title">Week 1</th>
        </tr>
        <tr>
            <th>Heading 1</th>
            <th>Heading 1</th>
            <th>Heading 1</th>
        </tr>
        <tr>
            <td>Unit</td>
            <td>Unit</td>
            <td>Unit</td>
        </tr>
    </tbody>
</table>

    </div>
    </div>
    <div className="buttons">
    <button onClick={onDownload}>generate</button>
    <button className="warning" onClick={showAlert}>start new period</button>
</div>
</div>
</Main>
<StyledAlert id="alert">
<div className="main">
    <div className="flex">
<h4>Start new period</h4>
<p>You are about to start a new financial period. Are you sure?</p>
<div className="buttons">
    <button className="warning" onClick={hideAlert}>generate</button>
    <button onClick={hideAlert}>start new period</button>
</div>
    </div>
</div>
        </StyledAlert>
        <StyledEdit id="edit">
<div className="main">
    <div className="flex">
    <div className="title">
    <h3>Edit</h3>
    <span className="line"/>
    </div>
    <div className="form">
<div className="input">
<h4>Event</h4>
<select name="Event" id="event">
  <option value="volvo">--Please pick an event type--</option>
  <option value="saab">Sunday service</option>
  <option value="saab">Sunday school</option>
  <option value="saab">House fellowship</option>
  <option value="saab">Tuesday service</option>
  <option value="saab">Thursday service</option>
  <option value="saab">Friday night vigil</option>
</select>
</div>
<div className="input">
<h4>Date</h4>
<input type="date" />
</div>
<div className="input">
<h4>Amount</h4>
<input type="number" />
</div>
<div className="input">
<h4>Offering type</h4>
<select name="cars" id="cars">
<option value="volvo">--Please pick an offering type--</option>
  <option value="saab">General tithe</option>
  <option value="mercedes">Minister's tithe</option>
  <option value="audi">Sunday love offering</option>
  <option value="audi">Thanksgiving</option>
  <option value="audi">CRM</option>
  <option value="audi">Children offering</option>
  <option value="audi">First fruit</option>
  <option value="audi">Gospel fund</option>
  <option value="audi">House fellowship offering</option>
  <option value="audi">Sunday school</option>
  <option value="audi">Donation</option>
</select>
</div>

    </div>
<button>Submit</button>
    
    </div>
</div>
        </StyledEdit>
        </StyledHome>
    )
}

const StyledHome = styled(motion.div)`
width:100% ;
height:auto ;
padding-bottom:216px ;
position:relative ;

`
const Main = styled(motion.div)`
width:auto ;
height:auto ;
margin-left:120px ;
color:${darkenColor} ;
margin-top:52px ;

h2{
font-size:39px;
font-family: 'Helvetica Neu Bold', sans-serif;
font-weight:normal ;
color:${darkColor} ;
    }
    button{
    width:490px ;
    height: 60px;
    background-color:${darkColor} ;
    color:${formBgColor} ;
    border:none ;
    border-radius:10px ;
    font-family: 'Helvetica Neu Bold', sans-serif;
    text-transform:uppercase ;
    font-size:25px ;
    transition:.2s ease-in ;
    cursor: pointer;

    &:hover{
        background-color:${darkenColor} ;
    }
}

.intro{
    width: 837px;
    height:auto ;
    

    .welcome{
        width: 100%;
        height:368px ;
        display:flex ;
        justify-content:flex-end ;
        position:relative ;

        .img{
            height:100% ;
            width:781px ;
            background:linear-gradient( rgba(20, 83, 45, 0.24), rgba(20, 83, 45, 0.24)),url(${welcomeImg}) ;
            background-size:cover ;
        }

        h1{
            font-family: 'Helvetica Neu Bold', sans-serif;
            color:${darkColor} ;
            position:absolute ;
            left:0 ;
            /**Translate to middle vertically */
            top: 50%;
    transform: translateY(-50%);
            text-transform:uppercase ;
            font-size:49px ;
            width: 397px;
            
        }
    }

    .introtext{
font-size:31px ;
margin-top:52px ;
    }
    .buttons{
        width: 714px;
        height: 61px;
        display:flex ;
        gap:76px;
        margin-top:34px ;
        align-items:stretch ;
        justify-content:space-between ;

        a{
            width:100% ;
            height:auto ;
            text-decoration:none ;
            .button{
            cursor: pointer;
            width: 100%;
            height: 100%;
            background-color:${darkColor} ;
            text-transform:uppercase ;
            border-radius:10px ;
            display:flex ;
            align-items:center ;
            justify-content:center ;
            font-family: 'Helvetica Neu Bold', sans-serif !important;
            font-size:25px ;
            color:${formBgColor} ;
            transition:.2s ease-in ;

            &:hover{
                background-color:${darkenColor} ;
            }
        }
        }

        
    }
}

#main-form{
    width:950px ;
    margin-top:200px ;
    display:flex ;
    flex-direction:column ;
    align-items:flex-start ;
    gap:75px;

    

    .main{
        width:100% ;
display:flex ;
flex-direction:column ;
align-items:flex-start ;
gap:75px;

.mini-form{
display:flex ;
align-items:flex-start ;
gap:50px;
flex-direction:column ;

    .title{
    width:100% ;
    display:flex ;
    flex-direction:column ;
    align-items:flex-start ;
    justify-content:space-between ;
    width:100% ;
    gap:26px;

    h3{
    font-size:31px ;
    font-family: 'HelveticaNeue Medium', sans-serif;
    font-weight:normal ;
}

.line{
    height:4px ;
    width:100% ;
    background-color:${darkColor} ;
}
}

.form{
    display:flex ;
align-items:flex-start ;
gap:40px;
flex-direction:column ;

.input{
    display:flex ;
    justify-content:space-between ;
    align-items:center ;
    width: 764px;
    height: 50px;

    h4{
        font-family: 'HelveticaNeue Thin', sans-serif;
        font-size:31px ;
        font-weight:normal ;
    }

    input{
        cursor: pointer;
        width: 467px;
        height: 100%;
        font-size:25px ;
        border-radius:10px;
        background:none ;
        padding:0 25px ;
        font-family: 'HelveticaNeue Thin', sans-serif;
        color:${darkColor} ;
        border:2px solid ${darkColor} ;

        &::placeholder{
            color:${darkColor} ;  
        }
        &::-webkit-calendar-picker-indicator{
            cursor: pointer;
        }
    }
   select{
    /**Reset for select */
  appearance: none;
  background-color: ${darkColor};
  border: none ;
  border-radius:10px ;
  padding:0 25px ;
height:100% ;
  width: 467px;
  font-family: 'HelveticaNeue Thin', sans-serif;
  font-size: 25px;
  cursor: pointer;
  color:${formBgColor} ;
  transition:.2s ease-in ;
 
  &::-webkit-scrollbar {
    display: none;
}

  &:hover{
    width: 470px;
    background-color:${darkenColor} ;
  }

 
   }
  
}
}


}



    }
}

#reports{
    width: 1200px;
    margin-top:120px ;
display:flex ;
gap:120px;
flex-direction:column ;
align-items:flex-start ;

.report-section{
    width:100% ;
    display:flex ;
gap:75px;
flex-direction:column ;
align-items:flex-start ; 

p{
    font-size:31px ;
    

    span{
        font-weight:bold ;
    }
}

.settings{
    display:flex ;
    width: 100%;
    height:60px ;
    gap:80px;
    align-items:center ;


    h4{
       display:inline ;
        font-weight:normal ;
        font-family: 'HelveticaNeue Thin', sans-serif;
        font-size:31px ;
    }

    input{
        background:none ;
        width:100% ;
        height:100% ;
        padding:0 25px ;
        font-size:25px ;
        border:2px solid ${darkColor} ;
        border-radius:10px ;
    }

    button{
        width:100% ;
        height:100% ;
        background-color:${darkColor} ;
        border-radius:10px ;

        &:hover{
            background-color:${darkenColor} ; 
        }
    }
}

.table{
display:flex ;
flex-direction:column ;
align-items:flex-start ;
gap:75px;
width:100% ;

table{
    width:auto ;
    font-size:20px ;
    border-collapse:collapse ;

    tbody{
        padding:0 ;
    }
    #type{
        border:none ;
        font-family: 'Helvetica Neu Bold', sans-serif;
        font-weight:bolder ;
        margin-bottom:10px ;
    }
    #title{
        border:none ;
        font-family: 'HelveticaNeue Medium', sans-serif;
        font-weight:bolder ;
        margin-bottom:10px ;
    }
    th,td{
        padding:10px 10px;
        border:2px solid ${darkColor};
    }
    td{
        font-family: 'HelveticaNeue Medium', sans-serif;
        font-weight:bold;
    }
}
}

}

.buttons{
    width:100% ;
    display:flex ;
    gap:240px;
    align-items:center ;
    justify-content:stretch ;

    button{
        width:100% ;
    }

    .warning{
        background-color:#DC2626 ;
        transition:.2s ease-in ;

        &:hover{
            background-color:#7F1D1D ;
        }
    }
}
}
`
const StyledAlert = styled(motion.div)`
width:100% ;
height: 100vh;
position:fixed ;
top:0 ;
left:0 ;
z-index:2;
background: rgba(9, 39, 21, 0.37);
display:none ;
align-items:center ;
justify-content:center ;
color:${darkColor} ;

.main{
    width: 1210px;
    height:90%;
    background: #F59E0B;
    display:flex ;
align-items:center ;
justify-content:center ;

    .flex{
        display:flex ;
        flex-direction:column ;
        align-items:flex-start ;
        justify-content:space-between ;
        height:90% ;
        width: 80%;

        h4{
            font-family: 'Helvetica Neu Bold', sans-serif;
            font-size: 39px;
            
        }
        p{
            font-family: 'HelveticaNeue Thin', sans-serif;
            font-size: 39px;
        }
        .buttons{
            width:100% ;
            height:auto ;
            padding:10px ;
            display:flex ;
            gap:64px;
            justify-content:stretch ;

            button{
                cursor: pointer;
height: 60px;
width:100% ;
border:none ;
border-radius:10px ;
background-color:${darkColor} ;
font-family: 'Helvetica Neu Bold', sans-serif;
font-size:25px ;
text-transform:uppercase ;
color:#F59E0B ;
transition:.2s ease-in ;

&:hover{
    background-color:${darkenColor} ;
}
            }

            .warning{
                background-color:#DC2626 ;
                
&:hover{
    background-color:#9B1F18;
}
            }
        }
    }
}
`

const StyledEdit = styled(motion.div)`
width:100% ;
height: 100vh;
position:fixed ;
top:0 ;
left:0 ;
z-index:3;
background: rgba(9, 39, 21, 0.37);
display:none ;
align-items:center ;
justify-content:center ;
color:${darkColor} ;

.main{
    width: 1210px;
    height:90%;
    background: ${formBgColor};
    display:flex ;
align-items:center ;
justify-content:center ;

    .flex{
        display:flex ;
        flex-direction:column ;
        align-items:flex-start ;
        justify-content:space-between ;
        height:90% ;
        width: 80%;

        .title{
    width:100% ;
    display:flex ;
    flex-direction:column ;
    align-items:flex-start ;
    justify-content:space-between ;
    width:100% ;
    gap:26px;

    h3{
    font-size:31px ;
    font-family: 'Helvetica Neu Bold', sans-serif;
    font-weight:normal ;
}

.line{
    height:4px ;
    width:100% ;
    background-color:${darkColor} ;
}
}

.form{
    display:flex ;
align-items:flex-start ;
gap:40px;
flex-direction:column ;

.input{
    display:flex ;
    justify-content:space-between ;
    align-items:center ;
    width: 764px;
    height: 50px;

    h4{
        font-family: 'HelveticaNeue Thin', sans-serif;
        font-size:31px ;
        font-weight:normal ;
    }

    input{
        cursor: pointer;
        width: 467px;
        height: 100%;
        font-size:25px ;
        border-radius:10px;
        background:none ;
        padding:0 25px ;
        font-family: 'HelveticaNeue Thin', sans-serif;
        color:${darkColor} ;
        border:2px solid ${darkColor} ;

        &::placeholder{
            color:${darkColor} ;  
        }
    }
   select{
    /**Reset for select */
  appearance: none;
  background-color: ${darkColor};
  border: none ;
  border-radius:10px ;
  padding:0 25px ;
height:100% ;
  width: 467px;
  font-family: 'HelveticaNeue Thin', sans-serif;
  font-size: 25px;
  cursor: pointer;
  color:${formBgColor} ;
  transition:.2s ease-in ;
 
  &::-webkit-scrollbar {
    display: none;
}

  &:hover{
    width: 470px;
    background-color:${darkenColor} ;
  }

 
   }
  
}
}

button{
    width:490px ;
    height: 60px;
    background-color:${darkColor} ;
    color:${formBgColor} ;
    border:none ;
    border-radius:10px ;
    font-family: 'Helvetica Neu Bold', sans-serif;
    text-transform:uppercase ;
    font-size:25px ;
    transition:.2s ease-in ;
    cursor: pointer;

    &:hover{
        background-color:${darkenColor} ;
    }
}
    }
}
`
export default Home