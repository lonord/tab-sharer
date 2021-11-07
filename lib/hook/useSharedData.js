import { useEffect, useState } from 'react'

import useOptions from './useOptions'
import createClient from '../oss'

export default function useSharedData() {
    const { options } = useOptions()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!options.bucket) {
            return
        }
        const client = createClient(() => options)
        setError(null)
        setLoading(true)
        client.listFiles('').then(files => {
            return Promise.all(files.map(f => client.getFileContents((f.prefix || '') + f.name)))
                .then(contents => contents.map((c, i) => ({
                    name: trimExt(files[i].name),
                    data: JSON.parse(c)
                })))
        }).then(setData).catch(setError).then(() => setLoading(false))
    }, [JSON.stringify(options)])

    return [data, loading, error]
}

const trimExt = (name) => {
    name = name || ''
    return name.substr(0, name.lastIndexOf('.'))
}