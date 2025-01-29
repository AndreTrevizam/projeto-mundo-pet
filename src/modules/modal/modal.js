const modal = document.getElementById("modal")
const newScheduleBtn = document.getElementById("new-schedule-btn")
const closeModalBtn = document.querySelector(".close-button")
const overlay = document.getElementById("modal-overlay")

newScheduleBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden")
  modal.classList.remove("hidden")
  document.body.style.overflow = "hidden"
})

closeModalBtn.addEventListener("click", () => {
  overlay.classList.add("hidden")
  modal.classList.add("hidden")
  document.body.style.overflow = ""
})