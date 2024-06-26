import App from "./App";
import { TokenCustomer } from "./types"

import axios from "axios";
import {
    ErrorPage,
    Products, 
    Media, 
    AddMedia, 
    FormProduct, 
    ViewProduct, 
    Settings,
    Collections,
    FormCollection,
    ViewCollection
} from "./pages";
import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import { endPoints } from "./constant";
import { getCookie, setCookie } from "./utility";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage>Not found page</ErrorPage>,
        id: "root",
        loader: async () => {
            const response = await axios(`${endPoints.log}`);
            const isLogin = getCookie("isLogin") === "true"
            return { isLogin, log: response.data.logs }
        },

        action: async ({ request }) => {
            try {
                const formData = await request.formData();
                const updates = Object.fromEntries(formData);
                const response = await axios.post(`${endPoints.auth}/login`, updates);
                const { tokenCustomer } = response.data as TokenCustomer
                if (tokenCustomer.role != "user") {
                    setCookie("isLogin", "true");
                    setCookie("customer", JSON.stringify(tokenCustomer))
                }
            } catch (error) {
                return {
                    msg: "Please provide email or password",
                    typeMsg: "error"
                }
            }

            return {
                msg: "Success",
                typeMsg: "success"
            };
        },
        children: [
            {
                path: "products",
                element: <PageLayout />,
                children: [
                    {
                        index: true,
                        element: <Products />,
                    },
                    {
                        path: "create",
                        element: <FormProduct typeForm="create" />,
                        action: async ({ request }) => {
                            const id = await request.text();
                            return redirect(`/products/${id}`)
                        }
                    },
                    {
                        path: ":productId",
                        element: <ViewProduct />
                    },
                    {
                        path: ":productId/edit",
                        element: <FormProduct typeForm="change" />,
                        loader: async ({ params }) => {
                            try {
                                const response = await axios(`${endPoints.products}/${params.productId}`);
                                const data = await response.data;
                                const { product } = data;
                                return product
                            } catch (error) {
                                console.log(error);
                            }
                        },
                        action: async ({ request }) => {
                            const id = await request.text();
                            return redirect(`/products/${id}`)
                        }
                    }
                ]
            },
            {
                path: "collection",
                element: <PageLayout />,
                children: [
                    {
                        index: true,
                        element: <Collections/>,
                    },
                    {
                        path: "create",
                        element: <FormCollection typeForm="create" />
                    },
                    {
                        path: ":collectionId",
                        element: <ViewCollection/>,
                    },
                    {
                        path: ":collectionId/edit",
                        element: <FormCollection typeForm="change"/> ,
                        loader: async ({ params }) => {
                            try {
                                const response = await axios(`${endPoints.collection}/${params.collectionId}`);
                                const data = await response.data;
                                const { collection } = data;
                                return collection
                            } catch (error) {
                                console.log(error);
                            }
                        },
                    }
                ]
            },
            {
                path: "media",
                element: <PageLayout />,
                children: [
                    {
                        index: true,
                        element: <Media />,
                    },
                    {
                        path: "add",
                        element: <AddMedia />,
                        action: async () => {
                            return redirect("/media")
                        }
                    }
                ]
            },
            {
                path: "settings",
                element: <PageLayout />,
                children: [
                    {
                        index: true,
                        element: <Settings />,
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage>404 page</ErrorPage>
    }
]);

function PageLayout() {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default router;
