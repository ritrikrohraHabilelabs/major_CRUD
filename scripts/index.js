if(localStorage.getItem("active")){
    window.location.replace(`./pages/${JSON.parse(localStorage.getItem("active")).userType}.html`)
}

function clicked() {
    return window.location.replace("./pages/register.html")
}

function loginForm(e) {

    e.preventDefault();

    if (e.target.userName.value == "" || e.target.userPassword.value == "" || e.target.userType.value == "") {
        alert("FILL ALL THE FIELDS APPROPRIETLY")
    }
    else if ((Object.keys(localStorage).filter((val, id) => {
        return ((e.target.userName.value == val) && (e.target.userType.value == JSON.parse(localStorage.getItem(val)).userType) && (JSON.parse(localStorage.getItem(e.target.userName.value)).userPassword == e.target.userPassword.value))
    })).length) {
        localStorage.setItem("active", localStorage.getItem(e.target.userName.value))
        window.location.replace(`./pages/${e.target.userType.value}.html`);
    }
    else {
        alert("WRONG USERNAME OR PASSWORD")
    }
}