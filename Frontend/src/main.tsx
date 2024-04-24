import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import Router from './router';
import "./assets/reset.css"
import "./assets/base.css"



ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={Router} />
)