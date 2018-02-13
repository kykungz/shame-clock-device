const player = require('play-sound')(opts = {})

class Alarm {
  constructor () {
    this.schedule = []
  }

  add (date) {
    try {
      const timer = setTimeout(() => {
        console.log('alarrrrrm')
        player.play('sounds/aomsin.mp3', function(err){
          if (err) throw err
        })
      }, date - new Date())
      this.schedule.push({ date })
      return { date }
    } catch (err) {
      throw err
    }
  }
}

module.exports = new Alarm()
