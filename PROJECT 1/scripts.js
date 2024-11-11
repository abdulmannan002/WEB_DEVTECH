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

function showPasswordMismatchError(input1, input2, message) {
    const formControl1 = input1.parentElement;
    const formControl2 = input2.parentElement;
    formControl1.className = 'form-control error';
    formControl2.className = 'form-control error';
    const small1 = formControl1.querySelector('small');
    const small2 = formControl2.querySelector('small');
    small1.innerText = message;
    small2.innerText = message;
}



function checkemail (email) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());

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
// create event listener
form.addEventListener('submit',function(e) {
    e.preventDefault();

    checkrequired([username,email,password,password2]);


});

