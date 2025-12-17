const recipeData = {};

/* Rating system function*/
function createStars(rating, recipeKey) {
    let starsHTML = "";

    for (let i = 1; i <= 5; i++) {
        let filled = i <= Math.round(rating) ? "filled" : "";
        starsHTML += `
            <span class="star ${filled}"
                  data-value="${i}"
                  data-id="${recipeKey}">
                ★
            </span>
        `;
    }

    return starsHTML;
}

fetch("api/getRecipes.php")
    .then(res => res.json())
    .then(recipes => {
        recipes.forEach(r => {
            recipeData[r.recipe_key] = {
                fullRecipe: r.full_recipe
            };

            const box = document.createElement("div");
            box.classList.add("recipe-box");
            box.dataset.id = r.recipe_key;

            box.innerHTML = `
                <div class="image">
                    <img src="img/${r.image_path}" alt="${r.name}">
                </div>
                <div class="recipe-content">
                    <div class="recipe-name">${r.name}</div>
                    <div class="recipe-desc">${r.description}</div>
                     <div class="rating">
                        ${createStars(r.rating_avg, r.recipe_key)}
                    </div>
                </div>
            `;

            document.querySelector(".main").appendChild(box);
        });
    });
const imageInput = document.getElementById("imageInput");
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
    const imageFile = imageInput.files[0];

    if (!newRecipeName || !newRecipeDesc || !newFullRecipe) {
        alert("Fill all fields");
        return;
    }

    const recipeKey = newRecipeName
        .toLowerCase()
        .replace(/\s+/g, '');

    const formData = new FormData();
    formData.append("recipe_key", recipeKey);
    formData.append("name", newRecipeName);
    formData.append("description", newRecipeDesc);
    formData.append("full_recipe", newFullRecipe);

    if (imageFile) {
        formData.append("image", imageFile);
    }

    fetch("api/addRecipe.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            model.style.display = "none";
            nameInput.value = "";
            descInput.value = "";
            recipeInput.value = "";
            imageInput.value = "";

            location.reload();
        } else {
            alert(data.message);
        }
    })
    .catch(err => console.error(err));
});


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
        detailTitle.textContent = recipeName;
        detailRecipe.textContent = recipeData[recipeId].fullRecipe;
        
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

/*Rating system logic*/
document.querySelector(".main").addEventListener("click", (e) => {
    if (e.target.classList.contains("star")) {
        const rating = e.target.dataset.value;
        const recipeKey = e.target.dataset.id;

        fetch("api/rateRecipe.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                recipe_key: recipeKey,
                rating: rating
            })
        })
        .then(res => res.json())
        .then(() => {
            location.reload();
        });
    }
});
