

// Initialize Firebase

const handleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user.email)
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });      
}

console.log(firebaseApiKey)
// let element = document.getElementById("first-button");

// function turnButtonRed (){
//     element.style.backgroundColor = "red";
//     element.style.color = "white";
//     element.innerHTML = "Red Button"; 
// }

// element.onclick = turnButtonRed;

// console.log("Hello!", element)
/*element.addEventListener('click', (event) => {
            event.target.style.background = 'pink';    
})*/
