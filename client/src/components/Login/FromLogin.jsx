import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

import axios from 'axios'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const FormLogin = () => {
    const navigate = useNavigate();
    const [values, setValue] = useState({
        Username:"",
        Password:""
    })
    const url = import.meta.env.VITE_API_URL


    const handleInput = (e) =>{
        const { name, value} = e.target;
        setValue(prev => ({
            ...prev,[name]: value === "" ? "" : value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(`${url}login`,values).then((res)=>{
            if(res.data.message === 'Login Successfully!!'){
                withReactContent(Swal).fire({
                    icon: "success",
                    title: "Successfully!!",
                    text: "Login success",
                    confirmButtonColor: "#04AA6D",
                  }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/member')
                    }
                  });
            }
        }).catch((err) => {
            if(err.response){
                if(err.response.data.message === 'Username is required!!'){
                    withReactContent(Swal).fire({
                        icon: "error",
                        title: "Username is required!!",
                        text: "Please enter your username or email.",
                        showConfirmButton: false,
                        timer: 2000
                      })
                }else if(err.response.data.message === 'Password is required!!'){
                    withReactContent(Swal).fire({
                        icon: "error",
                        title: "Password is required!!",
                        text: "Please enter your password.",
                        showConfirmButton: false,
                        timer: 2000
                      })
                }else{
                    withReactContent(Swal).fire({
                        icon: "error",
                        title: "Error!!",
                        html: `Please check that your <br/>Username or Password is correct.`,
                        showConfirmButton: false,
                        timer: 2000
                      })
                }
            }else{
                console.log('Error:', err.message);
            }
        })
    }
  return (
    <>
        <div className="customFormLogin">
            <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="Username">
                                    <Form.Label>Username or Email address</Form.Label>
                                    <Form.Control type="text" name="Username" placeholder="Username or Email address" 
                                    onChange={handleInput}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="Password" placeholder="Password" autoComplete="password" 
                                    onChange={handleInput}/>
                                </Form.Group>
                                <Form.Group className="link mb-3">
                                    <Form.Text>
                                    <a href="/register">Don't have an Account ? login</a>
                                    </Form.Text>
                                </Form.Group>
                                <Button variant='success' type='submit'>Login</Button>
                            </Form>
                        </Col>
                    </Row>
            </Container>
        </div>
    </>
  )
}

export default FormLogin