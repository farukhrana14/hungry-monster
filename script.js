//Use Enter Key beside search button
document.querySelector("#input-food-name").addEventListener("keypress", event => {
    if (event.key !== "Enter") return;
    document.querySelector("#searchButton").click();
    event.preventDefault(); // No need to `return false;`.
});




// Function to validate input not null and string from search ==> checkInput() ==> selectURL() ==> validityResp()
getEvents = () => {
    const inputFoodName = document.getElementById("input-food-name").value;
    const checkInputResult = checkInput(inputFoodName);
    if (checkInputResult == true) {
        let url = selectURL(inputFoodName);
        if (url !== "") {
            if (validityResp(url) !== "") {
                getResponseData(url);
            }
        }
    }

}



//function to fetch data from API after all validation
const getResponseData = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {

            data.meals.forEach(meals => {

                let countOfMenu = meals.length;
                let imageSource = meals.strMealThumb;
                let menuName = meals.strMeal;
                let menuId = meals.idMeal;

                console.log("Iteration:", countOfMenu, "Meal ID: ", menuId, "Meal Name: ", menuName, "img src: ", imageSource)

                const menuContainer = document.getElementById("menu-container");

                const newDiv = document.createElement("div");
                newDiv.className = "col";
                const menuHTML = `
                    <div class="card">
                        <img src="${imageSource}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${menuName}</h5>
                        </div>
                    </div> 
                `
                newDiv.innerHTML = menuHTML;
                menuContainer.appendChild(newDiv);
                document.getElementById("input-food-name").value = "";
            });
        })
    document.getElementById("input-food-name").value = "";
}


//function to check validity of response data ==> calls getResponseData()
const validityResp = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.meals !== null) {
                return url;
            } else {
                errorMessage("errorTypeB")
            }
        })

}


//function to select URL
const selectURL = (inputFoodName) => {
    if (inputFoodName.length == 1) {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputFoodName}`
        return url;
    } else {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFoodName}`
        return url;
    }
}


// function to accept only text input
const checkInput = (inputFoodName) => {
    let letters = /^[A-Za-z]+$/;
    if (inputFoodName.match(letters)) {
        return true;
    }
    else {

        errorMessage("errorTypeA");
    }
}


//Error message for invalid search errorType
const errorMessage = (errorType) => {
    if (errorType == "errorTypeA") {
        document.getElementById("errorMessage").innerText = "Please use only texts to write a food name in the search box."
        window.dialog.showModal();
    } else if (errorType == "errorTypeB") {
        document.getElementById("errorMessage").innerText = "Sorry, no match found for your search name, please try with another name."
        window.dialog.showModal();
    }
}