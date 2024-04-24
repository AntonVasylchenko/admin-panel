import { createBrowserRouter, redirect } from "react-router-dom"
import App from './App.tsx'
import { Products, CreateProduct, Media } from "./pages/index.ts";


async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/create-product",
        element: <CreateProduct />,
        action: async ({ request, params }) => {
          const formData = await request.formData();
          const updates = Object.fromEntries(formData);
          const response = await postData("http://localhost:3000/api/v1/products", updates);
          const { product } = await response;


          return (
            redirect(`/products/${product._id}`)
          )
        }
      },
      {
        path: "/products",
        element: <Products />,
        loader: async ({ params }) => {
          const response = await fetch("http://localhost:3000/api/v1/products");
          const products = await response.json();
          return products
        },
      },
      {
        path: "/products/:productId",
        element: <div>Sinle product</div>,
        loader: async ({ params: { productId } }) => {
          const response = await fetch(`http://localhost:3000/api/v1/products/${productId}`);
          const product = await response.json();
          return product
        },
      },
      {
        path: "/add-media",
        element: <div>Add Media</div>,
      },
      {
        path: "/media",
        element: <Media />,
        loader: async ({ params }) => {
          const response = await fetch("http://localhost:3000/api/v1/media");
          const media = await response.json();
          return media
        }
      },
    ]
  },
]);

export default Router