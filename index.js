/* Code is based on material presented in Pluralsight course, "Play by Play: Building a Node Web API with Sam Artioli and John Papa" at:
        https://app.pluralsight.com/library/courses/play-by-play-node-web-api-john-papa-sam-artioli/table-of-contents (subscription req'd)
*/

import express from 'express'
import bodyParser from 'body-parser'

import userStats from './user-stats.js'

const app = express()

const hostname = '127.0.0.1'
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const stats = userStats(app)

app.listen(port, hostname, () => {
/*   userStatsRoutesLoaded = false
  if (typeof stats != "undefined") {
    userStatsRoutesLoaded = true
  } */
  if (typeof stats === 'undefined') {
    console.log(`Server running at http://${hostname}:${port}/, userStats routes loaded`)
  } else {
    console.log(`Server running at http://${hostname}:${port}/`)
  }
})
