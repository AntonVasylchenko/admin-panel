import React from 'react'
import { Header, LogIn, Main, Navigation } from './component'
import { useActionData, useLoaderData } from 'react-router-dom'
import { useStore } from './store';
import { MessageBar } from './UI';

export type Log = {
  _id: string,
  action: string,
  name: string,
  product: string,
  createdAt: string,
  updatedAt: string
}

const App: React.FC = () => {
  const { isLogin } = useLoaderData() as { isLogin: boolean, log: Log[] };

  const actionData = useActionData() as { msg: string, typeMsg: "success" | "error" | "" }
  const { changeMessage } = useStore();

  React.useEffect(() => {
    if (actionData) {
      changeMessage(actionData.msg, actionData.typeMsg)
    }
  }, [actionData])


  if (!isLogin) {
    return <LogIn />
  }

  return (
    <div id="app">
      <MessageBar />
      <Header />
      <Main />
      <Navigation />
    </div>
  )
}

export default App