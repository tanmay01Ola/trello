import { useState } from "react"

const [board , setBoard] = useState()
export function Boards(){
    return(
        <div>
              {board}
        </div>
    )
}