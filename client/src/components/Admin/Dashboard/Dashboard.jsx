import React, { useEffect, useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import ProductChart from './ProductChart'
import SalesChart from './SalesChart'
import ProfitChart from './ProfitChart'
import axios from 'axios'
import '../../../assets/css/Admin/Dashboard.css'

const Dashboard = () => {
    const url = import.meta.env.VITE_API_URL
    const [countMember, setCountMember] = useState("")
    useEffect(()=>{
        axios.get(`${url}admin`).then((res)=>{
            setCountMember(res.data.total_members)
        }).catch((err)=> console.log(err))
    },[])
  return (
    <>
        <div className="customDashboard">
            <Container>
                <div className="customDetail">
                    <Row>
                        <Col md={6} lg={6} xl={6} xxl={6} className='customCol mb-3'>
                            <div className="HeadMember">
                                <h5> สมาชิกทั้งหมด </h5>
                            </div>
                            <div className="Member mt-3">
                                    <h1>{countMember} คน</h1>
                            </div>
                        </Col>
                        <Col md={6} lg={6} xl={6} xxl={6} className='customCol mb-3'>
                            <div className="HeadProduct">
                                <h5> สินค้าคงเหลือ </h5>
                            </div>
                            <div className="Product mt-3">
                                <ProductChart />
                            </div>
                        </Col>
                        <Col md={6} lg={6} xl={6} xxl={6} className='customCol mb-3'>
                            <div className="HeadSales">
                                <h5> ยอดขาย </h5>
                            </div>
                            <div className="Sales mt-3">
                                <SalesChart/>
                            </div>
                        </Col>
                        <Col md={6} lg={6} xl={6} xxl={6} className='customCol mb-3'>
                            <div className="HeadProfit">
                                <h5> กำไร </h5>
                            </div>
                            <div className="Profit mt-3">
                                <ProfitChart/>
                            </div>
                        </Col>
                    </Row>  
                </div>
            </Container>
        </div>
    </>
  )
}

export default Dashboard