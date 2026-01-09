document.getElementById("login_info").addEventListener("submit", async e => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const user = {
    username : username,
    password : password
  }

  try {
    const response = await fetch("/recipe-sharing/api/verifyCredentials.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    if (data.status === "success") {
      console.log("success");
      window.location.href = "index.html";
    } else {
      alert("Invalid Login Credentials, please try again");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  }
});