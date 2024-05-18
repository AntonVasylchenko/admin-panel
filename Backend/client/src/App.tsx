import React from 'react'
import { Footer, Header, LogIn, Main, Navigation } from './component'
import { useLoaderData } from 'react-router-dom'


const App: React.FC = () => {
  const loaderData = useLoaderData() as boolean;

  if (!loaderData) {
    return <LogIn />
  }

  return (
    <div id="app">
      <Header />
      <Main />
      <Navigation />
      <Footer />
    </div>
  )
}

export default App