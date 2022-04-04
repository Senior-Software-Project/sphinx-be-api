import _ from 'lodash'
import Stat from './stat_model.js'

export default function (app) {
  const _userStats = []

  /* Create */
  app.post('/userStat', (req, res) => {
    var newStat = new Stat(req.body)
    newStat.save((err) => {
      if(err) {
        res.json({ info: 'error saving stat', error: err })
      }
      else {
        res.json({ info: 'stat added successfully' })
      }
    })
  })

  /* Read */
  app.get('/userStats', (req, res) => {
    Stat.find((err, stats) => {
      if(err) {
        res.json({ info: 'error finding stats', error: err })
      }
      else {
        res.json({ info: 'stats found successfully', data, stats })
      }

    })
    res.json(_userStats.toString())
  })

  app.get('/userStat/:id', (req, res) => {
    Stat.findById(req.params.id, (err, stat) => {
      if(err) {
        res.json({ info: 'error finding stat', error: err })
      }
      else if (stat) {
        res.json({ info: 'stat found successfully', data, stat })
      } 
      else {
        res.json({ info: 'stat not found' })
      }
    })
  })

  /* Update */
  app.put('/userStat/:id', (req, res) => {
    Stat.findById(req.params.id, (err, stat) => {
      if(err) {
        res.json({ info: 'error finding stat', error: err })
      }
      else if (stat) {
        _.merge(stat, req.body)
        stat.save((err) => {
          if(err) {
            res.json({ info: 'error updating stat', error: err })
          }
          else {
            res.json({ info: 'stat updated successfully' })
          }
        })
      } 
      else {
        res.json({ info: 'stat not found' })
      }
    })
  })

  /* Delete */
  app.delete('/userStats/:id', (req, res) => {
    Stat.findByIdAndRemove(
      req.params.id,
      (err) => {
        if(err) {
          res.json({ info: 'error removing stat', error: err })
        }
        else {
          res.json({ info: 'stat removed successfully' })
        }
      })
  })
}
