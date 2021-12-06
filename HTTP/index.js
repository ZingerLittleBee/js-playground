const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => {
    console.log('url', req.url)
    res.send('Hello World!')
})

app.get('/api', (req, res) => {
    console.log('url', req.url)
    res.send('/api')
})

app.get('/api/ali', (req, res) => {
    console.log('url', req.url)
    res.send('/api/ali')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
