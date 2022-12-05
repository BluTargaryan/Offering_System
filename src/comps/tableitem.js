


const TableItem = ({name,totalAmount,percent,remitAmount}) =>{

    
    return(
      <>
       <tr className="tr">
      <td>{name}</td>
      <td>{totalAmount}</td>
      <td>{percent}</td>
      <td className="remitton">{remitAmount}</td>
  </tr>
      </>
    )
  }
  
  export default TableItem