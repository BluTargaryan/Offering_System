import { motion } from "framer-motion";
import { useRef } from "react";
import { useDownloadExcel } from 'react-export-table-to-excel';
import styled from "styled-components";
import Nav2 from "../comps/navhome";
import welcomeImg from '../img/welcomeimg.png'
import { HashLink } from 'react-router-hash-link';
import {db} from '../firebase'
import {collection, addDoc, Timestamp,query, orderBy,onSnapshot, doc, updateDoc, deleteDoc} from 'firebase/firestore'
import { useState, useEffect} from "react";
import { async } from "@firebase/util";






const formBgColor = "#F8FFFA"
const darkColor = "#14532D"
const darkenColor = "#0A2715"



const Home = ()=>{
 //state for records
 const [records, setRecords] = useState([])
   
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
    const [period, setPeriod] = useState(0)
    //to check if records is filled
    const [isFetched, setIsFetched] = useState(false);
    //to get period number

 /* function to get all records from firestore in realtime */ 

 useEffect(() => {
        const q = query(collection(db, 'records'), orderBy('date', 'asc'))
        onSnapshot(q, (querySnapshot) => {
          setRecords(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
          setIsFetched(true)
        })
       
  },[])




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
       let payment=  document.getElementById('payment-offering').value

       const record =await addDoc(recordsRef, {
        created: Timestamp.now(),
        section:"offerings",
        period:period,
        event:offering_event,
        week:offering_week,
        date:offering_date,
        amount:amount,
        type:type,
        payment_type:payment
      })
     
      //clear up data after
      document.getElementById('event-offering').selectedIndex=0
      document.getElementById('week-offering').selectedIndex=0
      document.getElementById('date-offering').value=""
      document.getElementById('amount').value=""
      document.getElementById('type-offering').selectedIndex=0
      document.getElementById('payment-offering').selectedIndex=0
 
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
       let convert= parseInt(document.getElementById('converts').value)
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
        convert:convert,
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
      document.getElementById('converts').value=""
      
     
 
}catch{
    alert("Error ooo")
}
    }

    //Edit section
    let specEvent=""
    let specDate=""
    let specSection=""
    let denoteId=""
 
    const editStartFunction = () =>{
        document.getElementById('specifier').style.display="flex"
    }
    const editTableFunction = () =>{
        let specDownEvent = document.getElementById('specEvent').value
        specEvent=document.getElementById('specEvent').value
        let specDownDate = new Date(document.getElementById('specDate').value)
        specDate=new Date(document.getElementById('specDate').value).toLocaleDateString()
        specSection=document.getElementById('specSection').value
        document.getElementById('specifier').style.display="none"

        //to set deletion id
        for(let x=0;x<records.length;x++){
            let testDate = records[x].data.date.toDate().toLocaleDateString()
            let testEvent = records[x].data.event
            let testSection = records[x].data.section
            if((testDate===specDate)&&(testEvent===specEvent)&&(testSection===specSection)){
                denoteId=records[x].id
                break
            }
           
        }
        if(specSection==="offerings"){
            //clear inputs
            document.getElementById('specEvent').selectedIndex=0
            document.getElementById('specDate').value=""
            document.getElementById('specSection').selectedIndex=0
            //setup pre data
            let id
            for(let x=0;x<records.length;x++){
                let testDate = records[x].data.date.toDate().toLocaleDateString()
                let testEvent = records[x].data.event
                let testSection = records[x].data.section
                if((testDate===specDate)&&(testEvent===specEvent)&&(testSection===specSection)){
                    id=records[x].id
                    break
                }  
            }
            //to detern=mine index of select to set for event
            let select=document.getElementById("worker-event").options
            let select_length = select.length
            let eventIndex
            for(let x=0;x<select_length;x++){
                if((select[x].text===specEvent)){
                    eventIndex=x
                    break
                }
            }
            document.getElementById('worker-event').selectedIndex=eventIndex
            //to detern=mine index of select to set for week
            let week_select=document.getElementById("worker-week").options
            let week_select_length = select.length
            let weekIndex

            for(let x=0;x<records.length;x++){
                let recWeek=records[x].data.week
                let isEqual = false
                for(let x=0;x<week_select_length;x++){
                if(parseInt(week_select[x].text)===recWeek){
                    weekIndex=x
                    isEqual=true
                    break
                }
                if(isEqual===true){break}
                }
                
            }
            
            document.getElementById('worker-week').selectedIndex=weekIndex
              //set date
              document.getElementById('worker-date').value=specDownDate.toISOString().substring(0,10)
              //set amount

              for(let x=0;x<records.length;x++){
                let testDate = records[x].data.date.toDate().toLocaleDateString()
                let testEvent = records[x].data.event
                let testSection = records[x].data.section
                if((testDate===specDate)&&(testEvent===specEvent)&&(testSection===specSection)){
                    document.getElementById('worker-amount').value=records[x].data.amount
                    break
                }
               
            }
            //set offering type

            for(let x=0;x<records.length;x++){
                let testDate = records[x].data.date.toDate().toLocaleDateString()
                let testEvent = records[x].data.event
                let testSection = records[x].data.section
                if((testDate===specDate)&&(testEvent===specEvent)&&(testSection===specSection)){
                    document.getElementById('worker-type').value=records[x].data.type
                    break
                }
               
            }

            //set payment type

            for(let x=0;x<records.length;x++){
                let testDate = records[x].data.date.toDate().toLocaleDateString()
                let testEvent = records[x].data.event
                let testSection = records[x].data.section
                if((testDate===specDate)&&(testEvent===specEvent)&&(testSection===specSection)){
                    document.getElementById('worker-payment').value=records[x].data.payment_type
                    break
                }
               
            }

            //hide 
            document.getElementById('worker').style.display="flex"
        }
        if(specSection==="attendance"){
             //clear inputs
             document.getElementById('specEvent').selectedIndex=0
             document.getElementById('specDate').value=""
             document.getElementById('specSection').selectedIndex=0
         //to detern=mine index of select to set for event
         let select=document.getElementById("worked-event").options
         let select_length = select.length
         let eventIndex
         for(let x=0;x<select_length;x++){
             if((select[x].text===specEvent)){
                 eventIndex=x
                 break
             }
         }
         document.getElementById('worked-event').selectedIndex=eventIndex
         //to detern=mine index of select to set for week
         let week_select=document.getElementById("worked-week").options
         let week_select_length = select.length
         let weekIndex

         for(let x=0;x<records.length;x++){
             let recWeek=records[x].data.week
             let isEqual = false
             for(let x=0;x<week_select_length;x++){
             if(parseInt(week_select[x].text)===recWeek){
                 weekIndex=x
                 isEqual=true
                 break
             }
             if(isEqual===true){break}
             }
             
         }
         
         document.getElementById('worked-week').selectedIndex=weekIndex
           //set date
           document.getElementById('worked-date').value=specDownDate.toISOString().substring(0,10)
           //set men
           for(let x=0;x<records.length;x++){
             let testDate = records[x].data.date.toDate().toLocaleDateString()
             let testEvent = records[x].data.event
             let testSection = records[x].data.section
             if((testDate===specDate)&&(testEvent===specEvent)&&(testSection===specSection)){
                 document.getElementById('worked-men').value=records[x].data.men
                 break
             }
            
         }
          //set women
          for(let x=0;x<records.length;x++){
            let testDate = records[x].data.date.toDate().toLocaleDateString()
            let testEvent = records[x].data.event
            let testSection = records[x].data.section
            if((testDate===specDate)&&(testEvent===specEvent)&&(testSection===specSection)){
                document.getElementById('worked-women').value=records[x].data.women
                break
            }
           
        }
         //set children
         for(let x=0;x<records.length;x++){
            let testDate = records[x].data.date.toDate().toLocaleDateString()
            let testEvent = records[x].data.event
            let testSection = records[x].data.section
            if((testDate===specDate)&&(testEvent===specEvent)&&(testSection===specSection)){
                document.getElementById('worked-children').value=records[x].data.children
                break
            }
           
        }
         //set newcomer
         for(let x=0;x<records.length;x++){
            let testDate = records[x].data.date.toDate().toLocaleDateString()
            let testEvent = records[x].data.event
            let testSection = records[x].data.section
            if((testDate===specDate)&&(testEvent===specEvent)&&(testSection===specSection)){
                document.getElementById('worked-newcomers').value=records[x].data.newcomer
                break
            }
           
        }
        //set convert
        for(let x=0;x<records.length;x++){
            let testDate = records[x].data.date.toDate().toLocaleDateString()
            let testEvent = records[x].data.event
            let testSection = records[x].data.section
            if((testDate===specDate)&&(testEvent===specEvent)&&(testSection===specSection)){
                document.getElementById('worked-converts').value=records[x].data.convert
                break
            }
           
        }


 




            document.getElementById('worked').style.display="flex"
        }
    }
    const editSubmitFunction = () =>{
        if(specSection==="attendance"){
            let id
            for(let x=0;x<records.length;x++){
                let testDate = records[x].data.date.toDate().toLocaleDateString()
                let testEvent = records[x].data.event
                let testSection = records[x].data.section
                if((testDate===specDate)&&(testEvent===specEvent)&&(testSection===specSection)){
                    id=records[x].id
                    break
                }
               
            }
           //update
           const recordDocRef = doc(db, 'records', id)
           try{
             updateDoc(recordDocRef, {
              event:document.getElementById('worked-event').value,
              week:parseInt(document.getElementById('worked-week').value),
              date:new Date(document.getElementById('worked-date').value),
              men:parseInt(document.getElementById('worked-men').value),
              women:parseInt(document.getElementById('worked-women').value),
              children:parseInt(document.getElementById('worked-children').value),
              newcomer:parseInt(document.getElementById('worked-newcomers').value),
              convert:parseInt(document.getElementById('worked-converts').value)
            })
          } catch (err) {
            alert(err)
          }
          //clear inputs
          document.getElementById('worked-event').selectedIndex=0
          document.getElementById('worked-week').selectedIndex=0
          document.getElementById('worked-week').value=""
          document.getElementById('worked-men').value=""
          document.getElementById('worked-women').value=""
          document.getElementById('worked-children').value=""
          document.getElementById('worked-newcomers').value=""
          document.getElementById('worked-converts').value=""

          document.getElementById('worked').style.display="none"
        }
        if(specSection==="offerings"){
            let id
            for(let x=0;x<records.length;x++){
                let testDate = records[x].data.date.toDate().toLocaleDateString()
                let testEvent = records[x].data.event
                let testSection = records[x].data.section
                if((testDate===specDate)&&(testEvent===specEvent)&&(testSection===specSection)){
                    id=records[x].id
                    break
                }
               
            }
           //update
           const recordDocRef = doc(db, 'records', id)
           try{
             updateDoc(recordDocRef, {
              event:document.getElementById('worker-event').value,
              week:parseInt(document.getElementById('worker-week').value),
              date:new Date(document.getElementById('worker-date').value),
              amount:parseInt(document.getElementById('worker-amount').value),
              type:document.getElementById('worker-type').value,
              payment_type:document.getElementById('worker-payment').value
            })
          } catch (err) {
            alert(err)
          }
          document.getElementById('worker-event').selectedIndex=0
          document.getElementById('worker-week').selectedIndex=0
          document.getElementById('worker-date').value=""
          document.getElementById('worker-amount').value=""
          document.getElementById('worker-type').selectedIndex=0
          document.getElementById('worker-payment').selectedIndex=0
          
          document.getElementById('worker').style.display="none"
        }
    }
    const closeSpecifier = () =>{
          //clear inputs
          document.getElementById('specEvent').selectedIndex=0
          document.getElementById('specDate').value=""
          document.getElementById('specSection').selectedIndex=0
        document.getElementById('specifier').style.display="none"
    }
    const closeWork = () =>{
        document.getElementById('deletion').style.display="flex" 
        document.getElementById('worker').style.display="none"
        document.getElementById('worked').style.display="none" 
       
    }

    const toCloseAlert = () =>{
        document.getElementById('deletion').style.display="none"   
    }

    const toDelete = async() =>{
        const recordsDocRef = doc(db, 'records', denoteId)
        try{
            await deleteDoc(recordsDocRef)
          } catch (err) {
            alert(err)
          }
          document.getElementById('deletion').style.display="none"   
    }
    

    //TO gET TOTAL AMOUNT FOR THE AMOUNT TYPE
    const amountTotal = (name,week,periodves)=>{
        let totalAmount=0
        let length = records.length
for(let x=0; x<length; x++){
    let recName = records[x].data.type
    let recAltName= records[x].data.payment_type
    let recAmount = records[x].data.amount
    let recWeek= records[x].data.week
    let recPeriod= records[records.length-1].data.period
    if(((name===recName) || (name===recAltName))&&(week===recWeek)&&(periodves===recPeriod)){
totalAmount=totalAmount+recAmount
    }
}
return totalAmount
    }

    //to get remit amount
    const amountRemit = (name,week,periodves,percent)=>{
        const amount = amountTotal(name, week,periodves)
        const remit = (percent*amount)
        return remit
    }

    //to update document



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
  <option value="Alternate payment/donation">Alternative payment/donation</option>
</select>
</div>
<div className="input">
<h4>Payment type</h4>
<select name="cars" id="payment-offering">
<option value="volvo">--Please pick a payment type--</option>
  <option value="Not donation">Not payment/donation</option>
  <option value="African mission">African mission</option>
  <option value="Annual report">Annual report</option>
  <option value="Annual thanksgiving">Annual thanksgiving</option>
  <option value="Audit S/F">Audit S/F</option>
  <option value="Baptismal certificate">Baptismal certificate</option>
  <option value="Building dev offering">Building dev offering</option>
  <option value="Camp clearing">Camp clearing</option>
  <option value="Children zeal">Children zeal</option>
  <option value="Conference manual">Conference manual</option>
  <option value="Congress program">Congress program</option>
  <option value="Congress support">Congress support</option>
  <option value="Congress thanksgiving">Congress thanksgiving</option>
  <option value="Convention offering">Convention offering</option>
  <option value="Convention prog">Convention prog</option>
  <option value="Convention special thanksgiving">Convention special thanksgiving</option>
  <option value="Convention support">Convention support</option>
  <option value="Convention thanksgiving">Convention thanksgiving</option>
  <option value="Counselor support">Counselor support</option>
  <option value="Family weekend">Family weekend</option>
  <option value="First born redemption">First born redemption</option>
  <option value="GO anniversary thanksgiving">GO anniversary thanksgiving</option>
  <option value="H/G service viewing centre offering">H/G service viewing centre offering</option>
  <option value="Helps weekend">Helps weekend</option>
  <option value="Holy communion offering">Holy communion offering</option>
  <option value="Let's go a fishing">Let's go a fishing</option>
  <option value="Marriage certificate">Marriage certificate</option>
  <option value="Minister's conference">Minister's conference</option>
  <option value="Minister's new auditorium offering">Minister's new auditorium offering</option>
  <option value="Mission support">Mission support</option>
  <option value="New auditorium">New auditorium</option>
  <option value="Pledges/Vow/Covenant Seed">Pledges/Vow/Covenant Seed</option>
  <option value="Project offering">Project offering</option>
  <option value="Provincial convention support">Provincial convention support</option>
  <option value="Province CSR support">Province CSR support</option>
  <option value="Province programme offering">Province programme offering</option>
  <option value="Radio and TV">Radio and TV</option>
  <option value="RCCG Partner">RCCG Partner </option>
  <option value="Regional contribution">Regional contribution</option>
  <option value="Send Forth/ Pastors' welfare">Send Forth/ Pastors' welfare</option>
  <option value="Special Holy Ghost Service support">Special Holy Ghost Service support</option>
  <option value="Training weekend">Training weekend</option>
  <option value="Convention volunteer">Convention volunteer</option>
  <option value="Open Heaven Devotional">Open Heaven Devotional</option>
  <option value="CSR support (Area HQ)">CSR support (Area HQ)</option>
  <option value="RMF">RMF</option>
  <option value="RUN Educational Fund">RUN Educational Fund</option>
  <option value="Area levies (welfare)">Area levies (welfare)</option>
  <option value="Area levies (Let's go a fishing)">Area levies (Let's go a fishing)</option>

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
<div className="input">
<h4>Converts</h4>
<input type="number" id="converts"/>
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
<button onClick={editStartFunction}>edit</button>
    </div>

    <div className="table">


<table ref={tableRef}>
    <tbody>
        <tr><td id="type">Offering</td></tr>
        <tr>
            <td id="title">Week 1</td>
        </tr>
<tr>
    <th>Item Name</th>
    <th>Amount</th>
    <th>Remit percentage</th>
    <th>Remittance</th>
</tr>
{isFetched &&
    <tr className="tr">
    <td>Congress thanksgiving</td>
    <td>{amountTotal("Congress thanksgiving",1,records[records.length-1].data.period)}</td>
    <td>100%</td>
    <td>{amountRemit("Congress thanksgiving",1,records[records.length-1].data.period,1)}</td>
</tr>
}
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
    <button onClick={hideAlert}>no,go back</button>
</div>
    </div>
</div>
        </StyledAlert>
        <StyledAlert id="deletion">
<div className="main">
    <div className="flex">
<h4>Start new period</h4>
<p>You are about to delete this record. Are you sure?</p>
<div className="buttons">
    <button className="warning" onClick={toDelete}>yes, delete it</button>
    <button onClick={toCloseAlert}>no, go back</button>
</div>
    </div>
</div>
        </StyledAlert>
        {
            isFetched &&
            <>
            <StyledEdit id="specifier">
<div className="main">
    <div className="flex">
    <div className="title">
    <h3>Edit</h3>
    <span className="line"/>
    </div>
    <div className="form">
<div className="inner">
<div className="input">
<h4>Event</h4>
<select name="Event" id="specEvent">
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
<h4>Date</h4>
<input type="date" id="specDate"/>
</div>
<div className="input">
<h4>Section</h4>
<select name="Event" id="specSection">
  <option value="not valid">--Please pick a section type--</option>
  <option value="offerings">offerings</option>
  <option value="attendance">attendance</option>
</select>

</div>

</div>

    </div>
    <div className="buttons">
    <button onClick={editTableFunction}>Submit</button>
    <button className="redded" onClick={closeSpecifier}>Exit</button>
    </div>

    
    </div>
</div>
        </StyledEdit>
        <StyledEdit id="worker">
<div className="main">
    <div className="flex">
    <div className="title">
    <h3>Edit</h3>
    <span className="line"/>
    </div>
    <div className="form">
<div className="inner">
<div className="input">
<h4>Event</h4>
<select name="Event" id="worker-event">
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
<select name="Event" id="worker-week">
  <option value="not valid">--Please pick a week number--</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>

</select>

</div>

<div className="input">
<h4>Date</h4>
<input type="date" id="worker-date"/>
</div>
<div className="input">
<h4>Amount</h4>
<input type="number" id="worker-amount"/>
</div>
<div className="input">
<h4>Offering type</h4>
<select name="cars" id="worker-type">
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
  <option value="Alternate payment/donation">Alternative payment/donation</option>
</select>
</div>
<div className="input">
<h4>Payment type</h4>
<select name="cars" id="worker-payment">
<option value="volvo">--Please pick a payment type--</option>
  <option value="Not donation">Not payment/donation</option>
  <option value="African mission">African mission</option>
  <option value="Annual report">Annual report</option>
  <option value="Annual thanksgiving">Annual thanksgiving</option>
  <option value="Audit S/F">Audit S/F</option>
  <option value="Baptismal certificate">Baptismal certificate</option>
  <option value="Building dev offering">Building dev offering</option>
  <option value="Camp clearing">Camp clearing</option>
  <option value="Children zeal">Children zeal</option>
  <option value="Conference manual">Conference manual</option>
  <option value="Congress program">Congress program</option>
  <option value="Congress support">Congress support</option>
  <option value="Congress thanksgiving">Congress thanksgiving</option>
  <option value="Convention offering">Convention offering</option>
  <option value="Convention prog">Convention prog</option>
  <option value="Convention special thanksgiving">Convention special thanksgiving</option>
  <option value="Convention support">Convention support</option>
  <option value="Convention thanksgiving">Convention thanksgiving</option>
  <option value="Counselor support">Counselor support</option>
  <option value="Family weekend">Family weekend</option>
  <option value="First born redemption">First born redemption</option>
  <option value="GO anniversary thanksgiving">GO anniversary thanksgiving</option>
  <option value="H/G service viewing centre offering">H/G service viewing centre offering</option>
  <option value="Helps weekend">Helps weekend</option>
  <option value="Holy communion offering">Holy communion offering</option>
  <option value="Let's go a fishing">Let's go a fishing</option>
  <option value="Marriage certificate">Marriage certificate</option>
  <option value="Minister's conference">Minister's conference</option>
  <option value="Minister's new auditorium offering">Minister's new auditorium offering</option>
  <option value="Mission support">Mission support</option>
  <option value="New auditorium">New auditorium</option>
  <option value="Pledges/Vow/Covenant Seed">Pledges/Vow/Covenant Seed</option>
  <option value="Project offering">Project offering</option>
  <option value="Provincial convention support">Provincial convention support</option>
  <option value="Province CSR support">Province CSR support</option>
  <option value="Province programme offering">Province programme offering</option>
  <option value="Radio and TV">Radio and TV</option>
  <option value="RCCG Partner">RCCG Partner </option>
  <option value="Regional contribution">Regional contribution</option>
  <option value="Send Forth/ Pastors' welfare">Send Forth/ Pastors' welfare</option>
  <option value="Special Holy Ghost Service support">Special Holy Ghost Service support</option>
  <option value="Training weekend">Training weekend</option>
  <option value="Convention volunteer">Convention volunteer</option>
  <option value="Open Heaven Devotional">Open Heaven Devotional</option>
  <option value="CSR support (Area HQ)">CSR support (Area HQ)</option>
  <option value="RMF">RMF</option>
  <option value="RUN Educational Fund">RUN Educational Fund</option>
  <option value="Area levies (welfare)">Area levies (welfare)</option>
  <option value="Area levies (Let's go a fishing)">Area levies (Let's go a fishing)</option>

</select>
</div>
</div>

    </div>
    <div className="buttons">
    <button onClick={editSubmitFunction}>Update</button>
    <button className="redded" onClick={closeWork}>Delete</button>
    </div>

    
    </div>
</div>
        </StyledEdit>
        <StyledEdit id="worked">
<div className="main">
    <div className="flex">
    <div className="title">
    <h3>Edit</h3>
    <span className="line"/>
    </div>
    <div className="form">
    <div className="inner">
    <div className="input">
<h4>Event</h4>
<select name="Event" id="worked-event">
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
<select name="Event" id="worked-week">
  <option value="not valid">--Please pick a week number--</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>

</select>

</div>
<div className="input">
<h4>Date</h4>
<input type="date" id="worked-date"/>
</div>
<div className="input">
<h4>Men</h4>
<input type="number" id="worked-men"/>
</div>
<div className="input">
<h4>Women</h4>
<input type="number" id="worked-women"/>
</div>
<div className="input">
<h4>Children</h4>
<input type="number" id="worked-children"/>
</div>
<div className="input">
<h4>Newcomers</h4>
<input type="number" id="worked-newcomers"/>
</div>
<div className="input">
<h4>Converts</h4>
<input type="number" id="worked-converts"/>
</div>

    </div>

    </div>
    <div className="buttons">
    <button onClick={editSubmitFunction}>Update</button>
    <button className="redded" onClick={closeWork}>Delete</button>
    </div>

    
    </div>
</div>
        </StyledEdit>
            </>
        }
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
  width: 20px;
}
&::-webkit-scrollbar-thumb {
  background: #16A34A;
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
overflow-x:auto ;

table{
    width:auto ;
    font-size:20px ;
    border-collapse:collapse ;

    tr{
        cursor: pointer;
        pointer-events:none
    }
    .greened{
        background-color:${darkColor} ;
        color:${formBgColor} ;
        transition:.2s ease-in ;
        pointer-events:auto;

        &:hover{
        background-color:${darkenColor} ;
        }
        th,td{
            border:2px solid ${darkenColor} ;
        }
    }

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
height:60% ;
overflow-y:auto;
padding-right:10px ;
&::-webkit-scrollbar {
  width: 20px;
}
&::-webkit-scrollbar-thumb {
  background: ${darkColor};
}


.inner{

    width:100% ;
    height:auto ;
    display:flex ;
justify-content:center ;
align-items:flex-start ;
flex-direction:column ;
gap:20px;


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
}

.buttons{
    width:100% ;
    height:auto ;
    display:flex ;
    justify-content:space-between ;
    align-items:stretch ;
    gap:75px;

    .redded{
        background-color:#DC2626 ;
        transition:.2s ease-in ;

        &:hover{
            background-color:#7F1D1D ;
        }
    }
    button{
    width:100% ;
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
}
`
export default Home