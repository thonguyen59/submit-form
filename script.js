// Hàm để tải một file HTML vào một phần tử cụ thể
function loadHTML(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // console.log("data: " + data)
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Tải form.html vào phần tử có id là 'content'
loadHTML('submitForm.html', 'submitForm');

// Lắng nghe sự kiện submit của form sau khi nội dung đã được tải vào
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Lấy giá trị từ các trường nhập liệu
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        // Tạo đối tượng chứa dữ liệu form
        const formData = {
            name: name,
            email: email,
            phone: phone
        };

        console.log('Form data:', formData);

        // Link đến Google Apps Script để xử lý gửi dữ liệu
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyTnfHkKe0HYAlBs9W0u6t8pwAa59DiJFxXJUTm45D7oCHDh-i4cM_10GUpLdrvtgNYsg/exec';

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors', // Sử dụng 'no-cors' để tránh lỗi CORS
            headers: {
                'Content-Type': 'application/json' // Đảm bảo dữ liệu được gửi đi dưới dạng JSON
            },
            body: JSON.stringify(formData) // Chuyển đổi đối tượng formData thành chuỗi JSON test - 2
        })
            .then(() => {
                document.getElementById("formResult").innerHTML = "Form submitted successfully!";
                document.getElementById("formResult").classList.add("alert", "alert-success");
                document.getElementById("registrationForm").reset(); // Xóa dữ liệu trong form sau khi submit thành công khoong
            })
            .catch(error => {
                document.getElementById("formResult").innerHTML = "Error submitting form!";
                document.getElementById("formResult").classList.add("alert", "alert-danger");
                console.error('Error:', error);
            });
    });
});
