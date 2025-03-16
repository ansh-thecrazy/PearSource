const scriptURL = 'https://script.google.com/macros/s/AKfycbybw8ktjN9hE3X8RrPIf-q1gld9vvC4wzmoP5L66_R-4LGVt5zEdo15XshsvpLKnZc/exec'

const form = document.forms['slider-form']
const termsCheckbox = document.getElementById('termsCheckbox');


form.addEventListener('submit', e => {
	if (!termsCheckbox.checked) {
		e.preventDefault()
        return;
    }
	e.preventDefault()
	
	fetch(scriptURL, { method: 'POST', body: new FormData(form)})
	.then(response => Swal.fire({
		title: 'Success!',
		text: 'Your form has been submitted successfully.',
		icon: 'success',
		confirmButtonText: 'OK',
		timer: 3000,
		timerProgressBar: true
}))
  .then(() => { window.location.reload(); })
  .catch(error => Swal.fire({
  title: 'Error!',
  text: 'Unable to submit, please try again after sometime.',
  icon: 'error',
  confirmButtonText: 'Ok'
}))
})

// Open Slider Form
document.getElementById("open-form-btn").addEventListener("click", function () {
    document.getElementById("slider-form").classList.add("active");
	document.getElementById('close-modal-btn').addEventListener('click', (event) => {
    event.stopPropagation(); // Prevents event from bubbling up
    document.getElementById('policy-modal').style.display = 'none';
});
});

// Close Slider Form
document.getElementById("close-form-btn").addEventListener("click", function () {
    document.getElementById("slider-form").classList.remove("active");
});



// Close Policy Modal when clicking outside content box
window.addEventListener('click', (event) => {
    const modal = document.getElementById('policy-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Close Slider Form when clicking outside the form (Excluding Modal Buttons)
window.addEventListener("click", function (event) {
    const sliderForm = document.getElementById("slider-form");
    const modal = document.getElementById("policy-modal");
    if (
        !sliderForm.contains(event.target) && 
        !event.target.matches("#open-form-btn") && 
        !modal.contains(event.target)
    ) {
        sliderForm.classList.remove("active");
    }
});


// Year picker logic
document.addEventListener("DOMContentLoaded", function () {
    const yearPicker = document.getElementById("yearOfPassing");
    const currentYear = new Date().getFullYear();

    for (let year = currentYear+3; year >= (currentYear-65); year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearPicker.appendChild(option);
    }
});


// Function to load and display policy content
async function showPolicyModal(type) {
    const modal = document.getElementById('policy-modal');
    const content = document.getElementById('policy-content');

    try {
        const policyFile = type === 'terms' 
            ? '/policies/terms-of-service.txt' 
            : '/policies/privacy-policy.txt';
        
        const response = await fetch(policyFile);
        if (!response.ok) throw new Error(`Failed to load ${type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}.`);

        const text = await response.text();
        content.innerText = text;

        modal.style.display = 'block';  // Show modal
    } catch (error) {
        content.innerHTML = `<p style="color: red;">Error loading content. Please try again later.</p>`;
        modal.style.display = 'block';  // Show error modal
    }
}
