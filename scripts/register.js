if(localStorage.getItem("active")){
    window.location.replace(`./${JSON.parse(localStorage.getItem("active")).userType}.html`)
}

function clicked() {
    window.location.replace("../index.html")
}

function inputCheck(e) {

    let nameString = "1234567890`~!@#$%^&*()-_+=/*[]{}|\"';:/?.>,<\\";
    let userNameString = " `~!#$%^&*()-+=/*[]{}|\"';:/?>,<\\";

    if (e.name == "fullName") {
        if (nameString.includes(e.value[e.value.length - 1])) {
            e.value = e.value.substring(0, e.value.length - 1)

        }
    }
    else if (e.name == "userName") {
        if (userNameString.includes(e.value[e.value.length - 1])) {
            e.value = e.value.substring(0, e.value.length - 1);
        }
    }
}

function registerForm(e) {

    e.preventDefault();

    let regObj = {
        message: []
    }

    if (e.target.fullName.value == "" || e.target.userName.value == "" || e.target.userPassword.value == "" || e.target.userPassword.value != e.target.rePassword.value || e.target.userType.value == "") {
        return alert("FILL THE FIELDS APPROPRIETLY")
    }
    else if ((Object.keys(localStorage).filter((val, id) => {
        return (e.target.userName.value == val)
    })).length) {
        alert("USERNAME ALREADY IN USE")
    }
    else {
        for (let i = 0; i < e.target.elements.length - 1; i++) {
            if (!(e.target.elements[i].name == "rePassword")) {
                regObj = {
                    ...regObj,
                    [e.target.elements[i].name]: e.target.elements[i].value
                }
            }
        }
        localStorage.setItem(`${e.target.userName.value}`, JSON.stringify(regObj));
        localStorage.setItem("active", JSON.stringify(regObj));
        if (localStorage.getItem(`${e.target.userName.value}`) && localStorage.getItem("active")) {
            window.location.replace(`./${e.target.userType.value}.html`)
        }
    }
}