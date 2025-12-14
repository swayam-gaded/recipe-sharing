const addBtn = document.getElementById("add-button");
const model = document.getElementById("model-box");
const submitBtn = document.getElementById("addNewRecipe");
const cancelBtn = document.getElementById("closeModel");
const nameInput = document.getElementById("nameInput");
const descInput = document.getElementById("descInput");

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
    if(newRecipeDesc == "" || newRecipeName == "") {
        alert("Fill both the fields");
        return;
    }

    const newBox = document.createElement('div');
    newBox.classList.add('recipe-box');

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
    const desc = document.createElement('div');
    desc.textContent = newRecipeDesc;

    content.appendChild(name);
    content.appendChild(desc);
    newBox.appendChild(image);
    newBox.appendChild(content);
    document.querySelector('.main').appendChild(newBox);

    model.style.display = 'none';
    nameInput.value = "";
    descInput.value = "";
})

