const alarm = require('../alarm');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Device is running.')
});

router.get('/schedule', function(req, res, next) {
  res.send(alarm.schedule)
})

router.get('/testset' , function(req, res, next) {
  try {
    const result = alarm.set(new Date((new Date().getTime()) + 3 * 1000))
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send({ error: err })
  }
})

router.get('/testdone' , function(req, res, next) {
  try {
    const result = alarm.done()
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/set' , function(req, res, next) {
  try {
    const result = alarm.set(req.body.date)
    res.status(200).send({ result })
  } catch (err) {
    res.status(500).send({ err })
  }
})


module.exports = router;
