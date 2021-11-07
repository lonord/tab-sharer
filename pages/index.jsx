import React from 'react'

import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ButtonBase from '@mui/material/ButtonBase'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Settings from '@mui/icons-material/Settings'

import useSharedData from '../lib/hook/useSharedData'

export default function Index() {
    const router = useRouter()
    const [data, loading, error] = useSharedData()
    return (
        <Container maxWidth="sm" sx={{ p: 2 }}>
            <Box display="flex" flexDirection="row" pl={2} pr={1} pt={1} pb={1}>
                <Typography sx={{ flexGrow: 1, flexShrink: 1 }}
                    variant="h4"
                >
                    Tab Sharer
                </Typography>
                <IconButton onClick={() => router.push('/options')}>
                    <Settings />
                </IconButton>
            </Box>
            {loading
                ? (
                    <Box mt={5} textAlign="center">
                        <CircularProgress/>
                    </Box>
                )
                : error
                    ? (
                        <Box mt={5} textAlign="center">
                            <Typography>Ops! Something goes wrong...</Typography>
                            <Typography variant="caption" color="red">{error.message}</Typography>
                        </Box>
                    )
                    : !data || data.length === 0
                        ? (
                            <Box mt={5} textAlign="center">
                                <Typography variant="caption">No Data</Typography>
                            </Box>
                        )
                        : (data || []).map((hostData, i) => (
                            <HostPanel key={i} hostData={hostData} first={i === 0} />
                        ))}
        </Container>
    )
}

const HostPanel = ({ hostData, first }) => {
    const data = convertTabData(hostData.data)

    const onItemClick = (url) => {
        window.open(url, '_blank')
    }

    return (
        <Accordion defaultExpanded={first}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography sx={{ padding: 1 }} variant="h6">{hostData.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {data.map((item, i) => (
                    <React.Fragment key={i}>
                        {item.groupTitle && (
                            <Box mt={1} borderLeft={`2px solid ${item.color}`}>
                                <Box pl={1} pr={1} sx={{ display: 'inline-block', background: item.color }}>
                                    <Typography variant="caption" component="span" color="white">{item.groupTitle}</Typography>
                                </Box>
                            </Box>
                        )}
                        <ButtonBase sx={{ padding: 1, display: 'block', borderLeft: item.color ? `2px solid ${item.color}` : undefined }}
                            component="div"
                            onClick={() => onItemClick(item.url)}
                        >
                            <Typography variant="subtitle2" component="div">{item.title}</Typography>
                            <Typography variant="caption" component="div" color="text.secondary" noWrap>{item.url}</Typography>
                        </ButtonBase>
                    </React.Fragment>
                ))}
            </AccordionDetails>
        </Accordion>
    )
}

const convertTabData = (data) => {
    const result = []
    if (!data) {
        return result
    }
    const { groups, tabs } = data

    let group = null
    for (const tab of tabs) {
        if (tab.groupId >= 0) {
            const extra = {}
            const g = groups.find(item => item.id === tab.groupId)
            if (g) {
                extra.color = g.color
                if (!group || group.id !== g.id) {
                    extra.groupTitle = g.title
                }
            }
            group = g
            result.push({ ...tab, ...extra })
            continue
        }
        result.push(tab)
    }

    return result
}