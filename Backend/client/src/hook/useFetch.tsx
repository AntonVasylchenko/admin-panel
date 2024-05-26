import React from "react";
import axios from 'axios';

type UseFetchType<ApiResponse> = {
    status: "loading" | "success" | "error",
    data: ApiResponse | null
}

const useFetch = <ApiResponse,>(endpoint: string): UseFetchType<ApiResponse> => {
    const [status, setStatus] = React.useState<"loading" | "success" | "error">("loading");
    const [data, setData] = React.useState<ApiResponse | null>(null);

    const fetchData = async () => {
        try {
            if (endpoint === "") return;
            const response = await axios.get(endpoint);

            setData(response.data);
            setStatus("success");
        } catch (error) {
            setData(null);
            setStatus("error");
        }
    }

    React.useEffect(() => {
        if (status !== "loading") {
            setStatus("loading");
        }
        fetchData();
    }, [endpoint]);

    return { status, data };
}

export default useFetch;
