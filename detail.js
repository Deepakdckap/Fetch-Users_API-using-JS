
let id = window.location.search
let image = document.querySelector(".image")
let details = document.querySelector(".details")

let loading = document.querySelector(".loading")

window.addEventListener("DOMContentLoaded", () => {

    loading.classList.add("show")

    fetch(`https://randomuser.me/api?id=${id}`)
        .then(res => res.json())
        .then(json => {
            loading.classList.remove("show")

            let result = json.results;
            result.forEach(results => {
                let img = document.createElement("img")
                img.src = results.picture.large;
                image.appendChild(img)

                let name = document.createElement("h2")
                name.innerText = `FullName:${results.name.first}${results.name.last}`
                details.appendChild(name)

                let gender = document.createElement("h3")
                gender.innerText = `Gender:${results.gender}`
                details.appendChild(gender)


                let dob = document.createElement("h3")
                dob.innerText = `DOB:${results.dob.date.slice(0, 10)}`;
                details.appendChild(dob)


                let e = document.createElement("h3")
                e.innerText = `Email Id: ${results.email}`

                details.appendChild(e)

                let phoneno = document.createElement("h3")
                phoneno.innerText = `PhoneNo:${results.phone}`
                details.appendChild(phoneno)


            });


        })

})
