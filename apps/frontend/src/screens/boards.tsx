import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export function Boards(){
    const navigate = useNavigate()
    const { orgId } = useParams();
    interface Board {
        id : string,
        BoardName : string
    }
 const[boards ,setBoard ] = useState<Board[]>([]);
const token = localStorage.getItem("token")
useEffect(()=>{
        async function handleBoards(){
            await axios.get(`http://localhost:3006/board/${orgId}` , {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
            .then((response)=>{
                setBoard(response.data.boards)
            })
        }
        handleBoards()
}, [])
  return(
      <div>
        {boards.map((board) => <div onClick={()=>{
          navigate(`/issues/${orgId}/${board.id}`)
        }} key={board.id}> {board.BoardName}</div>)}
      </div>
  )
} 