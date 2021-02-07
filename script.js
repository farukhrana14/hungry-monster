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
    document.getElementById("menu-container").innerHTML = "";
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

                // let countOfMenu = meals.length;
                let imageSource = meals.strMealThumb;
                let menuName = meals.strMeal;
                let menuId = meals.idMeal;

                // console.log("Iteration:", countOfMenu, "Meal ID: ", menuId, "Meal Name: ", menuName, "img src: ", imageSource)

                const menuContainer = document.getElementById("menu-container");

                const newDiv = document.createElement("div");
                newDiv.className = "col";
                const menuHTML = `
                    <div onclick="detailMenu(${menuId})"; style="cursor: pointer;" class="card">
                        <img src="${imageSource}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 style="cursor: pointer;" class="card-title">  ${menuName}</h5>
                        </div>
                    </div> 
                `
                newDiv.innerHTML = menuHTML;
                menuContainer.appendChild(newDiv);
                // document.getElementById("input-food-name").value = "";
                cleanBar();
            });
        })
    // document.getElementById("input-food-name").value = "";
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


const detailMenu = (input) => {
    let menuId = input;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${menuId}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data = data.meals[0];
            //Menu Name and image source
            let menuNameDetail = data.strMeal
            let srcImageDetail = data.strMealThumb;
            console.log(menuNameDetail, srcImageDetail);
            
            //change menu title
            document.getElementById("selcted-menu-title").innerText = menuNameDetail;
            document.getElementById("selected-menu-img").src = srcImageDetail;

            //ingredients list
            const ingreDients = [];
            for (let i = 1; i <= 20; i++) {
                let eachIngredient = data[`strIngredient${i}`]; 
                if (eachIngredient !==null && eachIngredient !== ""){
                    ingreDients.push(eachIngredient);
                }
                              
            } 
            const ul = document.getElementById("ingredient-list");
            for (let i = 0; i < ingreDients.length; i++) {
                const ingredient = ingreDients[i];
                const li = document.createElement('li');
                li.innerText = ingredient;
                ul.appendChild(li);
                
            }
            
            document.getElementById("selected-menu").style.display = "block";
            // console.log(ingreDients); 










        })
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

//function to clean  the search bar
const cleanBar = () => {
    document.getElementById("input-food-name").value = "";
}



const hideButton = () => {
    document.getElementById("selected-menu").style.display = "none";
}