


const Table = ({name,totalAmount,percent,remitAmount}) =>{

    
  return(
    <>
     <tr className="tr">
    <td>{name}</td>
    <td>{totalAmount}</td>
    <td>{percent}</td>
    <td className="remittal">{remitAmount}</td>
</tr>
    </>
  )
}

export default Table