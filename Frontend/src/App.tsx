import React from "react"
import { Footer, Header, Main } from "./component"


const App: React.FC = () => {
  const eventSource = new EventSource('http://localhost:3000');

  eventSource.onmessage = (event) => {
    console.log(event.data);
  };

  return <>
    <Header />
    <Main />
    <Footer />
  </>
}

export default App