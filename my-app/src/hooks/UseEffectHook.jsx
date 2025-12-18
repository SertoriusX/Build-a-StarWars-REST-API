import axios from "axios"
import { useEffect, useState } from "react"


export const UseEffectHook = (url) => {
    const [data, setData] = useState()
    useEffect(() => {
        axios.get(url)
            .then((res) => { setData(res.data) })
            .catch((err) => {
                console.error(err);
            })
    }, [url])
    return { data }
}