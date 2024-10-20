import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Button, Row, Col, Container } from 'react-bootstrap'
import DataTable from 'react-data-table-component';

import axios from 'axios'

import '../../assets/css/Admin/Member.css'

const Member = () => {
    const url = import.meta.env.VITE_API_URL
    const navigate = useNavigate();
    axios.defaults.withCredentials = true

    const [member, setMember] = useState([])

    useEffect(()=>{
        axios.get(`${url}admin/member`).then((res)=>{
            if(res.data.message === 'Role : None'){
                navigate('/')
              }else if(res.data.message === 'Role : User'){
                navigate('/member')
              }else{
                setMember(res.data)
                setRecords(res.data)
              }
        }).catch((err) => console.log(err))
    },[])

    const createColumn = (name, selector = null, sortable = true, cell = null) => ({
        name,
        selector,
        sortable,
        cell,
    });


    const handleEditClick = (row) => {
        alert(`Editing ${row.Username}`); 
    };

    const handleDeleteClick = (row) => {
        alert(`Deleting ${row.Username}`); 
    };

    const columns = [
        createColumn('No.', (row, index) => index + 1),
        createColumn('Role', row => row.Role),
        createColumn('Username', row => row.Username),
        createColumn('Email', row => row.Email),
        createColumn('First Name', row => row.FirstName),
        createColumn('Last Name', row => row.LastName),
        createColumn('Sex', row => row.Sex),
        createColumn('Phone', row => row.Phone),
        createColumn('Date', row => new Date(row.Date).toLocaleDateString('th-TH')),
        createColumn('Action', null, true, row => (
            <div className="action-buttons">
                <Button variant="warning" onClick={() => handleEditClick(row)}><BsPencilSquare /></Button>
                <Button variant="danger" onClick={() => handleDeleteClick(row)}><BsTrash /></Button>
            </div>
        )),
    ];
    
    const [records, setRecords] = useState(member)
    const handleFilter = (e) =>{
        const value = e.target.value.toLowerCase();
        const newData = member.filter(row => {
            return (
                row.Role.toLowerCase().includes(value) ||
                row.Username.toLowerCase().includes(value) ||
                row.Email.toLowerCase().includes(value) ||
                row.FirstName.toLowerCase().includes(value) ||
                row.LastName.toLowerCase().includes(value) ||
                row.Sex.toLowerCase().includes(value) ||
                row.Phone.toLowerCase().includes(value) ||
                new Date(row.Date).toLocaleDateString('th-TH').toLowerCase().includes(value)
            )
        })
        setRecords(newData)
      }
  return (
    <>
        <div className="customMember">
            <Container>
                <Row>
                    <Col>
                    <h1>Member List</h1>
                        <div className="customTable">
                            <div className="text-end mb-2">
                                <input type='text' className="form" placeholder="Search..." onChange={handleFilter}/>
                            </div>
                            <DataTable
                                columns={columns}
                                data={records}
                                pagination
                                paginationPerPage={15}
                                paginationRowsPerPageOptions={[15, 25, 50, 100 , 150, 200]}
                                noDataComponent={
                                    <div className="no-data-message">
                                        There are no records to display
                                    </div>
                                }
                                className="customData"
                                responsive
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
  )
}

export default Member