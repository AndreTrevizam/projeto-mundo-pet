import {apiConfig} from "../services/api-config.js"

export async function scheduleCancel({id}) {
  try {
    await fetch(`${apiConfig.baseUrl}/schedules/${id}`, {
      method: "DELETE"
    })
  } catch (error) {
    console.log(error)
    alert("Não foi possível realizar o cancelamento.")
  }
}