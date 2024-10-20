import React from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import ProductChart from './ProductChart'
import SalesChart from './SalesChart'
import ProfitChart from './ProfitChart'

import '../../../assets/css/Admin/Dashboard.css'

const Dashboard = () => {
  return (
    <>
        <div className="customDashboard">
            <Container>
                <div className="customDetail">
                    <Row>
                        <Col lg={6} xl={4} className='mb-3'>
                            <div className="HeadMember">
                                <h5> สมาชิกทั้งหมด </h5>
                            </div>
                            <div className="Member">
                                    <h1>50 คน</h1>
                            </div>
                        </Col>
                        <Col lg={6} xl={4} className='mb-3'>
                            <div className="HeadProduct">
                                <h5> สินค้าคงเหลือ </h5>
                            </div>
                            <div className="Product">
                                <ProductChart />
                            </div>
                            
                        </Col>
                        <Col lg={6} xl={4} className='mb-3'>
                            <div className="HeadSales">
                                <h5> ยอดขาย </h5>
                            </div>
                            <div className="Sales">
                                <SalesChart/>
                            </div>
                            <div className="HeadProfit mt-3">
                                <h5> กำไร </h5>
                            </div>
                            <div className="Profit">
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