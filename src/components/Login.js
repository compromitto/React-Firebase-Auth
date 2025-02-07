import React, { useRef, useState} from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import firebase from "firebase"

import logo from '../image/logo.png'
import googleIconImg from '../image/google-icon.svg';

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
 
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Senhar ou e-mail incorreto")
    }
    

    setLoading(false)
  
  } 

//login google incio

  async function handLoginGoogle() {
  
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider).then((result) => {
   
    
  })
  try {
    setError("")
    setLoading(true)
    history.push("/")
  } catch{
    setError("Algo deu errado, tente novamente")
    
  }
  
}
// login google final 
  return (
    <>
      <Card className="shadow p-3 mb-5 bg-dark text-white rounded p-3 mb-2">
        <Card.Body>
        <img src={logo}alt="Gera pix" className="card-img-top mx-auto d-block mb-4" />
        <p className="text-center"> Faça seu login e cria sua conta PIX. 
        Simples rápido e fácil. Caso não tenha conta basta 
        <Link className="btn btn-link" to="/signup">clicar aqui</Link>e crirar uma.
        </p>
        
          <p className="text-center mb-4 mt-4">ENTRAR NA CONTA</p>
          {error && <Alert variant="danger">{error}</Alert>} 
          <button onClick={handLoginGoogle}  className="w-100 mt-4 mb-4 btn-lg btn btn-danger" >
            <img className="pr-4" src={googleIconImg} alt="Logo do Google" />
             Use o Google
          </button>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className="mt-1 mb-0">E-mail</Form.Label>
              <Form.Control type="email" ref={emailRef} required placeholder="Digite seu e-mail" />
            </Form.Group>
            <Form.Group  id="password">
              <Form.Label className="mb-0">Senha</Form.Label>
              <Form.Control className="form-control Default input" type="password" ref={passwordRef} required placeholder="Digite sua senha!" />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Entrar
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Esqueceu sua senha?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center ">
        Crie uma conta! <Link className="btn btn-link" to="/signup">Criar conta</Link>
      </div>
    </>
  )

  }