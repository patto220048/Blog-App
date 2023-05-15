import { useState, useEffect } from 'react';

import axios from 'axios';
// instance axios gobal
const instance = axios.create({
    baseURL: import.meta.env.VITE_SOME_KEY,
    withCredentials: true, // add this when using cookies
    headers: {
        'Content-type': 'application/json',
    },
});

const useFetch = (url, type, { ...dataFromUser }) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (dataFromUser) {
                    const res = await instance({
                        url: url,
                        method: type,
                        data: { ...dataFromUser },
                    });
                    setData(res.data);
                } else {
                    const res = await instance({
                        url: url,
                        method: type,
                    });
                    setData(res.data);
                }
            } catch (error) {
                console.log('FetchDataErr: ' + error.message);
            }
        };
        fetchData();
    }, [url]);
    return data;
};
export default useFetch;
