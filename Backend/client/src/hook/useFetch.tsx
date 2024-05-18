import React from "react";
import axios from 'axios';

type UseFetchType = {
    status: "loading" | "success" | "error",
    data: {} | []
}

const useFetch = (endpoint: string): UseFetchType => {
    const [status, setStatus] = React.useState<"loading" | "success" | "error">("loading");
    const [data, setData] = React.useState<{}>({});

    const fetchData = async () => {
        try {
            if (endpoint === "") return;
            const response = await axios.get(endpoint);
            
            setData(response.data);
            setStatus("success");
        } catch (error) {
            setData({});
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
