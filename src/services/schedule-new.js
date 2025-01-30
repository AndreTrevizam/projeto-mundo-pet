import {apiConfig} from "./api-config.js"

export async function scheduleNew({id, clientName, petName, phoneNumber, service, when }) {
  try {
    await fetch(`${apiConfig.baseUrl}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id, clientName, petName, phoneNumber, service, when})
    })

    alert("Agendamento realizado com sucesso!")
  } catch (error) {
    console.log(error)
    alert("Não foi possível realizar o agendamento. Tente novamente.")
  }
}