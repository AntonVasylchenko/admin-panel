import React from 'react'
import style from "./style.module.css"
import { Form, useSubmit } from 'react-router-dom'
import { Button, InputField, MessageBar } from '../../UI'
import { createClasses } from '../../utility'

const LogIn: React.FC = () => {
    const submit = useSubmit();

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append("email", import.meta.env.VITE_DEMO_EMAIL);
        formData.append("password", import.meta.env.VITE_DEMO_PASSWORD);
        submit(formData, { method: "post" });
    }

    return (
        <div className={style.login}>
            <MessageBar />
            <Form className={style.login__form} method='post'>
                <h1 className={createClasses(style.login__title, "main-title")}>Log in</h1>
                <InputField type='text' name="email" label='E-mail' />
                <InputField type='password' autoComplete="on" name="password" label='Password' />
                <Button onClick={handleSubmit} cssSelector={createClasses("cancel-button", style.login__button)} typeButton='button'>Try Demo ver</Button>
                <Button cssSelector={createClasses("primary-button", style.login__button)} typeButton='submit'>Log in</Button>
            </Form>
        </div>
    )
}

export default LogIn