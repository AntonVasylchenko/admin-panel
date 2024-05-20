import React from 'react'
import { Footer, Header, LogIn, Main, Navigation } from './component'
import { useActionData, useLoaderData } from 'react-router-dom'
import { useStore } from './store';
import { MessageBar } from './UI';

const App: React.FC = () => {
  const loaderData = useLoaderData() as boolean;
  const actionData = useActionData() as { msg: string, typeMsg: "success" | "error" | "" }
  const { changeMessage } = useStore();


  console.log(actionData);
  
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
      <Footer />
    </div>
  )
}

export default App