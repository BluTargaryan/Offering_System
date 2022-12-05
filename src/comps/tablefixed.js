


const TableFixed = ({name,totalAmount,percent,remitAmount}) =>{

    
    return(
      <>
       <tr className="tr">
      <td>{name}</td>
      <td>{totalAmount}</td>
      <td>{percent}</td>
      <td className="remitfixed">{remitAmount}</td>
  </tr>
      </>
    )
  }
  
  export default TableFixed