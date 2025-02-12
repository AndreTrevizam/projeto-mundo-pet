const dayjs = require("dayjs")
import { scheduleNew } from "../../services/schedule-new"
import { schedulesDay } from "../../modules/schedule-load.js"
import { closeModal } from "../modal/modal.js"
import { loadHours } from "../form/hours-load.js"

const formNewSchedule = document.querySelector(".new-schedule-form")
const dateNewSchedule = document.getElementById("date-modal")
const nameClient = document.getElementById("client-name")
const namePet = document.getElementById("pet-name")
const numberPhone = document.getElementById("phone-number")
const hourSelect = document.getElementById("hours")
const services = document.getElementById("service-name")

// Carrega a data atual
export const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Define a data minima como sendo a data atual
dateNewSchedule.value = inputToday
dateNewSchedule.min = inputToday

// Regex para o telefone
numberPhone.oninput = () => {
  let phoneNumber = numberPhone.value.replace(/\D/g, "")
  numberPhone.value = phoneNumber
}

formNewSchedule.onsubmit = async (event) => {
  event.preventDefault()
  
  try {

    // Nome do cliente
    const clientName = nameClient.value.trim()
    if (!clientName) {
      return alert("Informe o nome do cliente!")
    }

    // Nome do pet
    const petName = namePet.value.trim()
    if (!petName) {
      return alert("Informe o nome do pet!")
    }

    // Numero de telefone
    const phoneValue = numberPhone.value.trim()
    if (!phoneValue) {
      return alert("Informe o número de telefone do cliente!")
    }

    const service = services.value.trim()
    if (!service) {
      return alert("Informe o serviço a ser realizado!")
    }

    // Recupera somente as horas
    const [hour] = hourSelect.value.split(":")

    // Insere a hora na data
    const when = dayjs.utc(dateNewSchedule.value).add(hour, "hour")

    // Gera ID
    const id = new Date().getTime().toString()

    // Faz o agendamento
    await scheduleNew({
      clientName,
      petName,
      phoneValue,
      service,
      when,
      id
    })

    // Limpa os inputs
    formNewSchedule.reset()

    // Atualiza a lista
    await schedulesDay()

    // Fechar o modal
    closeModal()

    loadHours(dateNewSchedule.value)

  } catch (error) {
    console.log(error)
  }
}