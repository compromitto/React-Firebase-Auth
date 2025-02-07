import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

import logo from '../image/logo.svg'

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(false)
      await resetPassword(emailRef.current.value)
      setMessage("Verifique sua caixa de e-mail")
    } catch {
      setError("Erro na recuperação de e-mail")
    }

    setLoading(false)
  }

  return (
    <>
      <Card className="shadow p-3 mb-5 bg-dark text-white rounded p-3 mb-2">
        <Card.Body>
        <img src={logo}alt="Gera pix" className="rounded mx-auto d-block mb-4" />
          <h2 className="text-center mt-4">RECUPERAR SENHA</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className="mt-4 mb-0">E-mail</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              RECUPERAR 
            </Button>
          </Form>
          <div className="w-100 text-center mt-4">
            <Link to="/login">ENTRAR</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Cricar conta? <Link to="/signup">Criar</Link>
      </div>
    </>
  )
}
