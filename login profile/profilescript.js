function togglePopup(){
  const urlParams = new URLSearchParams(window.location.search);
  if(urlParams.get("logined")==='true'){
    const img = urlParams.get('image');
    // Toggle the profile popup
    
      const popup = document.getElementById("profile-popup");
      popup.style.display = popup.style.display === "block" ? "none" : "block";
    
    document.getElementById("login-btn").textContent='Dashboard';
    // Add event listeners for Login and Sign Up buttons
    document.getElementById("login-btn").addEventListener("click", () => {
    
      // Add your login page redirection logic here
      window.location.href = `community.html?image=${img}`;
// Example redirection
    });
    document.getElementById('quiz').href='quiz1/quiz.html'
    document.getElementById("signup-btn").textContent='LogOut'
    document.getElementById("signup-btn").addEventListener("click", () => {
    
      // Add your sign-up page redirection logic here
      window.location.href = "logout.php"; // Example redirection
    });
  }else{
    document.getElementById('quiz').href='login.html'
    const popup = document.getElementById("profile-popup");
    popup.style.display = popup.style.display === "block" ? "none" : "block";
    document.getElementById("login-btn").textContent='Login';
    // Add event listeners for Login and Sign Up buttons
    document.getElementById("login-btn").addEventListener("click", () => {
    
      // Add your login page redirection logic here
      window.location.href = "login.html"; // Example redirection
    });
    
    document.getElementById("signup-btn").textContent='SignUp'
    document.getElementById("signup-btn").addEventListener("click", () => {
    
      // Add your sign-up page redirection logic here
      window.location.href = "register.html"; // Example redirection
    });
  } 

}