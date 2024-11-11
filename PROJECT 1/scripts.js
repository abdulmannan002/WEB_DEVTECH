// retriving html element

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

function showError (input, message) {
    const formControl =input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
function showSuccess (input) {
    const formControl =input.parentElement;
    formControl.className = 'form-control success';
    const small = formControl.querySelector('small');
    
}

function checkemail (input) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(input.value.trim())){
        showSuccess(input);
    }else {
        showError(input, 'email is invalid')
    }

}
function checkrequired (inputArray) {
    inputArray.forEach(function (input) {
        if (input.value === '') {
            console.log(input.id);
            showError (input,`${getfeildid(input)} is required`);
        }else {
            showSuccess(input);
        }        
    });   
}

function getfeildid (input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checklength(input,min,max){
    if (input.value.length < min) {
        showError(input,`${getfeildid(input)} must be ${min} character required`)
    }else if (input.value.length > max) {
        showError(input,`${getfeildid(input)} must be ${max} character required`)
    }else {showSuccess(input);}
}

function checkpasswordmismatch(input1,input2) {
    if (input1.value !== input2.value) {
        showError(input2, "password don't match")
    }
}

// create event listener
form.addEventListener('submit',function(e) {
    e.preventDefault();

    checkrequired([username,email,password,password2]);
    checklength(username,3,10);
    checklength(password,6,30);
    checkemail(email);
    checkpasswordmismatch(password,password2);
});

