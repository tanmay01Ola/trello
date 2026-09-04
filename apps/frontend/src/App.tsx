import axios from "axios";
import "./index.css";
import {BrowserRouter , Routes , Route} from "react-router-dom"
import { useEffect, useState } from "react";
import { Signup } from "./screens/signup";
import { Signin } from "./screens/signin";
import { Issues } from "./screens/issues";
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
          <Route path="/issues" element = {<Issues/>}></Route>
            </Routes>
            </BrowserRouter>
    </div>
  )
}

export default App;
