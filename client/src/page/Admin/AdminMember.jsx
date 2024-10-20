import React from 'react'
import NavigationBar from '../../components/Admin/NavigationBar';
import Member from '../../components/Admin/Member';

const AdminMember = () => {
    
  return (
    <>
        <div className="LayoutAdmin">
            <NavigationBar/>
            <Member/>
       </div>
    </>
  )
}

export default AdminMember