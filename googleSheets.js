const scriptURL = 'https://script.google.com/macros/s/AKfycbybw8ktjN9hE3X8RrPIf-q1gld9vvC4wzmoP5L66_R-4LGVt5zEdo15XshsvpLKnZc/exec'

const form = document.forms['slider-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully."))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})

document.getElementById("open-form-btn").addEventListener("click", function () {
    document.getElementById("slider-form").classList.add("active");
});

document.getElementById("close-form-btn").addEventListener("click", function () {
    document.getElementById("slider-form").classList.remove("active");
});

// Close the form if the user clicks outside it
window.addEventListener("click", function (event) {
    const sliderForm = document.getElementById("slider-form");
    if (!sliderForm.contains(event.target) && !event.target.matches("#open-form-btn")) {
        sliderForm.classList.remove("active");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const yearPicker = document.getElementById("yearOfPassing");
    const currentYear = new Date().getFullYear()+3;

    for (let year = currentYear; year >= (currentYear-60); year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearPicker.appendChild(option);
    }
});
