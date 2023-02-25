function checkForLogin(){
    if(localStorage.getItem("isLogin") == true){

        dashBoard();
        
        
        window.location.href = "dashboard.html";
    }
}

checkForLogin();


let signform = document.forms['signUp'];
let sbtn = document.getElementById('signUp');


if(sbtn != null){
    sbtn.addEventListener('click', signUp)  ;
}


function signUp(event){
    event.preventDefault();
    
    // let inputs = document.getElementsByTagName('input');
    let name = signform['name'];
    let email = signform['email'];
    let pwd = signform['pwd'];
    let cpwd = signform['cpwd'];

    // console.log(name.value, email.value, pwd.value, cpwd.value);

    
    let alert = document.getElementById('alert');

    if(name.value.length < 2){
        alert.innerHTML = "Name should have at least 2 letter word!";
        alert.style.display = "block";
        return;
    }else{
        alert.innerHTML = "";
    }

    let validEmail = ValidateEmail(email.value);
    if(!validEmail){
        alert.innerHTML = "Invalid Email address! Please enter valid Email!";
        alert.style.display = "block";
        return;
    }

    let validPwd = ValidPassword(pwd.value);

    if(pwd.value == name.value || pwd.value == email.value){
        if(pwd.value == name.value){
            alert.innerHTML = "Password can't be same as name!";
        }else{
            alert.innerHTML = "Password can't be same as Email!";
        }
        alert.style.display = "block";
        return;
    }else if(!validPwd){
        alert.innerHTML = "Please consists 1 capital, 1 small, 1 number and 1 special character at least";
        alert.style.display = "block";
        return;
    }
    
    if(pwd.value != cpwd.value){
        alert.innerHTML = "Password & Confirm Password is not same!";
        alert.style.display = "block";
        return;
    }


    if(hasMethod(email.value)){
        alert.innerHTML = "This Email is already registered! try sign In";
        alert.style.display = "block";
        return;
    }else{
        let token = generateString(16);
        let u = {
            "name":name.value,
            "email":email.value,
            "pass":pwd.value,
            "token": token
        }

        let data = localStorage.getItem("data");
        let users = JSON.parse(data);

        if(data == null){
            let user = [];
            
            user.push(u);
            localStorage.setItem("data", JSON.stringify(user));
        }else{
            
            users.push(u);
            console.log(users);

            localStorage.setItem("data", JSON.stringify(users));
        }

        
    }

    
    console.log(localStorage);

    alert.innerHTML = "";

    window.location.href = "login.html";
}

function hasMethod(value){
    let data = localStorage.getItem("data");
    let users = JSON.parse(data);

    console.log(users, localStorage);

    if(data == null){ 
        return false;
    }

    for(let i=0; i<users.length; i++){

        let email = users[i].email;
        console.log(users[i].email, value);
        if(email == value){
            console.log("in");
            return true;
        }
    }

    return false;
}


function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    // alert("You have entered an invalid email address!")
    return (false)
}

function ValidPassword(Password){
    var capital = /[A-Z]/;
    var small = /[a-z]/;
    let number = /[0-9]/;
    let special = /[^a-zA-Z0-9]/;

    if(capital.test(Password) && small.test(Password) && number.test(Password) && special.test(Password)){
        return true;
    }else{
        return false;
    }

    
}



// sing in page script


let singBtn = document.getElementById('signIn');

if(singBtn != null){
    singBtn.addEventListener('click', login);
}

let signUpform = document.forms['login'];

let teacher;


function login(){

    let email = signUpform['email'].value;
    let password = signUpform['pwd'].value;

    if(hasMethod(email)){
        
        
        let data = localStorage.getItem("data");
        let users = JSON.parse(data);

        for(let i=0; i<users.length; i++){

            let e = users[i].email;

            if(e == email){
                teacher =  users[i];
                localStorage.setItem("teacher", JSON.stringify(teacher));
                break;
            }
        }

        if(teacher["pass"] == password){

            localStorage.setItem("isLogin", true);
            window.location.href = "dashboard.html";
        }else{
            alert("Wrong Credentials! please check your password or email id!")
            return;
        }
    }else{
        alert("Wrong Credentials! please check your password or email id!")
        return;
    }
}






// random string

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}




// dash board 


function dashBoard(){
    
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let token = document.getElementById('token');
    
    let data = localStorage.getItem('teacher');
    let teacher = JSON.parse(data);

    name.innerHTML = `Welcome back : ${teacher.name}`;
    email.innerHTML = `Your Email ID : ${teacher.email}`;
    // token.innerHTML = `Your Token : ${teacher.token}`;


    
}

function logOut(){
    localStorage.setItem("isLogin", false);
    window.location.href = "login.html";
}

function changePass(){
    let old = document.getElementById("old").value;
    let newPass = document.getElementById('newPass').value;
    let conPass = document.getElementById("confirm").value;


    if(newPass != conPass){
        alert("New Password and Confirm Password is not same!");
    }else{
        let data = localStorage.getItem('teacher');
        let teacher = JSON.parse(data);

        let userData = localStorage.getItem('data');
        let users = JSON.parse(userData);


        for(let i=0; i<users.length; i++){
            if(users[i].email == teacher.email){
                users[i]["pass"] = newPass;
                break;
            }
        }

        localStorage.setItem('data', JSON.stringify(users));

        alert("Password Changed!");
    }

}



dashBoard();


