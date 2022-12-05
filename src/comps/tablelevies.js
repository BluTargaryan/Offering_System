


const TableLevies = ({name,totalAmount,percent,remitAmount}) =>{

    
    return(
      <>
       <tr className="tr">
      <td>{name}</td>
      <td>{totalAmount}</td>
      <td>{percent}</td>
      <td className="remitlevy">{remitAmount}</td>
  </tr>
      </>
    )
  }
  
  export default TableLevies