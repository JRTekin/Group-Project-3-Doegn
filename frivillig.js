document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".form-grid");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const role = document.getElementById("role").value.trim();
        const message = document.getElementById("message").value.trim();
        const consent = document.getElementById("consent").checked;

        const allValid =
            name !== "" &&
            email !== "" &&
            phone !== "" &&
            role !== "" &&
            message !== "" &&
            consent === true;

        if (allValid) {
            alert("Tak for tilmelding! – Vi behandler din efterspørgsel hurtigst muligt.");
        } else {
            alert("Tilmelding mislykkedes – udfyld venligst alle felter korrekt.");
        }
    });

});
