import React, { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'

import OptionsPage from '../../components/OptionsPage'

document.title = chrome.i18n.getMessage('settingPage') + ' - ' + chrome.i18n.getMessage('appName')

const App = () => {
    const [defaultOpt, setDefaultOpt] = useState(null)

    useEffect(() => {
        chrome.storage.local.get('options', (data) => {
            setDefaultOpt(data.options)
        })
    }, [])

    const onChange = (opt) => {
        chrome.storage.local.set({ options: opt }, () => {
            // close page after options setted
            window.close()
        })
    }

    return (
        <>
            <CssBaseline/>
            <OptionsPage defaultOptions={defaultOpt} onChange={onChange}/>
        </>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('main')
)