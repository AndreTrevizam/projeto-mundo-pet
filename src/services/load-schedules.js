import dayjs from "dayjs"

// Seleciono as seções
const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

export function loadSchedules({ dailySchedules }) {
  try {
    // Limpo as listas
    periodMorning.innerHTML = ""
    periodAfternoon.innerHTML = ""
    periodNight.innerHTML = ""

    // Ordena os agendamentos por horário (crescente)
    const sortedSchedules = dailySchedules.sort((a, b) => {
      const hourA = dayjs.utc(a.when).hour();
      const hourB = dayjs.utc(b.when).hour();
      return hourA - hourB; // Ordena em ordem crescente
    });


    sortedSchedules.forEach((schedule => {
      // Cria os elementos dinamicamente
      const li = document.createElement("li")
      const div = document.createElement("div")
      const hour = document.createElement("strong")
      const petName = document.createElement("span")
      const clientName = document.createElement("span")
      const service = document.createElement("p")
      const remove = document.createElement("span")

      // Adiciona as classes aos elementos
      hour.classList.add("label-medium")
      hour.style.paddingRight = "1rem"
      petName.classList.add("label-small")
      clientName.classList.add("paragraph-small")
      service.classList.add("paragraph-small")
      remove.classList.add("link")

      // Configura o que cada elemento vai exibir
      li.setAttribute("data-id", schedule.id)
      hour.textContent = dayjs.utc(schedule.when).format("HH:mm")
      petName.textContent = schedule.petName
      clientName.textContent = ` / ${schedule.clientName}`
      service.textContent = schedule.service
      remove.textContent = "Remover agendamento"

      // Nova hora para comparar e alocar na seção correta
      const hourUl = dayjs.utc(schedule.when).hour()

      // Adiciona os elementos dentro da div e a div dentro da li
      div.append(hour, petName, clientName)
      li.append(div, service, remove)

      // Verificação para alocar os itens nas seções corretas
      if (hourUl >= 9 && hourUl <= 12) {
        periodMorning.append(li)
      } else if (hourUl >= 13 && hourUl <= 18) {
        periodAfternoon.append(li)
      } else if (hourUl >= 19 && hourUl <= 21) {
        periodNight.append(li)
      }
    }))

    // Adiciona a classe "empty-list" se a lista estiver vazia
    if (periodMorning.children.length === 0) {
      periodMorning.classList.add("empty-list");
    } else {
      periodMorning.classList.remove("empty-list");
    }

    if (periodAfternoon.children.length === 0) {
      periodAfternoon.classList.add("empty-list");
    } else {
      periodAfternoon.classList.remove("empty-list");
    }

    if (periodNight.children.length === 0) {
      periodNight.classList.add("empty-list");
    } else {
      periodNight.classList.remove("empty-list");
    }

  } catch (error) {
    console.log(error)
  }
}