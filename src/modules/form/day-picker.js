import {scheduleGetByDay} from "../../services/schedule-get.js"
import {loadSchedules} from "../../services/load-schedules.js"

const datePicker = document.getElementById("date")

document.getElementById('date').addEventListener('change', async function() {

  const date = datePicker.value

  try {
    const dailySchedules = await scheduleGetByDay({date})
    console.log(dailySchedules)

    loadSchedules({dailySchedules})

  } catch (error) {
    console.log(error)
  }
});