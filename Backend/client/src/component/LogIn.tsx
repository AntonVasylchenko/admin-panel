import React from 'react'
import { Form, useSubmit } from 'react-router-dom'
import { Button, InputField, MessageBar } from '../UI'

const LogIn: React.FC = () => {
    const submit = useSubmit();

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append("email", import.meta.env.VITE_DEMO_EMAIL);
        formData.append("password", import.meta.env.VITE_DEMO_PASSWORD);
        submit(formData, { method: "post" });
    }

    return (
        <div className='log-in'>
            <MessageBar/>
            <Form className='log-in__form' method='post'>
                <h1 className='log-in__form-title main-title'>Log in</h1>
                <InputField type='text' name="email" label='E-mail' />
                <InputField type='password' autoComplete="on" name="password" label='Password' />
                <Button onClick={handleSubmit} cssSelector='cancel-button log-in__form-button' typeButton='button'>Try Demo ver</Button>
                <Button cssSelector='primary-button log-in__form-button' typeButton='submit'>Log in</Button>
            </Form>
        </div>
    )
}

export default LogIn