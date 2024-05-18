import React from 'react'
import { Form } from 'react-router-dom'
import { Button, InputField } from '../UI'

const LogIn: React.FC = () => {
    return (
        <div className='log-in'>
            <Form className='log-in__form' method='post'>
                <h1 className='log-in__form-title main-title'>Log in</h1>
                <InputField type='text' name="email" label='E-mail' />
                <InputField type='password' autoComplete="on" name="password" label='Password' />
                <Button cssSelector='primary-button log-in__form-button' typeButton='submit'>Create</Button>
            </Form>
        </div>
    )
}

export default LogIn