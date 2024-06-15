import React from 'react'
import { LoginType, ActionType } from './types';

import { Header, LogIn, Main, Navigation } from './component'
import { useActionData, useLoaderData } from 'react-router-dom'
import { useStore } from './store';
import { MessageBar } from './UI';
const App: React.FC = () => {

  const { isLogin } = useLoaderData() as LoginType;
  const actionData = useActionData() as ActionType;
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