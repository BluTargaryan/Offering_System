


const TableWeek = ({name,totalAmount}) =>{

    
    return(
      <>
       <tr className="tr">
      <td>{name}</td>
      <td className="remitWeek">{totalAmount}</td>
  </tr>
      </>
    )
  }
  
  export default TableWeek