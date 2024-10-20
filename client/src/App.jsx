import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import Member from './page/Member/Member';

import Admin from './page/Admin/Admin';
import AdminMember from './page/Admin/AdminMember';


function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/member" element={<Member/>}/>
        
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin/member" element={<AdminMember/>}/>

      </Routes>
     </Router>
    </>
  )
}

export default App
