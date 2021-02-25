import {Card, Form, Button, Alert} from "react-bootstrap";
import {useRef, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {Link} from "react-router-dom";

export default function ForgetPassword(){
    const emailRef = useRef()

    const {resetPassword}  = useAuth()
    const [error,setError] = useState('')
    const [message,setMessage]= useState('')
    const [loading,setLoading] = useState(false)
    async function handleSubmit(e){
        e.preventDefault()
        // if(passwordRef.current.value!==passwordConfirmRef.current.value){
        //     return setError('Password Do Not Match')
        // }
        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for instructions')
        }
        catch {
            setError("Failed to reset password")
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
                    {message && <Alert variant={"success"}>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Button disabled={loading} type="submit" className='w-100'>Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to={'/login'}>Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                New Here? <Link to={'/signup'}>Sign Up</Link>
            </div>
        </>
    )
}