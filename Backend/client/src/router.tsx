import { Outlet, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ErrorPage } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage>Not found page</ErrorPage>,
        children: [
            {
                path: "products",
                element: <PageLayout />,
                children: [
                    {
                        index: true,
                        element: <div>Product Home</div>,
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
