document.addEventListener("DOMContentLoaded", () => {
    const editBtn = document.getElementById("editProfileBtn");
    const cancelBtn = document.getElementById("cancelEditBtn");
    const profileView = document.getElementById("profileView");
    const profileEditForm = document.getElementById("profileEditForm");

    editBtn.addEventListener("click", () => {
        profileView.style.display = "none";
        profileEditForm.style.display = "block";
    });

    cancelBtn.addEventListener("click", () => {
        profileEditForm.style.display = "none";
        profileView.style.display = "block";
    });
});
