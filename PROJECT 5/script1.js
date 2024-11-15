const main = document.getElementById('main');
const adduser = document.getElementById('add-user');
const double1  = document.getElementById('double');
const millionarie = document.getElementById('show-millionaires');
const sort = document.getElementById('sort')
const sum = document.getElementById('sum')

let data = [];

async function getrandomuser(){
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    //console.log(data);
    user = data.results[0];
    //console.log(user);
    const newuser = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        balance: (Math.random()*100000).toFixed(2)
    }
    addData(newuser);
}


function addData(newuser){
    data.push(newuser);
    //console.log(data);
    updatedoc();
}

function updatedoublemoney(){
    console.log('old data',data);
    data = data.map(user => {
        return{
            ...user,balance: user.balance * 2 
        }
    });
    console.log('new data',data);
    
    updatedoc();
}


function filterUsers() {
    // Filter out all users whose balance is less than million
    data = data.filter(user => user.balance >= 1000000);
    // Update the DOM with new user data
    updatedoc();
}


function sortbywealth(){
    data = data.sort((a,b)=>b.balance -a.balance)
    updatedoc();
}


function addallwealth(){
    
    updatedoc();
    // Add up all balance from all users
    // Accumulator starts at 0 and adds the current users balance for each iteration
    const balance = data.reduce((acc, user) => (acc += user.balance), 0);
    // Create a Div for the balance
    const balanceElement = document.createElement('div');
    // Set the innerHTML for new div
    balanceElement.innerHTML = `<h3>Total Balance: ${formatNumberToDollar(balance)}</h3>`;
    // Append Balance in main element
    main.appendChild(balanceElement);
}









function formatNumberToDollar(number) {
    const numericValue = parseFloat(number);
    return `$${numericValue.toFixed(2)}`;
}


function updatedoc(userdata = data){
    //clear pervious ui
    main.innerHTML='<h2><strong>USER</strong> WEALTH</h2>'
    userdata.forEach(user => {
        const userdiv =document.createElement('div');
        userdiv.classList.add('user');
        userdiv.innerHTML = `<strong> ${user.name}</strong>  
                            ${formatNumberToDollar(user.balance)}`;
        main.appendChild(userdiv);
        return userdiv;
    });
}




adduser.addEventListener('click',getrandomuser);
double1.addEventListener('click',updatedoublemoney);
millionarie.addEventListener('click',filterUsers);
sort.addEventListener('click',sortbywealth);
sum.addEventListener('click',addallwealth);


getrandomuser();
getrandomuser();
getrandomuser();
getrandomuser();