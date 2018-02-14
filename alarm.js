const player = require('play-sound')(opts = {})
const fs = require('fs')

class Alarm {
  constructor () {
    this.schedule = null
    this.playing = false
    this.audio = null
    this.timer = null
    // this.victims = fs.readdirSync('sounds').map(v => v.slice(0, -4))
    this.victims = [
      'ออมสิน',
      'เต้น',
      'กาย',
      'ต้น',
      'จักร'
    ]
    this.playsound.bind(this)
  }

  playsound () {
    return new Promise((resolve, reject) => {
      const audio = player.play('sounds/aomsin.mp3', err => {
        if (err) reject(err)
        resolve()
      })
      this.audio = audio
    })
  }

  done () {
    if (this.schedule) {
      // reset
      this.audio.kill()
      this.audio = null
      this.playing = false
      // clear loop
      const date = this.schedule
      clearTimeout(this.timer)
      this.schedule = null
      return date
    }
    return 'No schedule set'
  }

  set (date) {
    try {
      console.log(date)
      const timer = setTimeout(async () => {
        console.log('alarrrrrm')
        this.playing = true
        while (this.playing) {
          try {
            await this.playsound()
          } catch (err) {
            this.playing = false
            throw err
          }
        }
        this.playing = false
      }, date - new Date())

      if (this.audio) this.audio.kill()
      this.timer = timer
      this.schedule = date
      return date
    } catch (err) {
      throw err
    }
  }
}

module.exports = new Alarm()
