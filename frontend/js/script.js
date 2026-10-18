/**
 * PROJET: VISIT AFRIKA
 * FICHIER: script.js
 * DESCRIPTION: Composant du projet Visit Afrika.
 */

// Toggle password visibility with icon change
// Fonction: setupPasswordToggle
function setupPasswordToggle(inputId, buttonId) {
    const button = document.getElementById(buttonId);
    const input = document.getElementById(inputId);

    if (!button || !input) return;

    button.addEventListener("click", (e) => {
        e.preventDefault();
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        
        // Change icon
        const icon = button.querySelector("i");
        if (isPassword) {
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    });
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function() {
    // Setup both password fields
    setupPasswordToggle("password", "togglePassword");
    setupPasswordToggle("confirmPassword", "toggleConfirmPassword");
});