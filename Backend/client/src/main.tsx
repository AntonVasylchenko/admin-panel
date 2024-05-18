import ReactDOM from 'react-dom/client'
import "../src/style/app.css"
import "../src/style/reset.css"
import "../src/style/index.css"
import "../src/style/base.css"
import { RouterProvider } from "react-router-dom";
import router from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
