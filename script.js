

// Function to get Menu by search
function getMenu(){
    const foodName = document.getElementById("input-food-name").value;
    

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${foodName}`
    fetch(url)
        .then((response) =>{
            if(response.status !== 200){
                errorMessage()
            } else {
                fetch(url)
                    .then(res=> res.json())
                    .then (data => {
                        let mealObj = data.meals[0];
                        console.log("Meal ID: ", mealObj.idMeal, 
                        "Meal Name: ", mealObj.strMeal,
                        "img src: ", mealObj.strMealThumb,
                        data.meals, "LENGTH: ", data.meals.length);
                                   
                });
            }
        })           

}



//Error message for invalid search input
function errorMessage(){
    window.dialog.showModal();
   
    
}