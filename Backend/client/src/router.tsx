import { Outlet, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ErrorPage, Products } from "./pages";
import axios from "axios";
import { endPoints } from "./constant";
import { getCookie, setCookie } from "./utility";


type TokenCustomer = {
    [key: string]: {
        firstName: string
        lastName: string
        customerId: string
        role: string
    }
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage>Not found page</ErrorPage>,
        loader: async () => {
            const isLogin = getCookie("isLogin") === "true"
            return isLogin
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
                console.log(error);
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
                        path: ":productId",
                        element: <div>TTT Product</div>,
                    }
                ]
            },
            {
                path: "collection",
                element: <PageLayout />,
                children: [
                    {
                        index: true,
                        element: <div>Collection Home</div>,
                    },
                    {
                        path: ":collectionId",
                        element: <div>TTT Collection</div>,
                    }
                ]
            },
            {
                path: "media",
                element: <PageLayout />,
                children: [
                    {
                        index: true,
                        element: <div>Media Home</div>,
                    }
                ]
            },
            {
                path: "user",
                element: <PageLayout />,
                children: [
                    {
                        index: true,
                        element: <div>user Home</div>,
                    },
                    {
                        path: ":userId",
                        element: <div>TTT user</div>,
                    }
                ]
            },
            {
                path: "settings",
                element: <PageLayout />,
                children: [
                    {
                        index: true,
                        element: <div>Settings Home</div>,
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
