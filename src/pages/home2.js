import { motion } from "framer-motion";
import { useRef } from "react";
import { useDownloadExcel } from 'react-export-table-to-excel';
import styled from "styled-components";
import Nav2 from "../comps/navhome";
import welcomeImg from '../img/welcomeimg.png'
import { HashLink } from 'react-router-hash-link';
import { db } from '../firebase'
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import Table from "../comps/table";
import TableFixed from "../comps/tablefixed";
import TableItem from "../comps/tableitem";
import TableLevies from "../comps/tablelevies";
import TableWeek from "../comps/tableweek"






const formBgColor = "#F8FFFA"
const darkColor = "#14532D"
const darkenColor = "#0A2715"



const Home2 = () => {
  //state for recordsdu
  const [recordsdu, setRecordsDu] = useState([])
  //State
  const [period, setPeriod] = useState(0)
  //TO handle table section
  const tableRef = useRef(null);



  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Church recordsdu',
    sheet: 'Sheet 1'
  })

  const hideAlert = () => {
    document.getElementById('alert').style.display = "none"
  }
  const showAlert = () => {
    document.getElementById('alert').style.display = "flex"
  }
  //to generate new period
  const generatePeriod = async () => {
    let newPeriod = period + 1
    const record = await addDoc(recordsduRef, {
      created: Timestamp.now(),
      section: "offerings",
      period: newPeriod,
      event: "none",
      week: 1,
      date: Timestamp.now(),
      amount: 0,
      type: "Starting new period",
      payment_type: "none"
    })
    setPeriod(newPeriod)
    document.getElementById('alert').style.display = "none"
    window.location.reload();
  }






  //to check if recordsdu is filled
  const [isFetched, setIsFetched] = useState(false);
  //to get period number

  /* function to get all recordsdu from firestore in realtime */

  useEffect(() => {
    const q = query(collection(db, 'recordsdu'), orderBy('period', 'asc'))
    onSnapshot(q, (querySnapshot) => {
      setRecordsDu(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
      setIsFetched(true)
    })

  }, [])

  useEffect(() => {
    if (isFetched) {
      try {
        let gotPeriod = recordsdu[(recordsdu.length) - 1].data.period
        setPeriod(gotPeriod)
      }
      catch {
        alert("Period not existing yet")
      }
    }
  })




  //create collection recordsdu and add d
  const recordsduRef = collection(db, 'recordsdu');
  //to put offering data
  const offeringSubmit = async (e) => {
    e.preventDefault()
    try {



      //create values for input data
      let offering_event = document.getElementById('event-offering').value
      let offering_week = parseInt(document.getElementById('week-offering').value)
      let offering_date = new Date(document.getElementById('date-offering').value)
      let amount = parseInt(document.getElementById('amount').value)
      let type = document.getElementById('type-offering').value
      let payment = document.getElementById('payment-offering').value

      if (!amount) {
        amount = 0
      }

      const record = await addDoc(recordsduRef, {
        created: Timestamp.now(),
        section: "offerings",
        period: period,
        event: offering_event,
        week: offering_week,
        date: offering_date,
        amount: amount,
        type: type,
        payment_type: payment
      })

      //clear up data after
      document.getElementById('event-offering').selectedIndex = 0
      document.getElementById('week-offering').selectedIndex = 0
      document.getElementById('date-offering').value = ""
      document.getElementById('amount').value = ""
      document.getElementById('type-offering').selectedIndex = 0
      document.getElementById('payment-offering').selectedIndex = 0

    } catch {
      alert("Please fill out ALL the fields correctly")
    }
  }

  //to put attendance data
  const attendanceSubmit = async (e) => {
    e.preventDefault()
    try {



      //create values for input data
      let attendance_event = document.getElementById('event-attendance').value
      let attendance_week = parseInt(document.getElementById('week-attendance').value)
      let men = parseInt(document.getElementById('men').value)
      let women = parseInt(document.getElementById('women').value)
      let children = parseInt(document.getElementById('children').value)
      let attendance_date = new Date(document.getElementById('date-attendance').value)

      if (!men) {
        men = 0
      }
      if (!women) {
        women = 0
      }
      if (!children) {
        children = 0
      }


      const record = await addDoc(recordsduRef, {
        created: Timestamp.now(),
        section: "attendance",
        period: period,
        event: attendance_event,
        week: attendance_week,
        date: attendance_date,
        men: men,
        women: women,
        children: children
      })

      //clear up data after
      document.getElementById('event-attendance').selectedIndex = 0
      document.getElementById('week-attendance').selectedIndex = 0
      document.getElementById('date-attendance').value = ""
      document.getElementById('men').value = ""
      document.getElementById('women').value = ""
      document.getElementById('children').value = ""



    } catch {
      alert("Please fill out ALL the fields correctly")
    }
  }

  //to put general data
  const generalSubmit = async (e) => {
    e.preventDefault()
    try {



      //create values for input data
      let births = parseInt(document.getElementById('births').value)
      let attendance_date = new Date(document.getElementById('date-general').value)
      let deaths = parseInt(document.getElementById('deaths').value)
      let marriages = parseInt(document.getElementById('marriages').value)
      let converts = parseInt(document.getElementById('converts').value)
      let firsttimers = parseInt(document.getElementById('firsttimers').value)
      let workers = parseInt(document.getElementById('workers').value)
      let souls = parseInt(document.getElementById('souls').value)
      let hcentres = parseInt(document.getElementById('hcentres').value)
      let uminst = parseInt(document.getElementById('uminst').value)
      let nmembers = parseInt(document.getElementById('nmembers').value)
      let asp = parseInt(document.getElementById('asp').value)
      let anv = parseInt(document.getElementById('anv').value)
      let bw = parseInt(document.getElementById('bw').value)
      let deacons = parseInt(document.getElementById('deacons').value)
      let apastor = parseInt(document.getElementById('apastor').value)
      let fpastor = parseInt(document.getElementById('fpastor').value)
      let nworkers = parseInt(document.getElementById('nworkers').value)

      //safeguard against empties
      if (!births) {
        births = 0
      }
      if (!deaths) {
        deaths = 0
      }
      if (!marriages) {
        marriages = 0
      }
      if (!converts) {
        converts = 0
      }
      if (!firsttimers) {
        firsttimers = 0
      }
      if (!workers) {
        workers = 0
      }
      if (!souls) {
        souls = 0
      }
      if (!hcentres) {
        hcentres = 0
      }
      if (!uminst) {
        uminst = 0
      }
      if (!nmembers) {
        nmembers = 0
      }
      if (!asp) {
        asp = 0
      }
      if (!anv) {
        anv = 0
      }
      if (!bw) {
        bw = 0
      }
      if (!deacons) {
        deacons = 0
      }
      if (!apastor) {
        apastor = 0
      }
      if (!fpastor) {
        fpastor = 0
      }
      if (!nworkers) {
        nworkers = 0
      }


      const record = await addDoc(recordsduRef, {
        created: Timestamp.now(),
        section: "general",
        event: "No event, just recordsdu",
        period: period,
        date: attendance_date,
        births: births,
        deaths: deaths,
        marriages: marriages,
        converts: converts,
        firsttimers: firsttimers,
        evang_workers_inattendance: workers,
        souls_won: souls,
        house_fellowship_centres: hcentres,
        unordained_ministers: uminst,
        newly_baptised_members: nmembers,
        avg_sp_attendance: asp,
        avg_nv_attendance: anv,
        baptised_workers: bw,
        deacons: deacons,
        asst_pastors: apastor,
        full_pastors: fpastor,
        newly_baptised_workers: nworkers,
      })

      //clear up data after
      document.getElementById('date-attendance').value = ""
      document.getElementById('births').value = ""
      document.getElementById('deaths').value = ""
      document.getElementById('marriages').value = ""
      document.getElementById('converts').value = ""
      document.getElementById('firsttimers').value = ""
      document.getElementById('workers').value = ""
      document.getElementById('souls').value = ""
      document.getElementById('hcentres').value = ""
      document.getElementById('uminst').value = ""
      document.getElementById('nmembers').value = ""
      document.getElementById('asp').value = ""
      document.getElementById('anv').value = ""
      document.getElementById('bw').value = ""
      document.getElementById('deacons').value = ""
      document.getElementById('apastor').value = ""
      document.getElementById('fpastor').value = ""
      document.getElementById('nworkers').value = ""



    } catch {
      alert("Please fill out ALL the fields correctly")
    }
  }

  //Edit section
  let specEvent = ""
  let specDate = ""
  let specSection = ""
  let denoteId = ""

  const editStartFunction = () => {
    document.getElementById('specifier').style.display = "flex"
  }
  const editTableFunction = () => {
    let specDownEvent = document.getElementById('specEvent').value
    specEvent = document.getElementById('specEvent').value
    let specDownDate = new Date(document.getElementById('specDate').value)
    specDate = new Date(document.getElementById('specDate').value).toLocaleDateString()
    specSection = document.getElementById('specSection').value
    document.getElementById('specifier').style.display = "none"

    //to set deletion id
    for (let x = 0; x < recordsdu.length; x++) {
      let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
      let testEvent = recordsdu[x].data.event
      let testSection = recordsdu[x].data.section
      if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
        denoteId = recordsdu[x].id
        break
      }

    }
    if (specSection === "offerings") {
      //clear inputs
      document.getElementById('specEvent').selectedIndex = 0
      document.getElementById('specDate').value = ""
      document.getElementById('specSection').selectedIndex = 0
      //setup pre data
      let id
      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          id = recordsdu[x].id
          break
        }
      }
      //to detern=mine index of select to set for event
      let select = document.getElementById("worker-event").options
      let select_length = select.length
      let eventIndex
      for (let x = 0; x < select_length; x++) {
        if ((select[x].text === specEvent)) {
          eventIndex = x
          break
        }
      }
      document.getElementById('worker-event').selectedIndex = eventIndex
      //to detern=mine index of select to set for week
      let week_select = document.getElementById("worker-week").options
      let week_select_length = select.length
      let weekIndex

      for (let x = 0; x < recordsdu.length; x++) {
        let recWeek = recordsdu[x].data.week
        let isEqual = false
        for (let x = 0; x < week_select_length; x++) {
          if (parseInt(week_select[x].text) === recWeek) {
            weekIndex = x
            isEqual = true
            break
          }
          if (isEqual === true) { break }
        }

      }

      document.getElementById('worker-week').selectedIndex = weekIndex
      //set date
      document.getElementById('worker-date').value = specDownDate.toISOString().substring(0, 10)
      //set amount

      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          document.getElementById('worker-amount').value = recordsdu[x].data.amount
          break
        }

      }
      //set offering type

      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          document.getElementById('worker-type').value = recordsdu[x].data.type
          break
        }

      }

      //set payment type

      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          document.getElementById('worker-payment').value = recordsdu[x].data.payment_type
          break
        }

      }

      //hide 
      document.getElementById('worker').style.display = "flex"
    }
    if (specSection === "attendance") {
      //clear inputs
      document.getElementById('specEvent').selectedIndex = 0
      document.getElementById('specDate').value = ""
      document.getElementById('specSection').selectedIndex = 0
      //to detern=mine index of select to set for event
      let select = document.getElementById("worked-event").options
      let select_length = select.length
      let eventIndex
      for (let x = 0; x < select_length; x++) {
        if ((select[x].text === specEvent)) {
          eventIndex = x
          break
        }
      }
      document.getElementById('worked-event').selectedIndex = eventIndex
      //to detern=mine index of select to set for week
      let week_select = document.getElementById("worked-week").options
      let week_select_length = select.length
      let weekIndex

      for (let x = 0; x < recordsdu.length; x++) {
        let recWeek = recordsdu[x].data.week
        let isEqual = false
        for (let x = 0; x < week_select_length; x++) {
          if (parseInt(week_select[x].text) === recWeek) {
            weekIndex = x
            isEqual = true
            break
          }
          if (isEqual === true) { break }
        }

      }

      document.getElementById('worked-week').selectedIndex = weekIndex
      //set date
      document.getElementById('worked-date').value = specDownDate.toISOString().substring(0, 10)
      //set men
      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          document.getElementById('worked-men').value = recordsdu[x].data.men
          break
        }

      }
      //set women
      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          document.getElementById('worked-women').value = recordsdu[x].data.women
          break
        }

      }
      //set children
      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          document.getElementById('worked-children').value = recordsdu[x].data.children
          break
        }

      }
      //set newcomer
      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          document.getElementById('worked-newcomers').value = recordsdu[x].data.newcomer
          break
        }

      }
      //set convert
      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          document.getElementById('worked-converts').value = recordsdu[x].data.convert
          break
        }

      }







      document.getElementById('worked').style.display = "flex"
    }
    if (specSection === "general") {
      //clear inputs
      document.getElementById('specEvent').selectedIndex = 0
      document.getElementById('specDate').value = ""
      document.getElementById('specSection').selectedIndex = 0

      //set date
      document.getElementById('general-date').value = specDownDate.toISOString().substring(0, 10)
      //set all data
      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          document.getElementById('general-births').value = recordsdu[x].data.births
          document.getElementById('general-deaths').value = recordsdu[x].data.deaths
          document.getElementById('general-marriages').value = recordsdu[x].data.marriages
          document.getElementById('general-converts').value = recordsdu[x].data.converts
          document.getElementById('general-firsttimers').value = recordsdu[x].data.firsttimers
          document.getElementById('general-workers').value = recordsdu[x].data.evang_workers_inattendance
          document.getElementById('general-souls').value = recordsdu[x].data.souls_won
          document.getElementById('general-hcentres').value = recordsdu[x].data.house_fellowship_centres
          document.getElementById('general-uminst').value = recordsdu[x].data.unordained_ministers
          document.getElementById('general-nmembers').value = recordsdu[x].data.newly_baptised_members
          document.getElementById('general-asp').value = recordsdu[x].data.avg_sp_attendance
          document.getElementById('general-anv').value = recordsdu[x].data.avg_nv_attendance
          document.getElementById('general-bw').value = recordsdu[x].data.baptised_workers
          document.getElementById('general-deacons').value = recordsdu[x].data.deacons
          document.getElementById('general-apastor').value = recordsdu[x].data.asst_pastors
          document.getElementById('general-fpastor').value = recordsdu[x].data.full_pastors
          document.getElementById('general-nworkers').value = recordsdu[x].data.newly_baptised_workers
          break
        }
      }
      document.getElementById('general').style.display = "flex"
    }
  }
  const editSubmitFunction = () => {
    if (specSection === "attendance") {
      let id
      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          id = recordsdu[x].id
          break
        }

      }
      //update
      const recordDocRef = doc(db, 'recordsdu', id)
      try {
        updateDoc(recordDocRef, {
          event: document.getElementById('worked-event').value,
          week: parseInt(document.getElementById('worked-week').value),
          date: new Date(document.getElementById('worked-date').value),
          men: parseInt(document.getElementById('worked-men').value),
          women: parseInt(document.getElementById('worked-women').value),
          children: parseInt(document.getElementById('worked-children').value),
          newcomer: parseInt(document.getElementById('worked-newcomers').value),
          convert: parseInt(document.getElementById('worked-converts').value)
        })
      } catch (err) {
        alert(err)
      }
      //clear inputs
      document.getElementById('worked-event').selectedIndex = 0
      document.getElementById('worked-week').selectedIndex = 0
      document.getElementById('worked-week').value = ""
      document.getElementById('worked-men').value = ""
      document.getElementById('worked-women').value = ""
      document.getElementById('worked-children').value = ""
      document.getElementById('worked-newcomers').value = ""
      document.getElementById('worked-converts').value = ""

      document.getElementById('worked').style.display = "none"
    }
    if (specSection === "offerings") {
      let id
      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          id = recordsdu[x].id
          break
        }

      }
      //update
      const recordDocRef = doc(db, 'recordsdu', id)
      try {
        updateDoc(recordDocRef, {
          event: document.getElementById('worker-event').value,
          week: parseInt(document.getElementById('worker-week').value),
          date: new Date(document.getElementById('worker-date').value),
          amount: parseInt(document.getElementById('worker-amount').value),
          type: document.getElementById('worker-type').value,
          payment_type: document.getElementById('worker-payment').value
        })
      } catch (err) {
        alert(err)
      }
      document.getElementById('worker-event').selectedIndex = 0
      document.getElementById('worker-week').selectedIndex = 0
      document.getElementById('worker-date').value = ""
      document.getElementById('worker-amount').value = ""
      document.getElementById('worker-type').selectedIndex = 0
      document.getElementById('worker-payment').selectedIndex = 0

      document.getElementById('worker').style.display = "none"
    }
    if (specSection === "general") {
      let id
      for (let x = 0; x < recordsdu.length; x++) {
        let testDate = recordsdu[x].data.date.toDate().toLocaleDateString()
        let testEvent = recordsdu[x].data.event
        let testSection = recordsdu[x].data.section
        if ((testDate === specDate) && (testEvent === specEvent) && (testSection === specSection)) {
          id = recordsdu[x].id
          break
        }
      }
      //update
      const recordDocRef = doc(db, 'recordsdu', id)
      try {
        updateDoc(recordDocRef, {
          births: parseInt(document.getElementById('general-births').value),
          deaths: parseInt(document.getElementById('general-deaths').value),
          marriages: parseInt(document.getElementById('general-marriages').value),
          converts: parseInt(document.getElementById('general-converts').value),
          firsttimers: parseInt(document.getElementById('general-firsttimers').value),
          evang_workers_inattendance: parseInt(document.getElementById('general-workers').value),
          souls_won: parseInt(document.getElementById('general-souls').value),
          house_fellowship_centres: parseInt(document.getElementById('general-hcentres').value),
          unordained_ministers: parseInt(document.getElementById('general-uminst').value),
          newly_baptised_members: parseInt(document.getElementById('general-nmembers').value),
          avg_sp_attendance: parseInt(document.getElementById('general-asp').value),
          avg_nv_attendance: parseInt(document.getElementById('general-anv').value),
          baptised_workers: parseInt(document.getElementById('general-bw').value),
          deacons: parseInt(document.getElementById('general-deacons').value),
          asst_pastors: parseInt(document.getElementById('general-apastor').value),
          full_pastors: parseInt(document.getElementById('general-fpastor').value),
          newly_baptised_workers: parseInt(document.getElementById('general-nworkers').value),
        })
      } catch (err) {
        alert(err)
      }
      //clear inputs
      document.getElementById('general-births').value = ""
      document.getElementById('general-deaths').value = ""
      document.getElementById('general-marriages').value = ""
      document.getElementById('general-converts').value = ""
      document.getElementById('general-firsttimers').value = ""
      document.getElementById('general-workers').value = ""
      document.getElementById('general-souls').value = ""
      document.getElementById('general-hcentres').value = ""
      document.getElementById('general-uminst').value = ""
      document.getElementById('general-nmembers').value = ""
      document.getElementById('general-asp').value = ""
      document.getElementById('general-anv').value = ""
      document.getElementById('general-bw').value = ""
      document.getElementById('general-deacons').value = ""
      document.getElementById('general-apastor').value = ""
      document.getElementById('general-fpastor').value = ""
      document.getElementById('general-nworkers').value = ""

      document.getElementById('general').style.display = "none"

    }
  }
  const closeSpecifier = () => {
    //clear inputs
    document.getElementById('specEvent').selectedIndex = 0
    document.getElementById('specDate').value = ""
    document.getElementById('specSection').selectedIndex = 0
    document.getElementById('specifier').style.display = "none"
  }
  const closeWork = () => {
    document.getElementById('deletion').style.display = "flex"
    document.getElementById('worker').style.display = "none"
    document.getElementById('worked').style.display = "none"

  }

  const toCloseAlert = () => {
    document.getElementById('deletion').style.display = "none"
  }

  const toDelete = async () => {
    const recordsduDocRef = doc(db, 'recordsdu', denoteId)
    try {
      await deleteDoc(recordsduDocRef)
    } catch (err) {
      alert(err)
    }
    document.getElementById('deletion').style.display = "none"
  }


  //TO gET TOTAL AMOUNT FOR THE AMOUNT TYPE
  const amountTotal = (name) => {
    let totalAmount = 0
    let length = recordsdu.length
    for (let x = 0; x < length; x++) {
      let recName = recordsdu[x].data.type
      let recAltName = recordsdu[x].data.payment_type
      let recAmount = recordsdu[x].data.amount
      let recPeriod = recordsdu[x].data.period
      if (((name === recName) || (name === recAltName)) && (recPeriod === period)) {
        totalAmount = totalAmount + recAmount
      }
    }
    return totalAmount
  }

  //Arrays to hold total data
  const ultArray = []
  const array1 = []
  const array2 = []
  const array3 = []
  const array4 = []
  //to get remit amount
  const amountRemit = (name, percent, note) => {
    const amount = amountTotal(name)
    const remit = (percent * amount)
    if (note === "table") {
      array1.push(remit)
    }
    if (note === "item") {
      array2.push(remit)
    }
    if (note === "fixed") {
      array3.push(remit)
    }
    if (note === "levies") {
      array4.push(remit)
    }

    return remit
  }


  //to get total remit value
  const totalRemit = () => {
    let remitTotal = 0
    for (let x = 0; x < array1.length; x++) {
      remitTotal = remitTotal + array1[x]
    }
    ultArray.push(remitTotal)
    return remitTotal
  }

  //to get total remit value
  const totalRemit2 = () => {
    let remitTotal = 0
    for (let x = 0; x < array2.length; x++) {
      remitTotal = remitTotal + array2[x]
    }
    ultArray.push(remitTotal)
    return remitTotal
  }

  //to get total remit value
  const totalRemit3 = () => {
    let remitTotal = 0
    for (let x = 0; x < array3.length; x++) {
      remitTotal = remitTotal + array3[x]
    }
    ultArray.push(remitTotal)
    return remitTotal
  }
  //to get total remit value
  const totalRemit4 = () => {
    let remitTotal = 0
    for (let x = 0; x < array4.length; x++) {
      remitTotal = remitTotal + array4[x]
    }
    ultArray.push(remitTotal)
    return remitTotal
  }
  //to get tithe rebate
  const tRebate = () => {
    let minTithe = amountTotal("Minister's tithe")
    let genTithe = amountTotal("General tithe")
    let rebate = .20 * ((.36 * minTithe) + (.36 * genTithe))
    ultArray.push(rebate)
    return rebate
  }



  const absoluteTotal = () => {
    let remitTotal = 0
    for (let x = 0; x < ultArray.length; x++) {
      remitTotal = remitTotal + ultArray[x]
    }
    ultArray.push(remitTotal)
    return remitTotal
  }


  //to get weekly attendance
  const attendanceWeekly = (week, event) => {
    let length = recordsdu.length
    let men = 0
    let women = 0
    let children = 0
    let total = 0
    for (let x = 0; x < length; x++) {
      let recEvent = recordsdu[x].data.event
      let recPeriod = recordsdu[x].data.period
      let recWeek = recordsdu[x].data.week
      let recSection = recordsdu[x].data.section
      let compWeek = parseInt(week)
      if (((compWeek === recWeek) && (event === recEvent) && (period === recPeriod) && (recSection === "attendance"))) {
        men = parseInt(recordsdu[x].data.men)
        women = parseInt(recordsdu[x].data.women)
        children = parseInt(recordsdu[x].data.children)
        total = men + women + children
        break
      }
    }
    return (
      <tr>
        <td>{event}</td>
        <td>{men}</td>
        <td>{women}</td>
        <td>{children}</td>
        <td>{total}</td>
      </tr>
    )
  }
  //to get general recordsdu
  const generalrecordsdu = () => {
    let length = recordsdu.length
    let births = 0
    let deaths = 0
    let marriages = 0
    let converts = 0
    let firsttimers = 0
    let workers = 0
    let souls = 0
    let hcentres = 0
    let uminst = 0
    let nmembers = 0
    let asp = 0
    let anv = 0
    let bworkers = 0
    let deacons = 0
    let apastor = 0
    let fpastor = 0
    let nworkers = 0

    for (let x = 0; x < length; x++) {
      let recPeriod = recordsdu[x].data.period
      let recSection = recordsdu[x].data.section
      if (((period === recPeriod) && (recSection === "general"))) {
        births = parseInt(recordsdu[x].data.births)
        deaths = parseInt(recordsdu[x].data.deaths)
        marriages = parseInt(recordsdu[x].data.marriages)
        converts = parseInt(recordsdu[x].data.converts)
        firsttimers = parseInt(recordsdu[x].data.firsttimers)
        workers = parseInt(recordsdu[x].data.evang_workers_inattendance)
        souls = parseInt(recordsdu[x].data.souls_won)
        hcentres = parseInt(recordsdu[x].data.house_fellowship_centres)
        uminst = parseInt(recordsdu[x].data.unordained_ministers)
        nmembers = parseInt(recordsdu[x].data.newly_baptised_members)
        asp = parseInt(recordsdu[x].data.avg_sp_attendance)
        anv = parseInt(recordsdu[x].data.avg_nv_attendance)
        bworkers = parseInt(recordsdu[x].data.baptised_workers)
        deacons = parseInt(recordsdu[x].data.deacons)
        apastor = parseInt(recordsdu[x].data.asst_pastors)
        fpastor = parseInt(recordsdu[x].data.full_pastors)
        nworkers = parseInt(recordsdu[x].data.newly_baptised_workers)
        break
      }
    }
    return (
      <>
        <tr><td>Item</td> <td>Value</td></tr>
        <tr><td>Births</td> <td>{births}</td></tr>
        <tr><td>Deaths</td> <td>{deaths}</td></tr>
        <tr><td>Marriages</td> <td>{marriages}</td></tr>
        <tr><td>Converts</td> <td>{converts}</td></tr>
        <tr><td>First timers</td> <td>{firsttimers}</td></tr>
        <tr><td>Let's Go a Fishing</td> <td></td></tr>
        <tr><td>Workers that attended </td> <td>{workers}</td></tr>
        <tr><td>Souls won</td> <td>{souls}</td></tr>
        <tr><td></td> <td></td></tr>
        <tr><td>House fellowship centres</td> <td>{hcentres}</td></tr>
        <tr><td>Unordained ministers</td> <td>{uminst}</td></tr>
        <tr><td>Newly baptised members</td> <td>{nmembers}</td></tr>
        <tr><td>Avg. special program attendance</td> <td>{asp}</td></tr>
        <tr><td>Avg. night vigil attendance</td> <td>{anv}</td></tr>
        <tr><td>Deacons</td> <td>{deacons}</td></tr>
        <tr><td>Assistant pastors</td> <td>{apastor}</td></tr>
        <tr><td>Full pastors</td> <td>{fpastor}</td></tr>
        <tr><td>New workers</td> <td>{nworkers}</td></tr>
      </>
    )
  }

  //TO gET TOTAL AMOUNT FOR THE AMOUNT TYPE
  const amountTotalWeek = (name) => {
    let totalAmount = 0
    let length = recordsdu.length
    let compWeek = parseInt(week)
    for (let x = 0; x < length; x++) {
      let recName = recordsdu[x].data.type
      let recAltName = recordsdu[x].data.payment_type
      let recAmount = recordsdu[x].data.amount
      let recPeriod = recordsdu[x].data.period
      let recWeek = parseInt(recordsdu[x].data.week)

      if (((name === recName) || (name === recAltName)) && (recPeriod === period) && (recWeek === compWeek)) {

        totalAmount = totalAmount + recAmount

      }

    }

    return totalAmount
  }

  //to get total remit value
  const totalRemitWeek = () => {
    let totalAmount = 0
    let length = recordsdu.length
    for (let x = 0; x < length; x++) {
      let recWeek = parseInt(recordsdu[x].data.week)
      let compWeek = parseInt(week)
      let recAmount = recordsdu[x].data.amount
      let recPeriod = recordsdu[x].data.period
      let recSection = recordsdu[x].data.section
      if ((recPeriod === period) && (recWeek === compWeek) && (recSection === "offerings")) {
        totalAmount = totalAmount + recAmount
      }
    }
    return totalAmount
  }

  //state for table week
  const [week, setWeek] = useState();
  //state to check if week set
  const [weekset, isWeekSet] = useState(false);
  //method to set week
  const weekSetter = () => {
    let input = document.getElementById('week-selector').value
    //check if empty
    if ((input >= 1) || (input <= 5)) {
      setWeek(input)
      isWeekSet(true)
    }
    if ((input <= 0) || (input > 5)) {
      alert("Invalid week number. Please put a value within range of 1 and 5")
      setWeek()
      isWeekSet(false)
      document.getElementById('week-selector').value = ""
    }
    if ((input === "") || (input === null)) {
      alert("No value typed in. Please put a value within range of 1 and 5")
      setWeek()
      isWeekSet(false)
    }
  }

  return (
    <StyledHome>
      <Nav2
        name="power sanctuary" />
      <Main>
        <div className="intro" id="buttons">
          <div className="welcome">
            <div className="img" />
            <h1>Welcome to the rccg offering system</h1>
          </div>
          <p className="introtext">What would you like to do?</p>
          <div className="buttons">
            <HashLink smooth to='/home2/#main-form' ><div className="button">data entry</div></HashLink>
            <HashLink smooth to='/home2/#reports' ><div className="button">view report</div></HashLink>
          </div>
        </div>

        <div id="main-form">
          <h2>Data entry</h2>
          <div className="main">
            <form className="mini-form" action="submit" >
              <div className="title">
                <h3>Offering <span>(please fill all the fields)</span></h3>
                <span className="line" />
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
                    <option value="No event, just recordsdu">No event, just recordsdu</option>
                  </select>

                </div>
                <div className="input">
                  <h4>Week</h4>
                  <select name="Event" id="week-offering">
                    <option value="0">--Please pick a week number--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>

                  </select>

                </div>

                <div className="input">
                  <h4>Date</h4>
                  <input type="date" id="date-offering" placeholder="Date:" />
                </div>
                <div className="input">
                  <h4>Offering type</h4>
                  <select name="cars" id="type-offering">
                    <option value="not valid">--Please pick an offering type--</option>
                    <option value="General tithe">General tithe</option>
                    <option value="Minister's tithe">Minister's tithe</option>
                    <option value="Offerings">Offerings</option>
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
                  <h4>Amount</h4>
                  <input type="number" id="amount" placeholder="Amount" />
                </div>
                <div className="input">
                  <h4>Payment type</h4>
                  <select name="cars" id="payment-offering">
                    <option value="Not donation">--Please pick a payment type--</option>
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
              {
                isFetched &&
                <button onClick={offeringSubmit}>Submit</button>
              }



            </form>

            <form className="mini-form" action="submit" >
              <div className="title">
                <h3>Attendance <span>(please fill all the fields)</span></h3>
                <span className="line" />
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
                    <option value="No event, just recordsdu">No event, just recordsdu</option>
                  </select>

                </div>
                <div className="input">
                  <h4>Week</h4>
                  <select name="Event" id="week-attendance">
                    <option value="0">--Please pick a week number--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>

                  </select>

                </div>
                <div className="input">
                  <h4>Date</h4>
                  <input type="date" id="date-attendance" />
                </div>
                <div className="input">
                  <h4>Men</h4>
                  <input type="number" id="men" placeholder="Number of men" />
                </div>
                <div className="input">
                  <h4>Women</h4>
                  <input type="number" id="women" placeholder="Number of women" />
                </div>
                <div className="input">
                  <h4>Children</h4>
                  <input type="number" id="children" placeholder="Number of children" />
                </div>



              </div>
              {
                isFetched &&
                <button onClick={attendanceSubmit}>Submit</button>
              }



            </form>
            <form className="mini-form" action="submit" >
              <div className="title">
                <h3>General information <span>(please fill all the fields)</span></h3>
                <span className="line" />
              </div>
              <div className="form">
                <div className="input">
                  <h4>Date</h4>
                  <input type="date" id="date-general" />
                </div>
                <div className="input">
                  <h4>Births</h4>
                  <input type="number" id="births" placeholder="Number of births" />
                </div>
                <div className="input">
                  <h4>Deaths</h4>
                  <input type="number" id="deaths" placeholder="Number of deaths" />
                </div>
                <div className="input">
                  <h4>Marriages</h4>
                  <input type="number" id="marriages" placeholder="Number of marriages" />
                </div>
                <div className="input">
                  <h4>Converts</h4>
                  <input type="number" id="converts" placeholder="Number of converts" />
                </div>
                <div className="input">
                  <h4>First timers</h4>
                  <input type="number" id="firsttimers" placeholder="Number of newcomers" />
                </div>
                <div className="title">
                  <h3>The next two inputs are for evangelism</h3>
                  <span className="line" />
                </div>
                <div className="input">
                  <h4>Workers in attendance</h4>
                  <input type="number" id="workers" placeholder="Workers in attendance" />
                </div>
                <div className="input">
                  <h4>Souls won</h4>
                  <input type="number" id="souls" placeholder="Souls won" />
                </div>
                <div className="input">
                  <h4>House fellowship centres</h4>
                  <input type="number" id="hcentres" placeholder="House fellowship centres" />
                </div>
                <div className="input">
                  <h4>Unordained ministers</h4>
                  <input type="number" id="uminst" placeholder="Number of unordained ministers" />
                </div>
                <div className="input">
                  <h4>Newly baptised members</h4>
                  <input type="number" id="nmembers" placeholder="Number of newly baptised members" />
                </div>
                <div className="input">
                  <h4>Avg attendance of special programs</h4>
                  <input type="number" id="asp" placeholder="Special programs avg attendance" />
                </div>
                <div className="input">
                  <h4>Avg attendance of night vigils</h4>
                  <input type="number" id="anv" placeholder="Night vigils avg attendance" />
                </div>
                <div className="input">
                  <h4>Baptised workers</h4>
                  <input type="number" id="bw" placeholder="Number of baptised workers" />
                </div>
                <div className="input">
                  <h4>Deacons</h4>
                  <input type="number" id="deacons" placeholder="Number of deacons" />
                </div>
                <div className="input">
                  <h4>Asst pastors</h4>
                  <input type="number" id="apastor" placeholder="Number of assistant pastors" />
                </div>
                <div className="input">
                  <h4>Full pastors</h4>
                  <input type="number" id="fpastor" placeholder="Number of full pastors" />
                </div>
                <div className="input">
                  <h4>New workers</h4>
                  <input type="number" id="nworkers" placeholder="Number of new workers" />
                </div>
              </div>
              {
                isFetched &&
                <button onClick={generalSubmit}>Submit</button>
              }



            </form>

          </div>
        </div>



        <div id="reports">
          <div className="report-section">
            <h2>View report</h2>
            <p>Put in the week number and click <span>LOAD</span> to generate weekly report. Click <span>EDIT</span> to edit recordsdu.</p>
            <div className="settings">
              <h4>Week:</h4>
              <input id="week-selector" type="number" />
              <button onClick={weekSetter}>load</button>
              <button onClick={editStartFunction}>edit</button>
            </div>

            <div className="table">
              {weekset &&
                <table >
                  <tbody>
                    <tr><td id="type">Offering recordsdu (Week {week})</td></tr>
                    <tr><td id="title">Offerings</td></tr>
                    <tr>
                      <th>Item Name</th>
                      <th>Amount</th>
                    </tr>
                    {isFetched &&
                      <>

                        <TableWeek
                          name="Offerings"
                          totalAmount={amountTotalWeek("Offerings")}
                        />
                        <TableWeek
                          name="General tithe"
                          totalAmount={amountTotalWeek("General tithe")}
                        />
                        <TableWeek
                          name="Minister's tithe"
                          totalAmount={amountTotalWeek("Minister's tithe")}
                        />
                        <TableWeek
                          name="Sunday school"
                          totalAmount={amountTotalWeek("Sunday school")}
                        />
                        <TableWeek
                          name="Sunday love offering"
                          totalAmount={amountTotalWeek("Sunday love offering")}
                        />
                        <TableWeek
                          name="Thanksgiving"
                          totalAmount={amountTotalWeek("Thanksgiving")}
                        />
                        <TableWeek
                          name="CRM"
                          totalAmount={amountTotalWeek("CRM")}
                        />
                        <TableWeek
                          name="Children offering"
                          totalAmount={amountTotalWeek("Children offering")}
                        />
                        <TableWeek
                          name="First fruit"
                          totalAmount={amountTotalWeek("First fruit")}
                        />
                        <TableWeek
                          name="Gospel fund"
                          totalAmount={amountTotalWeek("Gospel fund")}
                        />
                        <TableWeek
                          name="House fellowship offering"
                          totalAmount={amountTotalWeek("House fellowship offering")}
                        />


                        <tr>
                          <th>Total </th>
                          <th>{totalRemitWeek()}</th>
                        </tr>
                      </>
                    }
                    <tr><td id="type">Attendance recordsdu</td></tr>
                    <tr><td id="title">Week {week}</td></tr>
                    <tr>
                      <th>Event</th>
                      <th>Men</th>
                      <th>Women</th>
                      <th>Children</th>
                      <th>Total</th>
                    </tr>
                    {
                      isFetched &&
                      <>
                        {attendanceWeekly(week, "Sunday service")}
                        {attendanceWeekly(week, "Sunday school")}
                        {attendanceWeekly(week, "House fellowship")}
                        {attendanceWeekly(week, "Tuesday service")}
                        {attendanceWeekly(week, "Thursday service")}
                        {attendanceWeekly(week, "Friday night vigil")}
                      </>
                    }

                  </tbody>
                </table>
              }


              <table ref={tableRef}>
                <tbody>
                  <>
                    <tr><td id="type">Offering recordsdu</td></tr>
                    <tr><td id="title">Offerings</td></tr>
                    <tr>
                      <th>Item Name</th>
                      <th>Amount</th>
                      <th>Remit percentage</th>
                      <th>Remittance</th>
                    </tr>
                    {isFetched &&
                      <>

                        <Table
                          name="Offerings"
                          totalAmount={amountTotal("Offerings", period)}
                          percent="64%"
                          remitAmount={amountRemit("Offerings", .64, "table")}
                        />
                        <Table
                          name="General tithe"
                          totalAmount={amountTotal("General tithe")}
                          percent="64%"
                          remitAmount={amountRemit("General tithe", .64, "table")}
                        />
                        <Table
                          name="Minister's tithe"
                          totalAmount={amountTotal("Minister's tithe")}
                          percent="64%"
                          remitAmount={amountRemit("Minister's tithe", .64, "table")}
                        />
                        <Table
                          name="Sunday school"
                          totalAmount={amountTotal("Sunday school")}
                          percent="100%"
                          remitAmount={amountRemit("Sunday school", 1, "table")}
                        />
                        <Table
                          name="Sunday love offering"
                          totalAmount={amountTotal("Sunday love offering")}
                          percent="10%"
                          remitAmount={amountRemit("Sunday love offering", .10, "table")}
                        />
                        <Table
                          name="Thanksgiving"
                          totalAmount={amountTotal("Thanksgiving")}
                          percent="70%"
                          remitAmount={amountRemit("Thanksgiving", .70, "table")}
                        />
                        <Table
                          name="CRM"
                          totalAmount={amountTotal("CRM")}
                          percent="50%"
                          remitAmount={amountRemit("CRM", .50, "table")}
                        />
                        <Table
                          name="Children offering"
                          totalAmount={amountTotal("Children offering")}
                          percent="35%"
                          remitAmount={amountRemit("Children offering", .35, "table")}
                        />
                        <Table
                          name="First fruit"
                          totalAmount={amountTotal("First fruit")}
                          percent="90%"
                          remitAmount={amountRemit("First fruit", .90, "table")}
                        />
                        <Table
                          name="Gospel fund"
                          totalAmount={amountTotal("Gospel fund")}
                          percent="25%"
                          remitAmount={amountRemit("Gospel fund", .25, "table")}
                        />
                        <Table
                          name="House fellowship offering"
                          totalAmount={amountTotal("House fellowship offering",)}
                          percent="100%"
                          remitAmount={amountRemit("House fellowship offering", 1, "table")}
                        />
                        <Table
                          name="African mission"
                          totalAmount={amountTotal("African mission")}
                          percent="100%"
                          remitAmount={amountRemit("African mission", 1, "table")}
                        />
                        <Table
                          name="Annual report"
                          totalAmount={amountTotal("Annual report")}
                          percent="100%"
                          remitAmount={amountRemit("Annual report", 1, "table")}
                        />
                        <Table
                          name="Annual thanksgiving"
                          totalAmount={amountTotal("Annual thanksgiving")}
                          percent="100%"
                          remitAmount={amountRemit("Annual thanksgiving", 1, "table")}
                        />
                        <Table
                          name="Audit S/F"
                          totalAmount={amountTotal("Audit S/F")}
                          percent="100%"
                          remitAmount={amountRemit("Audit S/F", 1, "table")}
                        />
                        <Table
                          name="Baptismal certificate"
                          totalAmount={amountTotal("Baptismal certificate")}
                          percent="100%"
                          remitAmount={amountRemit("Baptismal certificate", 1, "table")}
                        />
                        <Table
                          name="Building dev offering"
                          totalAmount={amountTotal("Building dev offering")}
                          percent="100%"
                          remitAmount={amountRemit("Building dev offering", 1, "table")}
                        />
                        <Table
                          name="Camp clearing"
                          totalAmount={amountTotal("Camp clearing")}
                          percent="100%"
                          remitAmount={amountRemit("Camp clearing", 1, "table")}
                        />
                        <Table
                          name="Children zeal"
                          totalAmount={amountTotal("Children zeal")}
                          percent="100%"
                          remitAmount={amountRemit("Children zeal", 1, "table")}
                        />
                        <Table
                          name="Conference manual"
                          totalAmount={amountTotal("Conference manual")}
                          percent="100%"
                          remitAmount={amountRemit("Conference manual", 1, "table")}
                        />
                        <Table
                          name="Congress program"
                          totalAmount={amountTotal("Congress program")}
                          percent="100%"
                          remitAmount={amountRemit("Congress program", 1, "table")}
                        />
                        <Table
                          name="Congress support"
                          totalAmount={amountTotal("Congress support")}
                          percent="100%"
                          remitAmount={amountRemit("Congress support", 1, "table")}
                        />
                        <Table
                          name="Congress thanksgiving"
                          totalAmount={amountTotal("Congress thanksgiving")}
                          percent="100%"
                          remitAmount={amountRemit("Congress thanksgiving", 1, "table")}
                        />
                        <Table
                          name="Convention offering"
                          totalAmount={amountTotal("Convention offering")}
                          percent="100%"
                          remitAmount={amountRemit("Convention offering", 1, "table")}
                        />
                        <Table
                          name="Convention prog"
                          totalAmount={amountTotal("Convention prog")}
                          percent="100%"
                          remitAmount={amountRemit("Convention prog", 1, "table")}
                        />
                        <Table
                          name="Convention special thanksgiving"
                          totalAmount={amountTotal("Convention special thanksgiving")}
                          percent="100%"
                          remitAmount={amountRemit("Convention special thanksgiving", 1, "table")}
                        />
                        <Table
                          name="Convention support"
                          totalAmount={amountTotal("Convention support")}
                          percent="100%"
                          remitAmount={amountRemit("Convention support", 1, "table")}
                        />
                        <Table
                          name="Convention thanksgiving"
                          totalAmount={amountTotal("Convention thanksgiving")}
                          percent="100%"
                          remitAmount={amountRemit("Convention thanksgiving", 1, "table")}
                        />
                        <Table
                          name="Counselor support"
                          totalAmount={amountTotal("Counselor support")}
                          percent="100%"
                          remitAmount={amountRemit("Counselor support", 1, "table")}
                        />
                        <Table
                          name="Family weekend"
                          totalAmount={amountTotal("Family weekend")}
                          percent="100%"
                          remitAmount={amountRemit("Family weekend", 1, "table")}
                        />
                        <Table
                          name="First born redemption"
                          totalAmount={amountTotal("First born redemption")}
                          percent="100%"
                          remitAmount={amountRemit("First born redemption", 1, "table")}
                        />
                        <Table
                          name="GO anniversary thanksgiving"
                          totalAmount={amountTotal("GO anniversary thanksgiving")}
                          percent="100%"
                          remitAmount={amountRemit("GO anniversary thanksgiving", 1, "table")}
                        />
                        <Table
                          name="H/G service viewing centre offering"
                          totalAmount={amountTotal("H/G service viewing centre offering")}
                          percent="100%"
                          remitAmount={amountRemit("H/G service viewing centre offering", 1, "table")}
                        />
                        <Table
                          name="Helps weekend"
                          totalAmount={amountTotal("Helps weekend")}
                          percent="85%"
                          remitAmount={amountRemit("Helps weekend", .85, "table")}
                        />
                        <Table
                          name="Holy communion offering"
                          totalAmount={amountTotal("Holy communion offering")}
                          percent="100%"
                          remitAmount={amountRemit("Holy communion offering", 1, "table")}
                        />
                        <Table
                          name="Let's go a fishing"
                          totalAmount={amountTotal("Let's go a fishing")}
                          percent="100%"
                          remitAmount={amountRemit("Let's go a fishing", 1, "table")}
                        />
                        <Table
                          name="Marriage certificate"
                          totalAmount={amountTotal("Marriage certificate")}
                          percent="100%"
                          remitAmount={amountRemit("Marriage certificate", 1, "table")}
                        />
                        <Table
                          name="Minister's conference"
                          totalAmount={amountTotal("Minister's conference")}
                          percent="100%"
                          remitAmount={amountRemit("Minister's conference", 1, "table")}
                        />
                        <Table
                          name="Minister's new auditorium offering"
                          totalAmount={amountTotal("Minister's new auditorium offering")}
                          percent="100%"
                          remitAmount={amountRemit("Minister's new auditorium offering", 1, "table")}
                        />
                        <Table
                          name="Mission support"
                          totalAmount={amountTotal("Mission support")}
                          percent="100%"
                          remitAmount={amountRemit("Mission support", 1, "table")}
                        />
                        <Table
                          name="New auditorium"
                          totalAmount={amountTotal("New auditorium")}
                          percent="100%"
                          remitAmount={amountRemit("New auditorium", 1, "table")}
                        />
                        <Table
                          name="Pledges/Vow/Covenant Seed"
                          totalAmount={amountTotal("Pledges/Vow/Covenant Seed")}
                          percent="100%"
                          remitAmount={amountRemit("Pledges/Vow/Covenant Seed", 1, "table")}
                        />
                        <Table
                          name="Project offering"
                          totalAmount={amountTotal("Project offering")}
                          percent="100%"
                          remitAmount={amountRemit("Project offering", 1, "table")}
                        />
                        <Table
                          name="Provincial convention support"
                          totalAmount={amountTotal("Provincial convention support")}
                          percent="100%"
                          remitAmount={amountRemit("Provincial convention support", 1, "table")}
                        />
                        <Table
                          name="Province CSR support"
                          totalAmount={amountTotal("Province CSR support")}
                          percent="100%"
                          remitAmount={amountRemit("Province CSR support", 1, "table")}
                        />
                        <Table
                          name="Province programme offering"
                          totalAmount={amountTotal("Province programme offering")}
                          percent="100%"
                          remitAmount={amountRemit("Province programme offering", 1, "table")}
                        />
                        <Table
                          name="Radio and TV"
                          totalAmount={amountTotal("Radio and TV")}
                          percent="100%"
                          remitAmount={amountRemit("Radio and TV", 1, "table")}
                        />
                        <Table
                          name="RCCG Partner"
                          totalAmount={amountTotal("RCCG Partner")}
                          percent="100%"
                          remitAmount={amountRemit("RCCG Partner", 1, "table")}
                        />
                        <Table
                          name="Regional contribution"
                          totalAmount={amountTotal("Regional contribution")}
                          percent="100%"
                          remitAmount={amountRemit("Regional contribution", 1, "table")}
                        />
                        <Table
                          name="Send Forth/ Pastors' welfare"
                          totalAmount={amountTotal("Send Forth/ Pastors' welfare")}
                          percent="100%"
                          remitAmount={amountRemit("Send Forth/ Pastors' welfare", 1, "table")}
                        />
                        <Table
                          name="Special Holy Ghost Service support"
                          totalAmount={amountTotal("Special Holy Ghost Service support")}
                          percent="100%"
                          remitAmount={amountRemit("Special Holy Ghost Service support", 1, "table")}
                        />
                        <Table
                          name="Training weekend"
                          totalAmount={amountTotal("Training weekend")}
                          percent="100%"
                          remitAmount={amountRemit("Training weekend", 1, "table")}
                        />


                      </>
                    }
                    {isFetched &&
                      <tr>
                        <th>Total </th>
                        <th></th>
                        <th></th>
                        <th className="remitPart">{totalRemit()}</th>
                      </tr>
                    }
                    <tr><td id="title">Percentage of another item</td></tr>
                    {
                      isFetched &&
                      <>
                        <TableItem
                          name="20% Sunday love offering"
                          totalAmount={amountTotal("Sunday love offering")}
                          percent="20%"
                          remitAmount={amountRemit("Sunday love offering", .20, "item")}
                        />
                        <TableItem
                          name="25% CRM"
                          totalAmount={amountTotal("CRM",)}
                          percent="25%"
                          remitAmount={amountRemit("CRM", .25, "item")}
                        />
                        <TableItem
                          name="5% Thanksgiving"
                          totalAmount={amountTotal("Thanksgiving",)}
                          percent="5%"
                          remitAmount={amountRemit("Thanksgiving", .5, "item")}
                        />
                        <tr>
                          <th>Total </th>
                          <th></th>
                          <th></th>
                          <th className="remitPart">{totalRemit2()}</th>
                        </tr>
                      </>
                    }
                    <tr><td id="title">Fixed payments</td></tr>
                    {
                      isFetched &&
                      <>
                        <TableFixed
                          name="Convention volunteer"
                          totalAmount={amountTotal("Convention volunteer")}
                          percent="100%"
                          remitAmount={amountRemit("Convention volunteer", 1, "fixed")}
                        />
                        <TableFixed
                          name="Open Heaven Devotional"
                          totalAmount={amountTotal("Open Heaven Devotional")}
                          percent="100%"
                          remitAmount={amountRemit("Open Heaven Devotional", 1, "fixed")}
                        />
                        <TableFixed
                          name="CSR support"
                          totalAmount={amountTotal("CSR support")}
                          percent="100%"
                          remitAmount={amountRemit("CSR support", 1, "fixed")}
                        />
                        <TableFixed
                          name="RMF"
                          totalAmount={amountTotal("RMF")}
                          percent="100%"
                          remitAmount={amountRemit("RMF", 1, "fixed")}
                        />
                        <TableFixed
                          name="RUN Educational Fund"
                          totalAmount={amountTotal("RUN Educational Fund")}
                          percent="100%"
                          remitAmount={amountRemit("RUN Educational Fund", 1, "fixed")}
                        />
                        <tr>
                          <th>Total </th>
                          <th></th>
                          <th></th>
                          <th className="remitPart">{totalRemit3()}</th>
                        </tr>
                      </>
                    }
                    <tr><td id="title">Percentage of tithe rebate</td></tr>
                    {
                      isFetched &&
                      <>
                        <tr>
                          <th>Province joint church planting</th>
                          <th></th>
                          <th></th>
                          <th className="remitPart">{tRebate()}</th>
                        </tr>
                      </>
                    }
                    <tr><td id="title">Area levies</td></tr>
                    {
                      isFetched &&
                      <>
                        <TableLevies
                          name="Area levies (welfare)"
                          totalAmount={amountTotal("Area levies (welfare)")}
                          percent="100%"
                          remitAmount={amountRemit("Area levies (welfare)", 1, "levies")}
                        />
                        <TableLevies
                          name="Area levies (let's go a fishing)"
                          totalAmount={amountTotal("Area levies (let's go a fishing)")}
                          percent="100%"
                          remitAmount={amountRemit("Area levies (let's go a fishing)", 1, "levies")}
                        />
                        <tr>
                          <th>Total </th>
                          <th></th>
                          <th></th>
                          <th className="remitPart">{totalRemit4()}</th>
                        </tr>
                      </>
                    }

                    {
                      isFetched &&
                      <>
                        <tr><td id="title">Total Payment to Area</td></tr>
                        <tr>
                          <th>Amount</th>
                          <th></th>
                          <th></th>
                          <th>{absoluteTotal()}</th>
                        </tr>
                      </>
                    }
                  </>

                  <>
                    <tr><td id="type">Attendance recordsdu</td></tr>
                    <tr><td id="title">Week 1</td></tr>
                    <tr>
                      <th>Event</th>
                      <th>Men</th>
                      <th>Women</th>
                      <th>Children</th>
                      <th>Total</th>
                    </tr>
                    {
                      isFetched &&
                      <>
                        {attendanceWeekly(1, "Sunday service")}
                        {attendanceWeekly(1, "Sunday school")}
                        {attendanceWeekly(1, "House fellowship")}
                        {attendanceWeekly(1, "Tuesday service")}
                        {attendanceWeekly(1, "Thursday service")}
                        {attendanceWeekly(1, "Friday night vigil")}
                      </>
                    }
                    <tr><td id="title">Week 2</td></tr>
                    <tr>
                      <th>Event</th>
                      <th>Men</th>
                      <th>Women</th>
                      <th>Children</th>
                      <th>Total</th>
                    </tr>
                    {
                      isFetched &&
                      <>
                        {attendanceWeekly(2, "Sunday service")}
                        {attendanceWeekly(2, "Sunday school")}
                        {attendanceWeekly(2, "House fellowship")}
                        {attendanceWeekly(2, "Tuesday service")}
                        {attendanceWeekly(2, "Thursday service")}
                        {attendanceWeekly(2, "Friday night vigil")}
                      </>
                    }
                    <tr><td id="title">Week 3</td></tr>
                    <tr>
                      <th>Event</th>
                      <th>Men</th>
                      <th>Women</th>
                      <th>Children</th>
                      <th>Total</th>
                    </tr>
                    {
                      isFetched &&
                      <>
                        {attendanceWeekly(3, "Sunday service")}
                        {attendanceWeekly(3, "Sunday school")}
                        {attendanceWeekly(3, "House fellowship")}
                        {attendanceWeekly(3, "Tuesday service")}
                        {attendanceWeekly(3, "Thursday service")}
                        {attendanceWeekly(3, "Friday night vigil")}
                      </>
                    }
                    <tr><td id="title">Week 4</td></tr>
                    <tr>
                      <th>Event</th>
                      <th>Men</th>
                      <th>Women</th>
                      <th>Children</th>
                      <th>Total</th>
                    </tr>
                    {
                      isFetched &&
                      <>
                        {attendanceWeekly(4, "Sunday service")}
                        {attendanceWeekly(4, "Sunday school")}
                        {attendanceWeekly(4, "House fellowship")}
                        {attendanceWeekly(4, "Tuesday service")}
                        {attendanceWeekly(4, "Thursday service")}
                        {attendanceWeekly(4, "Friday night vigil")}
                      </>
                    }
                  </>
                  <>
                    <tr><td id="type">General recordsdu</td></tr>
                    {isFetched &&
                      <>
                        {generalrecordsdu()}
                      </>
                    }
                  </>
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
              <button className="warning" onClick={generatePeriod}>yes</button>
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
                  <span className="line" />
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
                        <option value="No event, just recordsdu">No event, just recordsdu</option>
                      </select>

                    </div>

                    <div className="input">
                      <h4>Date</h4>
                      <input type="date" id="specDate" />
                    </div>
                    <div className="input">
                      <h4>Section</h4>
                      <select name="Event" id="specSection">
                        <option value="not valid">--Please pick a section type--</option>
                        <option value="offerings">offerings</option>
                        <option value="attendance">attendance</option>
                        <option value="general">general</option>
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
                  <span className="line" />
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
                        <option value="No event, just recordsdu">No event, just recordsdu</option>
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
                      <input type="date" id="worker-date" />
                    </div>
                    <div className="input">
                      <h4>Amount</h4>
                      <input type="number" id="worker-amount" />
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
                  <span className="line" />
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
                        <option value="No event, just recordsdu">No event, just recordsdu</option>
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
                      <input type="date" id="worked-date" />
                    </div>
                    <div className="input">
                      <h4>Men</h4>
                      <input type="number" id="worked-men" />
                    </div>
                    <div className="input">
                      <h4>Women</h4>
                      <input type="number" id="worked-women" />
                    </div>
                    <div className="input">
                      <h4>Children</h4>
                      <input type="number" id="worked-children" />
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
          <StyledEdit id="general">
            <div className="main">
              <div className="flex">
                <div className="title">
                  <h3>Edit</h3>
                  <span className="line" />
                </div>
                <div className="form">
                  <div className="inner">
                    <div className="input">
                      <h4>Date</h4>
                      <input type="date" id="general-date" />
                    </div>
                    <div className="input">
                      <h4>Births</h4>
                      <input type="number" id="general-births" placeholder="Number of births" />
                    </div>
                    <div className="input">
                      <h4>Deaths</h4>
                      <input type="number" id="general-deaths" placeholder="Number of deaths" />
                    </div>
                    <div className="input">
                      <h4>Marriages</h4>
                      <input type="number" id="general-marriages" placeholder="Number of marriages" />
                    </div>
                    <div className="input">
                      <h4>Converts</h4>
                      <input type="number" id="general-converts" placeholder="Number of converts" />
                    </div>
                    <div className="input">
                      <h4>First timers</h4>
                      <input type="number" id="general-firsttimers" placeholder="Number of newcomers" />
                    </div>
                    <div className="title">
                      <h3>The next two inputs are for evangelism</h3>
                      <span className="line" />
                    </div>
                    <div className="input">
                      <h4>Workers in attendance</h4>
                      <input type="number" id="general-workers" placeholder="Workers in attendance" />
                    </div>
                    <div className="input">
                      <h4>Souls won</h4>
                      <input type="number" id="general-souls" placeholder="Souls won" />
                    </div>
                    <div className="input">
                      <h4>House fellowship centres</h4>
                      <input type="number" id="general-hcentres" placeholder="House fellowship centres" />
                    </div>
                    <div className="input">
                      <h4>Unordained ministers</h4>
                      <input type="number" id="general-uminst" placeholder="Number of unordained ministers" />
                    </div>
                    <div className="input">
                      <h4>Newly baptised members</h4>
                      <input type="number" id="general-nmembers" placeholder="Number of newly baptised members" />
                    </div>
                    <div className="input">
                      <h4>Avg attendance of special programs</h4>
                      <input type="number" id="general-asp" placeholder="Special programs avg attendance" />
                    </div>
                    <div className="input">
                      <h4>Avg attendance of night vigils</h4>
                      <input type="number" id="general-anv" placeholder="Night vigils avg attendance" />
                    </div>
                    <div className="input">
                      <h4>Baptised workers</h4>
                      <input type="number" id="general-bw" placeholder="Number of baptised workers" />
                    </div>
                    <div className="input">
                      <h4>Deacons</h4>
                      <input type="number" id="general-deacons" placeholder="Number of deacons" />
                    </div>
                    <div className="input">
                      <h4>Asst pastors</h4>
                      <input type="number" id="general-apastor" placeholder="Number of assistant pastors" />
                    </div>
                    <div className="input">
                      <h4>Full pastors</h4>
                      <input type="number" id="general-fpastor" placeholder="Number of full pastors" />
                    </div>
                    <div className="input">
                      <h4>New workers</h4>
                      <input type="number" id="general-nworkers" placeholder="Number of new workers" />
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

@media only screen and (max-width: 480px){
  padding-bottom:45px ;
}

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

   span{
font-size:25px ;
font-weight:bold;
   }
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

            color:transparent ;
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

@media only screen and (max-width: 480px){
  margin:0 ;
  h2{
    font-size:25px ;
  }
  .intro{
    width:100% ;
    height: 625px;
    border:1px solid black ;
    background:linear-gradient( rgba(20,83,45,.65), rgba(20,83,45,.65)),url(${welcomeImg}) ;
    background-size:cover ;
    background-position:center ;
    display:flex ;
    flex-direction:column ;
    align-items:center ;
    justify-content:center ;
    gap:35px;
    .welcome{
      justify-content:center ;
      align-items:center ;
      width:100%;
      height:auto ;
      h1{
        padding:0 ;
        text-align:center ;
        position:initial ;
        width:90% ;
        font-size:25px ;
        font-family: 'Helvetica Neu Bold',sans-serif;
        transform: translateY(0);
      }
      .img{
        display:none ;
      }
    }
    .introtext{
      font-size:25px ;
      font-family: 'Helvetica Neu Bold', sans-serif;
    }

  .buttons{
    width:80% ;
    gap:26px;
a{
  .button{
      font-size:16px ;
      text-align:center ;
    }
}
    
  }
  }
  #main-form{
    width: 90%;
    align-items:center ;
    margin:0 auto ;
    margin-top:45px ;

    .main{
      gap:65px;
      align-items:center ;


      .mini-form{
        align-items:center ;
       width:100% ;
       gap:30px;

        .title{
          width:100% ;
          align-items:center ;
          h3{
            font-size:25px ;
            span{
font-size:21px ;
   }
          }
        }

        .form{
          width:100% ;
          .input{
            width:100% ;
            h4{
              display:none ;
            }
            select,input{
              width:100% ;
              border-radius:5px ;
              font-size:20px ;
              &::placeholder{
                color:${darkColor} ; 
              }
            }
          }
         
        }
        button{
          border-radius:5px ;
            width:100% ;
            font-size:16px ;
            height: 50px;
          }
      }
    }
  }
  #reports{
    width:90% ;
    margin:0 auto ;
    margin-top:65px ;
    gap:35px;

    .report-section{
      width: 100%;
      gap:35px;
      align-items:center ;

      p{
        font-size: 15px;
        text-align:center ;
      }
      .settings{
        width: 90%;
        height: 40px;
        gap:5px;

        h4{
          font-size:16px ;
        }
        input,button{
          border-radius:5px ;
        }
        button{
          font-size:13px ;
          
        }
        input{
          padding:0 10px ;
        }
      }

      .table{
        width: 100%;

        table{
          font-size:13px ;
        }
      }

      
    }

    .buttons{
        width:100% ;
        gap:35px;
        height: 50px;
        button{
          font-size:13px ;
          height:100% ;
          border-radius:5px ;
        }
      }
  }
}

@media only screen and (min-width: 481px) and (max-width: 768px){
  margin:0 ;
  h2{
    font-size:25px ;
  }
  .intro{
    width:100% ;
.welcome{
  background:linear-gradient( rgba(20,83,45,.25), rgba(20,83,45,.25)),url(${welcomeImg}) ;
    background-size:cover ;
    background-position:center ;
  width: 100%;
  justify-content:center ;
  gap:40px;
  .img{
   display:none ;
  }
  h1{
    font-size:39px ;
    left:5% ;
    line-height:47px ;
    width:40% ;
  }
}
.introtext{
  font-size:31px ;
  margin-left:24px ;
}
.buttons{
  width: 80%;
  height: 50px;
  margin-left:24px;
  
  a .button{
    border-radius:5px ;
    font-size:20px ;
  }
}
  }
  #main-form{
    margin-top:90px ;
    width:80% ;
    margin-left:24px ;
    h2{
      font-size:31px ;
    }
    .main{
      width: 100%;
      gap:75px;
      .mini-form{
        width:100% ;
        .title{
          width:100% ;
         h3{ font-size:25px ;
          span{
font-size:21px ;
   }
        }
        }
        .form{
          width:100% ;

          .input{
            width:100% ;
            height: 50px;

            h4{
              font-size:25px ;
            }
            input,select{
              font-size:22px ;
            }
            input,select{
              width:70%;
              border-radius:5px ;
            }
          }
        }

        button{
          width: 35%;
          height: 50px;
          font-size:25px ;
          border-radius:5px ;
        }
      }
    }
  }
  #reports{
    width:90% ;
    margin:0 auto ;
    margin-top:65px ;
    gap:35px;

   .report-section{
    width:100% ;
    gap:35px;
    h2{
      font-size:31px ;
    }
    p{
      font-size:25px ;
    }
    .settings{
      height: 50px;
      gap:26px;
      h4,button{
        font-size:25px ;
      }
    }
   
   }
   .buttons{
      height: 50px;
      gap:75px;
      button{font-size:25px ;}
    }
  }
}
`
const StyledAlert = styled(motion.div)`
width:100% ;
height: 100%;
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


@media only screen and (max-width: 480px){
  .main{
    width:80% ;
    height:60% ;
    .flex{
      align-items:center ;

      h4{font-size:20px ; }
      p{
        font-size:25px ; 
      text-align:center;
    }
      .buttons{
        padding:0 ;
         height:50px ;
        gap:20px;
        button{
          height:100% ;
          border-radius:5px ;
          font-size:16px ;
        }
      }
    }
  }
}

@media only screen and (min-width: 481px) and (max-width: 768px){
  .main{
    width: 90%;
    height: 80%;
    .flex{
      align-items:center ;

      p{
        text-align:center ;
      }
      .buttons{
        button{
          font-size:20px ;
        }
      }
    }
  }
}
`

const StyledEdit = styled(motion.div)`
width:100% ;
height: 100%;
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

@media only screen and (max-width: 480px){

  .main{
    width: 80%;

    .flex{
      align-items:center ;
      

      .title{
        align-items:center ;
        gap:15px;

        h3{font-size:20px;}
      }

      .form{
        width: 100%;
        padding:0 ;
        .inner{
          
          .input{
            width:100% ;
            height:50px ;
            h4{display:none;}
            input,select{
              width:100% ;
              height:100% ;
              font-size:16px ;
            }
          }
        }
      }

      .buttons{
        height:50px ;
        gap:25px;
        button{
          height:100% ;
          font-size:16px ;
          
        }
      }
    }
  }
}
@media only screen and (min-width: 481px) and (max-width: 768px){
  height: 100%;
  .main{
    width:80% ;

    .flex{
      
      .title{
        gap:16px;
        h3{
          font-size:25px ;
        }
      }
.form{

  width:100% ;
  padding:0 ;
  .inner{
    align-items:center ;
    .input{
      width:100% ;
      height:50px ;

      h4,input,select{
        font-size:25px ;
      }
      input, select{
        width:70% ;
      }
      
    }
  }
}
.buttons{
  height: 50px;
  button{
    height: 100%;
    font-size:25px ;
  }
}
    }
  }
}

`
export default Home2