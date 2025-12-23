document.getElementById("signup_info").addEventListener("submit", async e => {
  e.preventDefault();

  const email_id = document.getElementById("signup_email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const new_user = {
    email_id : email_id,
    username : username,
    passsword : password
  }

  try {
    const response = await fetch("addCredentials.php",{
      method : "POST",
      header : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body : JSON.stringify(new_user)
    });

    const JS_response = await response.json()
    
    if(JS_response.isUserAdded) {
      window.location.href = "index.html"
    } 
  } catch(error) {
    console.error("Error:", error);
    alert("Something went wrong, please try again");
  }
})