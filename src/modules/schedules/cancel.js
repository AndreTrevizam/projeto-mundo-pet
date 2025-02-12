import {scheduleCancel} from "../../services/schedule-cancel.js"
import { schedulesDay } from "../schedule-load.js"

const periods = document.querySelectorAll(".period")

periods.forEach((period) => {
  // Capturando evento de clique
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("link")) {
      // Obtem a li pai do elemento clicado
      const item = event.target.closest("li")

      // Pega o ID do agendamento para remover
      const {id} = item.dataset

      // Confirma que o ID foi selecionado
      if (id) {
        // Confirma se o usuario quer cancelar o agendamento
        const isConfirm = confirm("Deseja cancelar esse agendamento?")

        if (isConfirm) {
          // Faz a requisição na API para cancelar
          await scheduleCancel({id})

          // Recarrega os agendamentos
          schedulesDay()
        }
      }
    }
  })
})