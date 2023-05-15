import { useState, useEffect } from 'react';

import axios from 'axios';

const useFetch = (url, type) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios({
                    url: url,
                    method: type,
                });
                setData(data);
            } catch (error) {
                console.log('FetchDataErr: ' + error.message);
            }
        };
        fetchData();
    }, [url]);
    return [data];
};
export default useFetch;
