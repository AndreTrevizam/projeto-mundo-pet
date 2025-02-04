import {scheduleGetByDay} from "../../services/schedule-get.js"

const datePicker = document.getElementById("date")

document.getElementById('date').addEventListener('change', async function() {

  const date = datePicker.value

  try {
    const dailySchedules = await scheduleGetByDay({date})
    console.log(dailySchedules)

  } catch (error) {
    console.log(error)
  }
});