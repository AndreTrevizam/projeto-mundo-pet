import {apiConfig} from "../services/api-config.js"
import dayjs from "dayjs"

export async function scheduleGetByDay({date}) {
  try {
    // Faz a requisição
    const response = await fetch(`${apiConfig.baseUrl}/schedules`)
    if (!response.ok) {
      throw new Error("Erro ao buscar agendamentos")
    }
  
    const data = await response.json()

    // Filtra os agendamentos pelo dia selecionado
    const dailySchedules = data.filter((schedule) => dayjs(date).isSame(schedule.when, "day"))

    return dailySchedules
    
  // Exibe os agendamentos filtrados ?

  } catch (error) {
    console.log(error)
  }
}