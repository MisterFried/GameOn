//Open / Close navbar
function toggleNav() {
	document.querySelector("#header-navbar").classList.toggle("open");
	document.querySelector("#header-navbar").classList.toggle("close");
}

//Close navbar
function closeNav() {
	if (document.querySelector("#header-navbar.open")) {
		document.querySelector("#header-navbar").classList.remove("open");
		document.querySelector("#header-navbar").classList.add("close");
	}
}

//Close navbar (click outside)
const body = document.querySelector("body");
const navIcon = document.querySelector(".header-mobile-icon");
const navBar = document.querySelector(".header-navbar");
body.addEventListener("click", closeNav);
//Stop event propagation to prevent the navbar from closing itself when clicking inside
navIcon.addEventListener("click", (e) => e.stopPropagation());
navBar.addEventListener("click", (e) => e.stopPropagation());
