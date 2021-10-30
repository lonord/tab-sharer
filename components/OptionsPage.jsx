import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import Button from '@mui/material/Button'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const OptionsPage = ({ defaultOptions, onChange }) => {
    const [options, setOptions] = useState({
        hostName: '',
        accessKey: '',
        secretKey: '',
        bucket: '',
        endPoint: '',
        useSSL: true
    })
    const theme = useTheme()
    const matchesSM = useMediaQuery(theme.breakpoints.up('sm'))
    const textFieldSize = matchesSM ? 'small' : undefined

    useEffect(() => {
        if (defaultOptions) {
            setOptions(defaultOptions)
        }
    }, [ defaultOptions ])

    const updateValue = (key, value) => {
        setOptions({ ...options, [key]: value })
    }

    const onSave = () => {
        if (onChange && options.bucket && options.hostName) {
            onChange(options)
        }
    }

    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 3, mt: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>Settings</Typography>
                    <TextField
                        label="Host Name"
                        variant="outlined"
                        margin="normal"
                        size={textFieldSize}
                        required
                        fullWidth
                        error={!options.hostName}
                        value={options.hostName}
                        onChange={e => updateValue('hostName', e.target.value)}
                    />
                    <TextField
                        label="Access Key"
                        variant="outlined"
                        margin="normal"
                        size={textFieldSize}
                        fullWidth
                        value={options.accessKey}
                        onChange={e => updateValue('accessKey', e.target.value)}
                    />
                    <TextField
                        label="Secret Key"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        size={textFieldSize}
                        fullWidth
                        value={options.secretKey}
                        onChange={e => updateValue('secretKey', e.target.value)}
                    />
                    <TextField
                        label="Bucket"
                        variant="outlined"
                        margin="normal"
                        size={textFieldSize}
                        required
                        fullWidth
                        error={!options.bucket}
                        value={options.bucket}
                        onChange={e => updateValue('bucket', e.target.value)}
                    />
                    <TextField
                        label="End Point"
                        variant="outlined"
                        margin="normal"
                        size={textFieldSize}
                        placeholder="Leave empty for Amazon S3"
                        fullWidth
                        value={options.endPoint}
                        onChange={e => updateValue('endPoint', e.target.value)}
                    />
                    <TextField
                        label="Port"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        size={textFieldSize}
                        placeholder="Default to 80 for http or 443 for https"
                        fullWidth
                        value={options.port || ''}
                        onChange={e => updateValue('port', e.target.value)}
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox/>}
                            label="Use SSL"
                            checked={options.useSSL}
                            onChange={e => updateValue('useSSL', e.target.checked)}
                        />
                    </FormGroup>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={() => onSave()}>Save</Button>
                </CardActions>
            </Card>
        </Container>
    )
}

export default OptionsPage