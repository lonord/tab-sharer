import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import Head from 'next/head'

export default function AppRoot({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Tab Sharer</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover" />
                <meta name="format-detection" content="telephone=no"/>
                <link rel="stylesheet" href="https://fonts.loli.net/css?family=Roboto:300,400,500,700&display=swap" />
                <script type="text/javascript" src="/minio-browser.js"/>
            </Head>
            <CssBaseline />
            <Component {...pageProps} />
            <GlobalStyles styles={{ body: { background: '#EAEEF3' } }}/>
        </>
    )
}