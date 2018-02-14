const player = require('play-sound')(opts = {})
const fs = require('fs')

class Alarm {
  constructor () {
    this.schedule = null
    this.playing = false
    this.audio = null
    this.victims = fs.readdirSync('sounds').map(v => v.slice(0, -4))
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
      const date = this.schedule.date
      clearTimeout(this.schedule.timer)
      this.schedule = null

      return date
    }
    return null
  }

  set (date) {
    try {
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

      this.schedule = {
        date: date,
        timer: timer
      }
      return { date }
    } catch (err) {
      throw err
    }
  }
}

module.exports = new Alarm()
