import { openingHours } from "../../utils/opening-hours.js";
import { apiConfig } from "../../services/api-config.js";
import dayjs from "dayjs";

const selectElement = document.getElementById("hours");
const dateInput = document.getElementById("date-modal");

// Exporta a função loadHours para que possa ser usada em outros módulos
export const loadHours = async (date) => {
  try {
    // Limpa as opções existentes
    selectElement.innerHTML = "";

    // Formata a data para o formato esperado pela API (YYYY-MM-DD)
    const formattedDate = dayjs(date).utc().format("YYYY-MM-DD");
    console.log("Data formatada:", formattedDate);

    // Faz a requisição para obter os horários agendados para a data selecionada
    const response = await fetch(`${apiConfig.baseUrl}/schedules?date=${formattedDate}`);
    const existingSchedules = await response.json();

    console.log("Resposta da API:", existingSchedules);

    // Filtra os agendamentos para a data selecionada
    const filteredSchedules = existingSchedules.filter((schedule) => {
      const scheduleDate = dayjs(schedule.when).utc().format("YYYY-MM-DD");
      return scheduleDate === formattedDate;
    });

    console.log("Agendamentos filtrados:", filteredSchedules);

    // Mapeia os horários agendados para o formato HH:mm e ordena em ordem crescente
    const bookedHours = filteredSchedules
      .map((schedule) => dayjs(schedule.when).utc().format("HH:mm"))
      .sort((a, b) => a.localeCompare(b)); // Ordena os horários em ordem crescente

    console.log("Horários agendados (ordenados):", bookedHours);

    // Adiciona os horários disponíveis ao select
    openingHours.forEach((hour) => {
      const option = document.createElement("option");
      option.value = hour;
      option.textContent = hour;

      // Verifica se o horário já está agendado
      if (bookedHours.includes(hour)) {
        option.disabled = true;
        option.textContent += " (Indisponível)";
      }

      selectElement.append(option);
    });
  } catch (error) {
    console.error("Erro ao carregar horários:", error);
  }
};

// Carrega os horários para a data inicial
loadHours(dateInput.value);

// Atualiza os horários quando a data é alterada
dateInput.addEventListener("change", (e) => {
  loadHours(e.target.value);
});