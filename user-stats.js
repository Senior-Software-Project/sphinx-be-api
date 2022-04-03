import _ from 'lodash'

export default function (app) {
  const _userStats = []

  /* Create */
  app.post('/userStats', (req, res) => {
    _userStats.push(req.body)
    res.json({ info: 'userStat added successfully' })
  })

  /* Read */
  app.get('/userStats', (req, res) => {
    res.json(_userStats.toString())
  })

  app.get('/userStats/:id', (req, res) => {
    const index = _.findIndex(
      _userStats,
      (o) => {
        // eslint-disable-next-line eqeqeq
        return o.userId == req.params.id
      }
    )

    res.json(`index ${index} found for param ${req.params.id}`)
    // res.json(`record found at index ${index}`);
    // res.json(_userStats[index])
  })

  /* Update */
  app.put('/userStats/:id', (req, res) => {
    const index = _.findIndex(
      _userStats,
      (o) => {
        return o.userId === req.params.id
      }
    )
    _.merge(_userStats[index], req.body)
  })

  /* Delete */
  app.delete('/userStats/:id', (req, res) => {
    _.remove(
      _userStats,
      (userStat) => {
        return userStat.Id === req.params.id
      })
    res.json({ info: 'userStat removed successfully' })
  })
}
