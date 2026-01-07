document.getElementById("signup_info").addEventListener("submit", async e => {
  e.preventDefault();

  const email_id = document.getElementById("signup_email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const new_user = {
    email_id: email_id,
    username: username,
    password: password
  }

  checkDuplicate(email_id);

  try {
    const response = await fetch("/recipe-sharing/api/addCredentials.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(new_user)
    });
    let JS_response;
    try {
       JS_response = await response.json();
    } catch (jsonError) {
      const raw = await response.text();
      console.error("Invalid JSON:", raw);
      alert("Server error:\n" + raw);
      return;
    }

    if(JS_response.status === "success") {
      window.location.href = "/recipe-sharing/index.html"
    } else {
      alert("Error")
    }
  }catch(error) {
    console.error("Error:", error);
    alert("Something went wrong, please try again");
  }
})

async function checkDuplicate(emailId) {
  try {
    const verify_response = await fetch("/recipe-sharing/api/getCredentials.php",{
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body : JSON.stringify({
        "Email-ID" : emailId
      })
    });

    const data = verify_response.json();

    if (data.status == "Duplicate") {
      alert("This email-ID has already been registered. Please try with another one");
      window.location.href("/recipe-sharing/sign-up.js");
    } 
  } catch(error) {
    console.log("Error : " + error);
  }
}