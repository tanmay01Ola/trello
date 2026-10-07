
import "./index.css";
import {BrowserRouter , Routes , Route} from "react-router-dom"
import { Signup } from "./screens/signup";
import { Signin } from "./screens/signin";
import { Issues } from "./screens/issues";
import { OrgPage } from "./screens/org";
import { Boards } from "./screens/boards";
interface Issues{
  id : string,
  title : string,
  status : "done" | "in_progress" | "upcoming"
}

export function App(){
  return(
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/signup" element= {<Signup/>}></Route>
          <Route path="/signin" element = {<Signin/>}></Route>
          <Route path="/issues/:orgId/:boardId" element = {<Issues/>}></Route>
          <Route path="/boards/:orgId" element = {<Boards></Boards>}></Route>
          <Route path="/org" element = {<OrgPage></OrgPage>}></Route>
            </Routes>
            </BrowserRouter>
    </div>
  )
}

export default App;
