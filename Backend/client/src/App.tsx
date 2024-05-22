import React from 'react'
import { Header, LogIn, Main, Navigation } from './component'
import { useActionData, useLoaderData } from 'react-router-dom'
import { useStore } from './store';
import { MessageBar } from './UI';

const App: React.FC = () => {
  console.count("render")
  const loaderData = useLoaderData() as boolean;
  const actionData = useActionData() as { msg: string, typeMsg: "success" | "error" | "" }
  const { changeMessage } = useStore();
  
  React.useEffect(() => {
    if (actionData) {
      changeMessage(actionData.msg, actionData.typeMsg)
    }
  }, [actionData])


  if (!loaderData) {
    return <LogIn />
  }

  return (
    <div id="app">
      <MessageBar/>
      <Header />
      <Main />
      <Navigation />
    </div>
  )
}

export default App