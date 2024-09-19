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
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz9Rvo0VpVw-7LhcHAxMbgKqMnzmm5xsKR_tjrzOYWK3MsceJcgswWn3PIQeZCPftKVPw/exec';

    fetch(scriptURL, {
        method: 'POST',
        mode: 'cors', // Đảm bảo sử dụng mode 'cors' để xử lý yêu cầu từ domain khác
        headers: {
            'Content-Type': 'application/json' // Đảm bảo gửi đúng kiểu dữ liệu
        },
        body: JSON.stringify(formData) // Chuyển form data thành JSON
    })
        .then(response => response.json())
        .then(result => {
            document.getElementById("formResult").innerHTML = "Form submitted successfully!";
            document.getElementById("registrationForm").reset();
        })
        .catch(error => {
            document.getElementById("formResult").innerHTML = "Error submitting form!";
            console.error('Error:', error);
        });
});
