const path = require('path')
var morgan = require('morgan')
const express = require('express')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))

app.get('/', (req, res) => {
   return res.sendFile(path.join(__dirname, '/public/index.html'))
})
app.get('/api', (req, res) => {
    return res.json({
        unix:Date.now() ,
        utc:new Date().toUTCString()
    })
})
app.get('/api/:date', (req, res) => {
    const regex2 = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/
    const test2 = regex2.test(req.params.date)
    if (test2) {
        return res.json({
            unix: new Date( req.params.date).getTime() ,
            utc:new Date(req.params.date).toUTCString()
        })
    } 
    const regex = /^\d{1}/
    const test = regex.test( req.params.date)
    if(test) {
        return res.json({
            unix:new Date(Number(req.params.date)).getTime(),
            utc:new Date(Number(req.params.date)).toUTCString()
        })
    }
    return res.json({error: 'Invalid Date'})
})



app.listen(app.get('port'), console.log(`listening on port:${app.get('port')}`))