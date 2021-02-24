import {Card, Form, Button, Alert} from "react-bootstrap";
import {useRef, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";

export default function Login(){
    const emailRef = useRef()
    const passwordRef = useRef()
    // const passwordConfirmRef =useRef()
    const {login,currentUser}  = useAuth()
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const history = useHistory()
    async function handleSubmit(e){
        e.preventDefault()
        // if(passwordRef.current.value!==passwordConfirmRef.current.value){
        //     return setError('Password Do Not Match')
        // }
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            history.push('/')
        }
        catch {
            setError("Failed to Sign In")
            console.log(e)
        }

        setLoading(false)


    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {/*{currentUser && currentUser.email}*/}
                    {/*after doing stuff in AuthContext i think context hook need to be learned*/}
                    {/*{currentUser.email}*/}
                    {error && <Alert variant={"danger"}>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button disabled={loading} type="submit" className='w-100'>Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                New Here? <Link to={'/signup'}>Sign Up</Link>
            </div>
        </>
    )
}