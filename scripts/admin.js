if (localStorage.getItem("active")) {

    let activeUser = JSON.parse(localStorage.getItem(Object.keys(localStorage).filter((val) => {
        return (val == JSON.parse(localStorage.getItem("active")).userName && JSON.parse(localStorage.getItem("active")).userType == "admin")
    })));

    Object.keys(localStorage).map((val, id) => {
        if (val != "active" && val != activeUser.userName) {
            let currUser = JSON.parse(localStorage.getItem(val));
            let allMsg = document.querySelector(".allMsg");
            let userNameText = document.createElement("h3");
            let userDiv = document.createElement("div");
            userDiv.style.cssText = "border : 2px solid black; padding : 10px; margin : 5px;"
            userNameText.innerHTML = `${currUser.fullName} <br> @${currUser.userName}`;
            userDiv.appendChild(userNameText);

            currUser.message.map((value, idx) => {
                let msgBox = document.createElement("div");
                let msgPara = document.createElement("p");
                msgPara.innerText = value.msg;
                msgPara.style.cssText = "margin : 5px; padding : 5px;";
                msgBox.appendChild(msgPara);
                if (value.status == "accepted") {
                    msgBox.style.cssText = "border: 5px solid green; padding : 10px; margin : 10px"
                }
                else if (value.status == "declined") {
                    msgBox.style.cssText = "border: 5px solid red; padding : 10px; margin : 10px"
                }
                else {
                    msgBox.style.cssText = "border: 5px solid yellow; padding : 10px; margin : 10px";
                    let buttonDiv = document.createElement("div");
                    buttonDiv.style.cssText = "display : flex; justify-content : space-around";
                    let acceptBtn = document.createElement("button");
                    acceptBtn.appendChild(document.createTextNode("ACCEPT"));
                    acceptBtn.style.cssText = "width : 20%; margin : 5px; padding : 5px;";
                    let declineBtn = document.createElement("button");
                    declineBtn.style.cssText = "width : 20%; margin : 5px; padding : 5px;";
                    declineBtn.appendChild(document.createTextNode("DECLINE"));
                    acceptBtn.onclick = () => {
                        if (confirm("ARE YOU SURE YOU WANT TO ACCEPT THE MESSAGE")) {
                            let editUser = JSON.parse(localStorage.getItem(val));
                            editUser.message[idx].status = "accepted";
                            localStorage.setItem(val, JSON.stringify(editUser))
                            location.reload();
                        }
                    }
                    declineBtn.onclick = () => {
                        if (confirm("ARE YOU SURE YOU WANT TO DECLINE THE MESSAGE")) {
                            let editUser = JSON.parse(localStorage.getItem(val));
                            editUser.message[idx].status = "declined";
                            localStorage.setItem(val, JSON.stringify(editUser))
                            location.reload();
                        }
                    }
                    buttonDiv.appendChild(acceptBtn);
                    buttonDiv.appendChild(declineBtn);
                    msgBox.appendChild(buttonDiv);
                }
                userDiv.appendChild(msgBox);
            })
            allMsg.appendChild(userDiv);
        }
        else {
            console.log(val)
        }
    })
}
else {
    window.location.replace("../index.html");
}

function logoutClick() {
    localStorage.removeItem("active");
    window.location.replace("../index.html");
}

