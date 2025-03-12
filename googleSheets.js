const scriptURL = 'https://script.google.com/macros/s/AKfycbybw8ktjN9hE3X8RrPIf-q1gld9vvC4wzmoP5L66_R-4LGVt5zEdo15XshsvpLKnZc/exec'

const form = document.forms['native-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully."))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})