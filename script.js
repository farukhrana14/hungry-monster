//Use Enter Key beside search button
document.querySelector("#input-food-name").addEventListener("keypress", event => {
    if (event.key !== "Enter") return;
    document.querySelector("#searchButton").click();
    event.preventDefault();
});


// Function to validate input not null and string from search ==> checkInput() ==> selectURL() ==> validityResp()
const getEvents = () => {
    document.getElementById("menu-container").innerHTML = "";
    document.getElementById("selected-menu").style.display = "none";
    document.getElementById("search-count").innerText = "000";
    const inputFoodName = document.getElementById("input-food-name").value;
    const checkInputResult = checkInput(inputFoodName);
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFoodName}`

    if (checkInputResult == true) {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.meals == null) {
                    errorMessage("errorTypeB")
                } else {
                    getResponseData(url);
                }
            })
    }
}



//function to fetch data from API after all validation
const getResponseData = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {

            //Total count of search results
            let searchCount = data.meals.length;
            document.getElementById("search-count").innerText = searchCount;
            document.getElementById("search-result-div").style.display = 'block';
            data.meals.forEach(meals => {
                let imageSource = meals.strMealThumb;
                let menuName = meals.strMeal;
                let menuId = meals.idMeal;
                

                const menuContainer = document.getElementById("menu-container");
                const newDiv = document.createElement("div");
                newDiv.className = "col";
                const menuHTML = `
                    <div onclick="detailMenu(${menuId});" style="cursor: pointer;" class="card">
                        <img src="${imageSource}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 style="cursor: pointer;" class="card-title">  ${menuName}</h5>
                        </div>
                    </div> 
                `
                newDiv.innerHTML = menuHTML;
                menuContainer.appendChild(newDiv);
                
            });
        })
        cleanBar();
}


// function to accept only text input
const checkInput = (inputFoodName) => {
    let letters = /^[A-Za-z ]+$/;
    if (inputFoodName.match(letters)) {
        return true;
    }
    else {
        errorMessage("errorTypeA");
    }
}

//function for detail menu with ingredients
const detailMenu = (input) => {
    const ingreDients = [];
    
    let menuId = input;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${menuId}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data = data.meals[0];
            //Menu Name and image source
            let menuNameDetail = data.strMeal
            let srcImageDetail = data.strMealThumb;

            //change menu title
            document.getElementById("selcted-menu-title").innerText = menuNameDetail;
            document.getElementById("selected-menu-img").src = srcImageDetail;

            //Push ingredients to an Array 
                        for (let i = 1; i <= 20; i++) {
                let eachIngredient = data[`strIngredient${i}`];
                if (eachIngredient !== null && eachIngredient !== "") {
                    ingreDients.push(eachIngredient);
                }
            }

            //Empty exitsting ul.li, if any
            //Push ingredient to UI 
            const ul = document.getElementById("ingredient-list");
            ul.innerHTML = '';
            ingreDients.forEach(ingreDients => {
                const ingredient = ingreDients;
                const li = document.createElement('li');
                li.innerText = ingredient;
                ul.appendChild(li);
            })
            
            document.getElementById("selected-menu").style.display = "block";
            greetingsText();
            topFunction();
            
            
        })
}


//Error message for invalid search errorType
const errorMessage = (errorType) => {
    if (errorType == "errorTypeA") {
        document.getElementById("errorMessage").innerHTML = "<p>Please use<span style='font-weight:bold'; class ='text-highlight'> only texts</span> to write a food name in the search box. Numbers or symbols are not allowed.</p>"
        window.dialog.showModal();
    } else if (errorType == "errorTypeB") {
        document.getElementById("errorMessage").innerHTML = "<p>Sorry,<span style='font-weight:bold'; class ='text-highlight'> no match found</span> for your search name, please try with another name.</p>"
        window.dialog.showModal();
    }
}

//function to clean  the search bar
const cleanBar = () => {
    document.getElementById("input-food-name").value = "";
}

//Function to hide selected menu by button
const hideButton = () => {
    document.getElementById("selected-menu").style.display = "none";
}

//go to top of page by div id
const topFunction = () => {
    var elmnt = document.getElementById("selected-menu");
    elmnt.scrollIntoView();

}

const greetingsText = () =>{
    var randomStrings = [
        "Wow! ",
        "That's Great! ",
        "That's Yummy!",
        "Nice Choice!",
        "Enjoy!",
    ];
    let wordIndex = Math.ceil((Math.random() * randomStrings.length - 1));
    let newGreetingsText = randomStrings[wordIndex];
    document.getElementById("greetings-text").innerText = newGreetingsText;
    randomColorGreetings()
}

const randomColorGreetings = () =>{
    var colorBank = [
        "#d60f0f",
        "#3f81eb",
        "#0da802",
        "#f5424b",
        "#8169e0",
        "#f03805",
    ];
    let colorIndex = Math.ceil((Math.random() * colorBank.length - 1));
    let newGreetingsColor = colorBank[colorIndex];
    document.getElementById("greetings-text").style.color = newGreetingsColor;
}

