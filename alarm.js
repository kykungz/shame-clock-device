class Alarm {
  constructor () {
    this.schedule = []
  }

  add (date) {
    try {
      const timer = setTimeout(() => {
        console.log('alarrrrrm')
      }, date - new Date())
      this.schedule.push({ date, timer })
      return { date }
    } catch (err) {
      throw err
    }
  }
}

module.exports = new Alarm()
