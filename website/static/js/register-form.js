let _form = null;

function getForm() {
    if (_form == null) {
        _form = document.getElementById("register-form");
    }

    return _form
}

function validateRegisterForm() {
    const pass = document.getElementById("password");
    const r_pass = document.getElementById("r-password");

     pass.setCustomValidity("");
        r_pass.setCustomValidity("");

    if (pass.value.length <= 5) {
        pass.setCustomValidity("Password must contain more than 5 characters");
    } else if (r_pass.value !== pass.value) {
        r_pass.setCustomValidity("Passwords must match");
    }
    
    if (getForm().reportValidity()) {
        window.location.href = "index.html";
    } 
}