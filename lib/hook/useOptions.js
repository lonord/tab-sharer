import { useState, useEffect } from 'react'

export default function useOptions() {
    const [options, setOptions] = useState({})

    useEffect(() => {
        const opt = window.localStorage.getItem('options')
        if (opt) {
            setOptions(JSON.parse(opt))
        }
    }, [])

    return { 
        options,
        setOptions: (opt) => {
            opt = opt || {}
            window.localStorage.setItem('options', JSON.stringify(opt))
            setOptions(opt)
        }
    }
}