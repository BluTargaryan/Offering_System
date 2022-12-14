


const TableWeek = ({name,totalAmount,percent,remitAmount}) =>{

    
    return(
      <>
       <tr className="tr">
      <td>{name}</td>
      <td id="remitWeek">{totalAmount}</td>
  </tr>
      </>
    )
  }
  
  export default TableWeek