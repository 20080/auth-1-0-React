import {Card, Form, Button, Alert} from "react-bootstrap";
import {useRef, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";
import Promise from "q";

export default function UpdateProfile(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef =useRef()
    const {currentUser,updateEmail,updatePassword}  = useAuth()
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const history = useHistory()
    function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value!==passwordConfirmRef.current.value){
            return setError('Password Do Not Match')
        }
        const promises = []
        setLoading(true)
        setError('')
        if (emailRef.current.value!==currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(()=>{
            history.push('/')
        }).catch(()=> {
                setError('Failed to update account')
            }
        ).finally(()=>{
            setLoading(false)
        })
        // try {
        //     // setError('')
        //     // setLoading(true)
        //     await signup(emailRef.current.value,passwordRef.current.value)
        //     history.push('/')
        // }
        // catch {
        //     setError("Failed to create an account")
        //     console.log(e)
        // }
        //
        // setLoading(false)


    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update profile</h2>
                    {/*{currentUser && currentUser.email}*/}
                    {/*after doing stuff in AuthContext i think context hook need to be learned*/}
                    {/*{currentUser.email}*/}
                    {error && <Alert variant={"danger"}>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}  placeholder='Leave
                            blank to keep the same'/>
                        </Form.Group>
                        <Form.Group id="PasswordConfirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder='Leave
                            blank to keep the same'/>
                        </Form.Group>
                        <Button disabled={loading}  type="submit" className='w-100'>Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to={'/'}>Cancel</Link>
            </div>
        </>
    )
}