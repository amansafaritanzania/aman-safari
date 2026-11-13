function updatePrice(){

const prices={
Kilimanjaro:2495,
Serengeti:650,
Ngorongoro:450
};

let tour=document.getElementById("tour").value;
let people=document.getElementById("people").value;

people=Number(people);

if(!people){
document.getElementById("priceOutput").innerText="Select people";
return;
}

let total=prices[tour]*people;

document.getElementById("priceOutput").innerText="$"+total;
}

function bookNow(){

let tour=document.getElementById("tour").value;
let people=document.getElementById("people").value;

let msg=`Hi Aman Safari, I want to book ${tour} for ${people} people`;

window.open("https://wa.me/255699004685?text="+encodeURIComponent(msg));
}

/* CHAT */
function toggleChat(){
let box=document.getElementById("chatBox");
box.style.display = box.style.display==="block"?"none":"block";
}

function sendChat(){

let input=document.getElementById("chatInput");
let body=document.getElementById("chatBody");

if(!input.value) return;

body.innerHTML += "<div>You: "+input.value+"</div>";

body.innerHTML += "<div>Aman AI: Thanks! I will help you with that.</div>";

input.value="";
}
