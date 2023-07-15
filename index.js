const img = document.querySelector(".images")
const male = document.querySelector(".male")
const female = document.querySelector(".female")
let loading = document.querySelector(".loading")
let searchcategory = document.querySelector("#search")

let showmore = document.querySelector(".show")





window.addEventListener("DOMContentLoaded", () => {
    let number = 20;

    showmore.addEventListener("click", () => {
        number += 20;
        load()
    })


    load()


    function load() {

        loading.classList.add("show")

        fetch(`https://randomuser.me/api?results=${number}`)
            .then(res => res.json())
            .then(json => {

                loading.classList.remove("show")//* This function is used to remove loading icon after fetching

                let result = json.results;
                for (let i = 0; i < result.length; i++) {

                    general(result[i])


                }

                searchcategory.addEventListener("keyup", () => {
                    let user_name = document.querySelectorAll(".para")
                    for (let i = 0; i < user_name.length; i++) {
                        if (user_name[i].innerText.toUpperCase().indexOf(searchcategory.value.toUpperCase()) != -1) {
                            user_name[i].parentElement.parentElement.style.display = "block"
                        }
                        else {
                            user_name[i].parentElement.parentElement.style.display = "none"
                        }
                    }
                })

                male.addEventListener("click", () => {
                    child()

                    male.classList.toggle("active")
                    female.classList.remove("active")
                    if (male.classList.contains("active")) {
                        let result = json.results;
                        for (let i = 0; i < result.length; i++) {
                            let gender = result[i].gender;
                            if (gender == "male") {
                                general(result[i])
                            }

                        }
                    }
                    else {
                        let result = json.results;
                        for (let i = 0; i < result.length; i++) {
                            general(result[i])

                        }
                    }

                })
                female.addEventListener("click", () => {
                    child()
                    female.classList.toggle("active")
                    male.classList.remove("active")
                    if (female.classList.contains("active")) {
                        let result = json.results;
                        // console.log(result)
                        for (let i = 0; i < result.length; i++) {

                            let gender = result[i].gender;
                            if (gender == "female") {
                                general(result[i])
                            }
                        }
                    }
                    else {
                        let result = json.results;
                        for (let i = 0; i < result.length; i++) {
                            general(result[i])
                        }
                    }
                })
            })
    }

})

function child() {
    while (img.hasChildNodes()) {
        img.firstChild.remove()

    }

}
function general(datas) {
    let div = document.createElement("div")
    let a = document.createElement("a")
    a.href = `detail.html?id=${datas.id.value}`

    let image = document.createElement("img")
    image.setAttribute("class", "img")
    let src = datas.picture.large;
    image.src = src;
    a.appendChild(image)
    let link = document.createElement("a")
    link.setAttribute("class", "link")
    link.href = `detail.html?id=${datas.id.value}`
    let name = document.createElement("p")
    name.setAttribute("class", "para")
    name.innerText = `${datas.name.first}${datas.name.last}`;
    link.appendChild(name)

    div.appendChild(a)
    div.appendChild(name)
    img.appendChild(div)

    let images = document.querySelectorAll("img")
    let names = document.querySelectorAll("p")

    for (let k = 0; k < images.length; k++) {
        console.log(images)
        images[k].addEventListener("mouseenter", () => {
            images[k].style.filter = "blur(3px)"
            names[k].style.visibility = "visible"
        })

        images[k].addEventListener("mouseout", () => {
            images[k].style.filter = "blur(0px)"
            names[k].style.visibility = "hidden"
        })

        names[k].addEventListener("mouseenter", () => {
            images[k].style.filter = "blur(4px)"
            names[k].style.visibility = "visible"
        })

        names[k].addEventListener("mouseout", () => {
            images[k].style.filter = "blur(0px)"
            names[k].style.visibility = "hidden"
        })

    }
}




// redirect when clicking on the user card => detail.html?id=[idoftheuser] 
// get the id from the url - window.location.search => ?=2323
// extract the id from the above step and pass to the API (https://randomuser.me/api?id=[id])