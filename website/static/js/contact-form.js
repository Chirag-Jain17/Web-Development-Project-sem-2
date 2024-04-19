document.addEventListener('DOMContentLoaded', (_) => {
    document.getElementById("submit-btn").addEventListener("click", validateFormAndPrepareEmail, false);
})

let _form = null;

function getForm() {
    if (_form == null) {
        _form = document.getElementById("contact-form");
    }

    return _form
}

function validateFormAndPrepareEmail() {
    if (getForm().reportValidity()) {
        showSuccessMsg();

        const subject = document.getElementById("contact-reason").value + " - " + document.getElementById("short-title").value;
        const body = document.getElementById("detailed-description").value;

        getForm().reset();

        window.location.href = "mailto:UniStud@support.com?subject="+subject+"&body="+body;
    }
}

function showSuccessMsg() {
    let msg_element = document.getElementById("success-msg-element");
    msg_element.parentElement.style.display = "flex";

    msg_element.innerText = "Thankes for reaching out "+document.getElementById("title").value+" "+document.getElementById("lname").value+".\n"+"You are being redirected...";
}

const EMAIL_RADIO_ID = "email-radio";
const PHONE_RADIO_ID = "phone-radio";
const EMAIL_INPUT_ID = "email";
const PHONE_INPUT_ID = "phone";
const COUNTRY_CODE_INPUT_ID = "country-code";
function onRadioBtnChecked(element) {
    // We need to toggle the "required" attribute, otherwise the form will not be validated.
    if (element.id === EMAIL_RADIO_ID) {
        let email_input = document.getElementById(EMAIL_INPUT_ID);
        email_input.required = true;
        email_input.parentElement.style.display = "block";
        let phone_input = document.getElementById(PHONE_INPUT_ID);
        let country_code_input = document.getElementById(COUNTRY_CODE_INPUT_ID);
        phone_input.required = false;
        country_code_input.required = false;
        document.getElementById(PHONE_INPUT_ID).parentElement.parentElement.style.display = "none";
    } else {
        let phone_input = document.getElementById(PHONE_INPUT_ID);
        let country_code_input = document.getElementById(COUNTRY_CODE_INPUT_ID);
        phone_input.required = true;
        country_code_input.required = true;
        document.getElementById(PHONE_INPUT_ID).parentElement.parentElement.style.display = "block";
        let email_input = document.getElementById(EMAIL_INPUT_ID);
        email_input.required = false;
        email_input.parentElement.style.display = "none";
    }
}