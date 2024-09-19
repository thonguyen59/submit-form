document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const formData = {
        name: name,
        email: email,
        phone: phone
    };

    // Link to Google Apps Script that handles the data submission to Google Sheets
    const scriptURL = 'https://script.google.com/macros/s/YOUR_GOOGLE_APPS_SCRIPT_ID/exec';

    fetch(scriptURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(result => {
            document.getElementById("formResult").innerHTML = "Form submitted successfully!";
            document.getElementById("registrationForm").reset();
        })
        .catch(error => {
            document.getElementById("formResult").innerHTML = "Error submitting form!";
        });
});
