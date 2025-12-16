# recipe-sharing
The reason it was created was due to odin project 
Now it is being driven due to this being my Web EL

# Learning points 
# CSS : 
1. changing the display from none to flex/block - this allows for pop ups to work 
2. box-shadow - offset-x offset-y blur-radius color
3. rgba - normal rgb + alpha which means the transparency 
4. transform - this changes the various characteristics of an element without affecting the layout. here the general translateY is used to move it in Y direction to give that 3d movement effect
5. z-index - this is predominantly used with fixed position which allows for overlapping of elements
6. 1vh - means 1% of the browser window
7. inset - makes the element pressed , it is used with box-shadow
8. white-space: pre-wrap preserves line breaks and spacing from text content while allowing wrapping
 
# HTML :
1. data-id - these are custom ids which can be changed accordingly and also accessed by the js code 
2. accept - it allows for only certain type of files and in our case it allows all image MIME types but this does not provide security which means i can put in any type file through various methods. So in hindsight this only makes the file picker to show only image MIME types

# JS
1. trim() - removes excess blank space
2. .replace() 
3. appendChild()
4. .dataset.id

# Apache 
- Web Server which listens in on the port 80 , php only works with apache
- Browser -> (HTTP request) -> Apache -> PHP script -> (SQL) -> MySQL

# PHP/JS or Backend 
1. In JS file we have a function called fetch so fetch is just like a command which says make a http request to the url given to it as the parameter 
2. in our url which getRecipes.php , the sql table is accessed and it is encoded to json test within the http response object which is the res variable in our code. Keep in mind it is just json text and not json file. 
- so then we convert res => res.json so now this json acts as an js object which is an array where each item in it corresponds to each row in our database. 
3. there is something called imageInput.files[0] so here files is a FileList Object which is related to the type="file" so here files refer to the files we have selected to upload from our computer. 
- this file object contains name, size, mime type, lastModified/timestamp.
4. FormData() - this is an object which has a set of key-value pairs sent in HTTP request body. This lives in the browser and only during the request and after the request finishes, it disappears. 
- Basically it acts as a transport mechanism between the client and server 
5. .fetch("api/addRecipe") so here we use the POST method to send FormData object to the sql and here in .addRecipe.php accesses this formdata object called data for all the values to be inputted back into the sql table.
- so this is used to send data from client to the server
6. so we use $ to declare variables in php and in the fetch function of getRecipes.php we have $conn ->query(%sql) so this means that $conn which is MySQLi Object represents a live connection to the mysql database, and query is the method to send the sql to the mysql
- use the database connection object to run this sql query
7. in a similar way as 6 we have addRecipe.php where we use the POST method to input any value from the client to the php and then we use the $conn->prepare to write the sql command using the php variables declared.

# MySQL 
-So this code was typed on phpmyadmin run through xampp 
- CREATE TABLE recipes (
-   id INT AUTO_INCREMENT PRIMARY KEY,
-   recipe_key VARCHAR(100) UNIQUE NOT NULL,
-   name VARCHAR(255) NOT NULL,
-   description TEXT NOT NULL,
-   full_recipe TEXT NOT NULL
- );
- here auto increment means literally it increases the value from 1 to how many ever recipes we put 
- text allows for 65000 char while varchar allows for 255 only 
- NOT NULL means it doesnt allow null values so some text must be written in it 
- UNIQUE means two rows cant have the same value for recipe_key
- PRIMARY KEY cannot be null , is unique , only one per table

# Integration Advice
- When using VS Code with WSL, Git integration and extensions must be installed separately inside the WSL environment. 
- Until this setup completes, Git status indicators may not appear even though the repository is valid.