import React from 'react'

import { useRouter } from 'next/router'
import OptionsPage from '../components/OptionsPage'
import useOptions from '../lib/hook/useOptions'

export default function Options() {
    const router = useRouter()
    const { options, setOptions } = useOptions()

    const onOptionsChange = (opt) => {
        setOptions(opt)
        router.push('/')
    }
    
    return (
        <OptionsPage defaultOptions={options} onChange={onOptionsChange} hideHostName/>
    )
}