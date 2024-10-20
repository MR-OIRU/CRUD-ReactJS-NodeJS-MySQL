import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar, Offcanvas} from 'react-bootstrap'
import '../../assets/css/Admin/NavigationBar.css'

const NavigationBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="customNavbarAdmin">
        <Navbar expand="xl">
          <Container>
          <Row>
            <Col xl={12}>
              <Navbar.Brand>
                <img src='/image/logo.jpg' alt='logo'/>
                <p>OiruDev</p>
              </Navbar.Brand>
            </Col>
            <Col xl={12}>
              <Navbar.Toggle onClick={handleShow}/>
              <Navbar.Collapse>
                <Nav className="flex-column">
                  <div className="customNavLink">
                    <div className="customManageAdmin">
                      <h5>Manage</h5>
                      <Nav.Link onClick={() => navigate('/admin')}>Data</Nav.Link>
                      <Nav.Link onClick={() => navigate('/admin/member')}>Member</Nav.Link>
                    </div>
                    <hr />
                    <div className="customLogout">
                      <Nav.Link>Logout</Nav.Link>
                    </div>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
          </Container>
        </Navbar>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton closeVariant='white'>
            <Offcanvas.Title>
              <img src='/image/logo.jpg' alt='logo'/>
              <p>OiruDev</p>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <div className="customNavLink">
                <div className="customManageAdmin">
                  <h5>Manage</h5>
                  <Nav.Link onClick={() => navigate('/admin')}>Data</Nav.Link>
                  <Nav.Link onClick={() => navigate('/admin/member')}>Member</Nav.Link>
                </div>
                <hr />
                <div className="customLogout">
                  <Nav.Link>Logout</Nav.Link>
                </div>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  )
}

export default NavigationBar