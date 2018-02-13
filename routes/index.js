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

router.get('/testadd' , function(req, res, next) {
  try {
    const result = alarm.add(new Date((new Date().getTime()) + 10 * 1000))
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/add' , function(req, res, next) {
  try {
    const result = alarm.add(req.body.date)
    res.status(200).send({ result })
  } catch (err) {
    res.status(500).send({ err })
  }
})


module.exports = router;
