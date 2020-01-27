
let element = document.getElementById("first-button");

function turnButtonRed (){
    element.style.backgroundColor = "red";
    element.style.color = "white";
    element.innerHTML = "Red Button"; 
}

element.onclick = turnButtonRed;

console.log("Hello!", element)
/*element.addEventListener('click', (event) => {
            event.target.style.background = 'pink';    
})*/