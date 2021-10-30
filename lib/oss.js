import * as minio from './minio-browser'

const createClient = (readConfig) => {
    let identifier = null
    let cfg = null;
    let client = null

    const prepareClient = () => {
        const cfg0 = readConfig()
        const identifier0 = JSON.stringify(cfg0)
        if (!identifier || identifier !== identifier0) {
            identifier = identifier0
            cfg = cfg0
            client = new minio.Client({
                endPoint: cfg.endPoint,
                port: cfg.port,
                useSSL: cfg.useSSL,
                accessKey: cfg.accessKey,
                secretKey: cfg.secretKey,
            })
        }
    }

    return {
        listFiles: async (prefix) => {
            prepareClient()
            const stream = await client.listObjects(cfg.bucket, prefix || '')
            const data = await readObjectStream(stream)
            return data
        },
        getFileContents: async (name) => {
            prepareClient()
            const stream = await client.getObject(cfg.bucket, name)
            const data = await readContentStream(stream)
            return data
        },
        putFileContents: async (name, contents) => {
            prepareClient()
            await client.putObject(cfg.bucket, name, contents)
        }
    }
}

const readContentStream = (stream) => new Promise((resolve, reject) => {
    let data = ''
    stream.on('data', (chunk) => {
        data += chunk
    })
    stream.on('end', () => resolve(data))
    stream.on('error', reject)
})

const readObjectStream = (stream) => new Promise((resolve, reject) => {
    let data = []
    stream.on('data', (obj) => {
        data.push(obj)
    })
    stream.on('end', () => resolve(data))
    stream.on('error', reject)
})

export default createClient