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
                element: <ProductLayout />,
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
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage>404 page</ErrorPage>
    }
]);

function ProductLayout() {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default router;
