import React from 'react'
import style from "./style.module.css"
import { CookieData, CustomerData, CustomerForm, ServerError, CustomerPassword,TokenCustomer } from "./type"

import { useFetch } from '../../hook'
import { endPoints } from '../../constant';
import { createClasses, getCookie, setCookie } from '../../utility';
import { Button, InputField, Loader } from '../../UI';
import axios, { AxiosError } from 'axios';
import { useStore } from '../../store';

const Settings: React.FC = () => {
  const { changeMessage } = useStore();
  const [customerForm, setCustomerForm] = React.useState<CustomerForm>({
    firstName: "",
    lastName: "",
    email: "",
    loaded: false
  })
  const [customerPassword, setCustomerPassword] = React.useState<CustomerPassword>({
    oldPassword: "",
    newPassword: "",
  })

  const cookieString = getCookie("customer")
  const customerObj: CookieData = typeof cookieString === "string" ? JSON.parse(cookieString) : "";
  const { status, data } = useFetch<CustomerData>(`${endPoints.customer}/${customerObj.customerId}`);

  const handleForm = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const updateState = <T extends CustomerForm | CustomerPassword>(setter: React.Dispatch<React.SetStateAction<T>>) => {
      setter((prev: T) => ({
        ...prev,
        [name]: value
      }));
    };

    if (name.includes("Password")) {
      updateState(setCustomerPassword);
    } else {
      updateState(setCustomerForm);
    }
  }, [setCustomerForm, setCustomerPassword]);

  const handleSubmitForm = React.useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    const { dataset: { type } } = event.target as HTMLButtonElement;
    try {
      const response = await axios.patch(`${endPoints.customer}/${type}`, type === "update" ? customerForm : customerPassword);
      const data = await response.data;
    
      if (type === "update" ) {
        const { tokenCustomer } = data as TokenCustomer
        if (tokenCustomer.role != "user") {
            setCookie("customer", JSON.stringify(tokenCustomer))
        }
      }
      changeMessage("Changed", "success");
    } catch (error) {
      let messageError = "Error";
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError.response?.data.msg) {
          const { msg } = serverError.response?.data;
          messageError = msg;
        }
      }
      changeMessage(messageError, "error");

    }
  }, [customerForm, customerPassword]);

  React.useEffect(() => {
    if (data !== null) {
      setCustomerForm(prev => ({
        ...prev,
        firstName: data.customer.firstName,
        lastName: data.customer.lastName,
        email: data.customer.email,
        loaded: true
      }))
    }
  }, [data, setCustomerForm])

  if (status == "loading" || data === null || customerForm.loaded === false) {
    return <Loader />
  }
  return (
    <div className={style.customer}>

      {data.customer.role == "demo" &&
        <div className={style.customerField}>
          <p className='body-text'>Attention: You are logged in with a demo account and cannot change your data.</p>
        </div>
      }
      <div className={style.customerField}>
        <InputField
          type='text'
          name="firstName"
          label='First name'
          disabled={data.customer.role == "demo"}
          value={customerForm.firstName}
          onChange={handleForm}
        />
        <InputField
          type='text'
          name="lastName"
          label='Last name'
          disabled={data.customer.role == "demo"}
          value={customerForm.lastName}
          onChange={handleForm}
        />
      </div>
      <div className={style.customerField}>
        <InputField
          type="email"
          name="email"
          label='Email'
          disabled={data.customer.role == "demo"}
          value={customerForm.email}
          onChange={handleForm}
        />
      </div>
      <div className={style.customerField}>
        <Button
          typeButton='button'
          disabled={data.customer.role == "demo"}
          data-type="update"
          onClick={handleSubmitForm}
          cssSelector={createClasses(style.customerButton, 'primary-button')}
        >Change information</Button>
      </div>
      <form className={style.customerField}>
        <InputField
          type='password'
          name="oldPassword"
          label='Old password'
          autoComplete='off'
          disabled={data.customer.role == "demo"}
          value={customerPassword.oldPassword}
          onChange={handleForm}
        />
        <InputField
          type="password"
          name="newPassword"
          label='New password'
          autoComplete='off'
          disabled={data.customer.role == "demo"}
          value={customerPassword.newPassword}
          onChange={handleForm}
        />
      </form>
      <div className={style.customerField}>
        <Button
          typeButton='button'
          data-type="update-password"
          onClick={handleSubmitForm}
          disabled={data.customer.role == "demo"}
          cssSelector={createClasses(style.customerButton, 'primary-button')}
        >Change password</Button>
      </div>

    </div>
  )
}

export default Settings