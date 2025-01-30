import { openingHours } from "../utils/opening-hours.js"

document.addEventListener("DOMContentLoaded", function() {
  const selectElement = document.getElementById("hours")

  openingHours.forEach((hour) => {
    const option = document.createElement("option")
    option.value = hour
    option.textContent = hour

    selectElement.appendChild(option)
  })
})