import debounce from 'lodash.debounce'
import createClient from '../../lib/oss'

const log = (args) => console.log('[TabSharer]', args)

const options = {}

const client = createClient(() => options)

const sync = debounce(async () => {
    log('start sync')
    try {
        // get all tab groups
        const tabGroups = await chrome.tabGroups.query({})
        const groupsData = (tabGroups || []).map(item => ({
            title: item.title,
            color: item.color,
            id: item.id
        }))

        // get all tabs
        const tabs = await chrome.tabs.query({ status: 'complete', url: ['http://*/*', 'https://*/*'] })
        const tabsData = (tabs || []).map(item => ({
            title: item.title,
            url: item.url,
            groupId: item.groupId
        }))

        const result = {
            groups: groupsData,
            tabs: tabsData
        }

        // send to server
        try {
            await client.putFileContents(options.hostName + '.json', JSON.stringify(result))
            log('sync succeed')
            chrome.action.enable()
        } catch (e) {
            log(e)
            chrome.action.disable()
        }
    } catch (e) {
        log('sync error:', e.message || e)
    }
}, 5000)

chrome.runtime.onInstalled.addListener(() => {
    sync()

    chrome.tabs.onUpdated.addListener((id, info, tab) => {
        if (info.status === 'complete') {
            sync()
        }
    })
    chrome.tabs.onAttached.addListener(() => sync())
    chrome.tabs.onDetached.addListener(() => sync())
    chrome.tabs.onRemoved.addListener(() => sync())
    chrome.tabGroups.onCreated.addListener(() => sync())
    chrome.tabGroups.onMoved.addListener(() => sync())
    chrome.tabGroups.onRemoved.addListener(() => sync())
    chrome.tabGroups.onUpdated.addListener(() => sync())
})

// Initialize the form with the user's option settings
chrome.storage.local.get('options', (data) => {
    Object.assign(options, data.options)
})

// Watch for changes to the user's options & apply them
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.options?.newValue) {
        Object.assign(options, changes.options.newValue)
        sync()
    }
})