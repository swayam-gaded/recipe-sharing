const recipeData = {
    "momos" : {
        fullRecipe: "Knead plain flour with water to make a soft dough. Finely chop vegetables and mix with salt, pepper, and garlic. Roll the dough into small circles, add filling, and shape momos. Steam them for about 10–12 minutes and serve hot with spicy chutney." 
    },
    "biryani" : {
        fullRecipe: "Marinate chicken with curd and spices and keep aside. Parboil basmati rice with salt and whole spices. Fry onions, add chicken and cook until tender. Layer rice and chicken together and cook on dum for 15 minutes."
    },
    "pizza" : {
        fullRecipe: "Prepare pizza dough and roll it into a base. Spread pizza sauce evenly and add vegetables or chicken. Sprinkle cheese on top and bake in an oven or pan until the base is cooked and cheese melts."
    },
    "paneerbuttermasala" : {
        fullRecipe: "Lightly fry paneer cubes and keep aside. Blend tomatoes and cashews into a smooth paste and cook it with spices and butter. Add cream, paneer, and simmer for a few minutes until the gravy thickens."
    },
    "friedrice" : {
        fullRecipe: "Cook rice and let it cool. Stir-fry chicken in oil, add vegetables and sauces, then add the rice. Toss everything on high flame until well mixed and hot."
    },
    "pasta" : {
        fullRecipe: "Boil pasta until soft and drain. Heat oil, sauté garlic, add tomato sauce and spices, then mix in the pasta. Cook for a minute and serve with cheese."
    },
    "burger" : {
        fullRecipe: "Prepare or fry a patty and toast burger buns. Spread sauce on buns, add patty, vegetables, and cheese. Assemble and serve hot."
    },
    "springrolls" : { 
        fullRecipe: "Prepare a vegetable or chicken filling and let it cool. Fill wrappers with the mixture, seal the edges, and deep fry until golden and crispy. Serve hot with sauce."
    }
}
/*Add feature details*/
const addBtn = document.getElementById("add");
const model = document.getElementById("model-box");
const submitBtn = document.getElementById("addNewRecipe");
const cancelBtn = document.getElementById("closeModel");
const nameInput = document.getElementById("nameInput");
const descInput = document.getElementById("descInput");
const recipeInput = document.getElementById("recipeInput");

addBtn.addEventListener('click', () => {
    model.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    model.style.display = 'none';
    nameInput.value = "";
    descInput.value = "";
});

submitBtn.addEventListener('click', () => {
    const newRecipeName = nameInput.value.trim();
    const newRecipeDesc = descInput.value.trim();
    const newFullRecipe = recipeInput.value.trim();
    if(newRecipeDesc == "" || newRecipeName == "" || newFullRecipe == "") {
        alert("Fill both the fields");
        return;
    }
    
    const recipeId = newRecipeName.toLowerCase().replace(/\s+/g, ''); /* so here \s means all types of empty spaces and + means for combos of empty spaces and /g is to continue until all empty are removed*/
    if (recipeData[recipeId]) {
        alert("Recipe already exists!");
        return;
    }
    recipeData[recipeId] = {
        fullRecipe : newFullRecipe
    }

    const newBox = document.createElement('div');
    newBox.classList.add('recipe-box');
    newBox.dataset.id = recipeId;

    const image = document.createElement('div');
    image.classList.add('image');
    const defaultImage = document.createElement('img');
    defaultImage.src = 'img/default.png';
    defaultImage.alt = newRecipeName + " image";
    image.appendChild(defaultImage);

    const content = document.createElement('div');
    content.classList.add('recipe-content');
    const name = document.createElement('div');
    name.textContent = newRecipeName;
    name.classList.add('recipe-name');
    const desc = document.createElement('div');
    desc.textContent = newRecipeDesc;
    desc.classList.add('recipe-desc');

    content.appendChild(name);
    content.appendChild(desc);
    newBox.appendChild(image);
    newBox.appendChild(content);
    document.querySelector('.main').appendChild(newBox);

    model.style.display = 'none';
    nameInput.value = "";
    descInput.value = "";
    recipeInput.value = "";
})


/*Detailed view feature*/

const detailView = document.getElementById('detail-view');
const detailTitle = document.getElementById('detail-title');
const detailRecipe = document.getElementById('detail-recipe');
const mainContainer = document.querySelector('.main');

mainContainer.addEventListener('click', (e) => {
    // 1. Identify if a recipe box was clicked
    let clickedBox = e.target.closest('.recipe-box'); 
    
    if (clickedBox) {
        const recipeName = clickedBox.querySelector('.recipe-name').textContent;
        
        const recipeId = clickedBox.dataset.id;
        const data = recipeData[recipeId];
        
        const fullRecipeText = data.fullRecipe || "Full recipe details are currently unavailable for this item.";
        
        // 3. Inject content
        detailTitle.textContent = recipeName;
        detailRecipe.textContent = fullRecipeText;
        
        // 4. Show the view
        detailView.style.display = 'flex';
    }
});

detailView.addEventListener('click', (e) => {
    // Check if the element clicked (e.target) is the outer container itself.
    if (e.target === detailView) {
        detailView.style.display = 'none';
    }
});
