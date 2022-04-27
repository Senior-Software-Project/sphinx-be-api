import _ from 'lodash';
import Stat from './stat_model.js';

/**
 * Adds CRUD functionality to Express app.
 * @param {object} app instance of Express() to add functionality to.
 */
export default function(app) {
  /* Create */
  app.post('/userStat', (req, res) => {
    const newStat = new Stat(req.body);
    newStat.save((err) => {
      if (err) {
        res.json({info: 'error saving stat', error: err});
      } else {
        res.json({info: 'stat added successfully'});
      }
    });
  });

  /* Reads */
  /* gets all stat entries for all users */
  app.get('/userStats', (req, res) => {
    Stat.find({}, (err, stats) => {
      if (err) {
        res.json({info: 'error finding stats', error: err});
        return;
      } else {
        res.json({info: 'stats found successfully', data: stats});
        return;
      }
    });
  });

  /* gets a particular stat entry based on the entry's object id (Stat._id) */
  app.get('/userStat/:id', (req, res) => {
    Stat.findById(req.params.id, (err, stat) => {
      if (err) {
        res.json({info: 'error finding stat', error: err});
      } else if (stat) {
        res.json({info: 'stat found successfully', data: stat});
      } else {
        res.json({info: 'stat not found'});
      }
    });
  });

  /* gets all stat entries for a particular user, by their userId */
  app.get('/userStats/:userId', (req, res) => {
    Stat.find({
      userId: req.params.userId,
    }, (err, stats) => {
      if (err) {
        res.json({info: 'error finding user\'s stats', error: err});
      } else if (stats) {
        res.json({info: 'users\'s stats found successfully', data: stats});
      } else {
        res.json({info: 'user\'s stats not found'});
      }
    });
  });

  /* Update */
  app.put('/userStat/:id', (req, res) => {
    Stat.findById(req.params.id, (err, stat) => {
      if (err) {
        res.json({info: 'error finding stat', error: err});
      } else if (stat) {
        _.merge(stat, req.body);
        stat.save((err) => {
          if (err) {
            res.json({info: 'error updating stat', error: err});
          } else {
            res.json({info: 'stat updated successfully'});
          }
        });
      } else {
        res.json({info: 'stat not found'});
      }
    });
  });

  /* Delete */
  app.delete('/userStats/:id', (req, res) => {
    Stat.findByIdAndRemove(
        req.params.id,
        (err) => {
          if (err) {
            res.json({info: 'error removing stat', error: err});
          } else {
            res.json({info: 'stat removed successfully'});
          }
        });
  });
}
