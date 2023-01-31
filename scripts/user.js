function logoutClick() {
    localStorage.removeItem("active");
    window.location.replace("../index.html");
}

let activeUser = {}
if(localStorage.getItem("active")){
    activeUser = JSON.parse(localStorage.getItem(Object.keys(localStorage).filter((val) => {
        return (val == JSON.parse(localStorage.getItem("active")).userName && JSON.parse(localStorage.getItem("active")).userType == "user")
    })))
}
else{
    window.location.replace("../index.html");
}

activeUser.message.map((val, id) => {
    let allMsg = document.querySelector(".allMsg");
    let msgBox = document.createElement("div");
    if (val.status == "accepted") {
        msgBox.style.cssText = "border: 5px solid green; padding : 10px; margin : 10px"
    }
    else if (val.status == "declined") {
        msgBox.style.cssText = "border: 5px solid red; padding : 10px; margin : 10px"
    }
    else {
        msgBox.style.cssText = "border: 5px solid yellow; padding : 10px; margin : 10px"
    }
    let msgPara = document.createElement("p");
    msgPara.innerText = val.msg;
    msgBox.appendChild(msgPara);
    allMsg.appendChild(msgBox);

})

function createMsgSubmit(e) {
    e.preventDefault();

    for (let i = 0; i < e.target.elements.length - 1; i++) {
        activeUser.message.push({
            msg: e.target.elements[i].value,
            status: "pending"
        });
        e.target.elements[i].value = "";
    }
    localStorage.setItem("active", JSON.stringify(activeUser));
    localStorage.setItem(`${activeUser.userName}`, JSON.stringify(activeUser));

    activeUser.message.map((val, id) => {
        if (id == activeUser.message.length - 1) {
            let allMsg = document.querySelector(".allMsg");
            let msgBox = document.createElement("div");
            if (val.status == "accepted") {
                msgBox.style.cssText = "border: 5px solid green; padding : 10px; margin : 10px"
            }
            else if (val.status == "declined") {
                msgBox.style.cssText = "border: 5px solid red; padding : 10px; margin : 10px"
            }
            else {
                msgBox.style.cssText = "border: 5px solid yellow; padding : 10px; margin : 10px"
            }
            let msgPara = document.createElement("p");
            msgPara.innerText = val.msg;
            msgBox.appendChild(msgPara);
            allMsg.appendChild(msgBox);
        }
    })
}

console.log(activeUser);