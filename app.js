const error = document.querySelector("#error");
const logIn = document.querySelector("#logIn");
const userData = {
        "data":
            [{
                "email": "razvan@gmail.com",
                "password": "parola",
            },
            {
               "email": "razvan.1996@gmail.com",
                "password": "parola1",
            }]
    };
const divForm = document.querySelector(".form");
const contentDiv = document.querySelector("#content");
const loadEffect = document.querySelector("#loading");

const afterLog = () => {

    const promise = new Promise((res, rej) => {
        fetch("https://reqres.in/api/users?delay=3")
        .then((respone) => respone.json())
        .then((json) => {
            if(json.data.length) {
                res(json.data)
            } else {
                rej("Error 404")
            }
        })
    })

    promise.then((data)=>{
        data.map(showContent => {
            loadEffect.style.display = "none"
            contentDiv.innerHTML += `
            <div class="table">
                <table>
                    <tr>
                        <td>
                            <p>${showContent.id}</p>
                        </td>
                        <td>
                            <p>${showContent.first_name}</p>
                        </td>
                        <td>
                            <p>${showContent.last_name}</p>
                        </td>
                    </tr>
                </table>
            </div>
            `
        })
    })
};

// const afterLog = () => {

// function content(data) {
//     data.map(showContent => {
//         contentDiv.innerHTML += `
//         <div class="table">
//             <table>
//                 <tr>
//                     <td>
//                         <p>${showContent.name}</p>
//                     </td>
//                     <td>
//                         <p>${showContent.gender}</p>
//                     </td>
//                     <td>
//                         <p>${showContent.age}</p>
//                     </td>
//                 </tr>
//             </table>
//         </div>
//         `
//     });
// }

// const URLadress = "https://ghibliapi.herokuapp.com";
// const allPeople = "/people";

// fetch(URLadress + allPeople)
// .then((show) => show.json())
// .then((conversion) => content(conversion));
// };



const eventLog = () => {
    logIn.addEventListener("click", (e) => {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        e.preventDefault();

        for (let i = 0; i < userData.data.length; i++) {
            if(email !== "") {
                //este ok 
                if(password !== "") {
                    // este ok
                        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if(email === userData.data[i].email && password === userData.data[i].password && email.match(regEx)){
                            divForm.style.display = "none";
                            content.style.display = "block"
                            loadEffect.style.display = "flex"
                            afterLog();
                        } else {
                            error.style.display = "block";
                            error.innerText = "Wrong email or password";
                        }
                } else {
                    error.style.display = "block";
                    error.innerText = "Fill the password";
                }
            } else {
                error.style.display = "block";
                error.innerText = "Fill the email and password";
            }
            
        }

    });
};


eventLog();