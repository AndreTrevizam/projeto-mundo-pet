import {scheduleGetByDay} from "../services/schedule-get.js"
import {loadSchedules} from "../services/load-schedules.js"

// Seleciona o input de data
const selectedDate = document.getElementById("date")

export async function schedulesDay() {
  // Obtem a data do input
  const date = selectedDate.value

  // Busca na API os agendamentos
  const dailySchedules = await scheduleGetByDay({date})

  // Exibe os agendamentos
  loadSchedules({dailySchedules})
}