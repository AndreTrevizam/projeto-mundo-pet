import {scheduleGetByDay} from "../services/schedule-get.js"
import {loadSchedules} from "../services/load-schedules.js"

// Seleciona o input de data
const selectedDate = document.getElementById("date")

export async function schedulesDay() {
  const date = selectedDate.value

  const dailySchedules = await scheduleGetByDay({date})

  loadSchedules({dailySchedules})
}