let inputText = document.querySelector(".inputText")
let main_body = document.querySelector(".main_body")
let model = document.querySelector(".model")
let cross_continer = document.querySelector(".cross_continer")
let text_container = document.querySelector(".text_container")
let inputFrom = document.querySelector("form")

const fetch_recipe = async (query) => {

    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=&t${query}`
    let response = await fetch(url)
    let data = await response.json();
    console.log(data);

    data.meals.forEach(meal => {
        const Recipe_container = document.createElement("div")
        Recipe_container.classList.add("recipe")
        Recipe_container.innerHTML += `
        <img src="${meal.strMealThumb}"/>
            <h1>Name : ${meal.strMeal}</h1>
            <h4>Area : ${meal.strArea}</h4>
            <h4>Category :  ${meal.strCategory}</h4>
        `
        const Recipe_button = document.createElement("button")
        Recipe_button.innerHTML = "VIEW RECIPE"
        Recipe_button.addEventListener("click", () => {
            openModel(meal)
        })
        Recipe_container.appendChild(Recipe_button)
        main_body.appendChild(Recipe_container)
    });

}

const dropdownRecipe = (meal) => {
    let intriant = "";
    for (let i = 0; i < 20; i++) {
        var intrgiant = meal[`strIngredient${i}`]
        if (intrgiant) {
            var meausure = meal[`strMeasure${i}`]
            intriant += `<li>${intrgiant}:${meausure}</li>`
        }
    }
    return intriant;
}

const openModel = (meal) => {
    text_container.innerHTML = ""
    text_container.parentElement.style.display = "block"
    text_container.innerHTML += `
    <h1>Name : ${meal.strMeal}</h1>
    <h4>Area : ${meal.strArea}</h4>
    <h4>Category :  ${meal.strCategory}</h4>
    <ul>${dropdownRecipe(meal)}</ul>
    <a href="${meal.strYoutube}"><i class="fa-brands fa-youtube">Youtube</i></a>
    <h1>Instructions: </h1>
    <p>${meal.strInstructions}</p>
    `
}
cross_continer.addEventListener("click", () => {
    text_container.parentElement.style.display = "none"

})

inputFrom.addEventListener("submit", (e) => {
    e.preventDefault();
    let recipe_name = inputText.value;
    console.log(recipe_name);
    fetch_recipe(recipe_name)
})
