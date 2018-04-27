var VseSLikeZaSkos = new Array();
var source;
function dragStarted(evt){
	if(evt.target.tagName == "FIGURE")
	{
		source=evt.target;
		evt.dataTransfer.setData("text/plain", evt.target.innerHTML);
		evt.dataTransfer.effectAllowed = "move";
	}else
	{
		source=evt.target.parentNode;
		evt.dataTransfer.setData("text/plain", evt.target.parentNode.innerHTML);
		evt.dataTransfer.effectAllowed = "move";
	}

}
function draggingOver(evt){
	evt.preventDefault();
	evt.dataTransfer.dropEffect = "move";
	}

function dropped(evt){
	if(evt.target.tagName == "FIGURE")
	{
		evt.preventDefault();
		evt.stopPropagation();
		var zacetek = source.children[1].alt;
		var konec = evt.target.children[1].alt;
		source.innerHTML = evt.target.innerHTML;
		evt.target.innerHTML = evt.dataTransfer.getData("text/plain");
		source.children[1].alt = zacetek;
		evt.target.children[1].alt = konec;
	}else
	{
		evt.preventDefault();
		evt.stopPropagation();
		var zacetek = source.children[1].alt;
		var konec = evt.target.parentNode.children[1].alt;
		var tarca = evt.target.parentNode;
		source.innerHTML = tarca.innerHTML;
		tarca.innerHTML = evt.dataTransfer.getData("text/plain");
		source.children[1].alt = zacetek;
		tarca.children[1].alt = konec;
	}

}

function zgenerirajGalerijo(evt)
{
	if(evt.target.className === "brisi")
	{
		return;
	}
	var stevilkaSlike = evt.currentTarget.children[2].alt;
	var els = document.getElementsByClassName("slika");
	var vseSlike = new Array(els.length);
	for(var i= 0;i<els.length;i++)
	{
		var zvezda = els[i].children[0];
		var slika = els[i].children[2];
		var opis = els[i].children[3].innerHTML;
		vseSlike[i] = [zvezda,slika,opis];
	}
	
	var vseSlikeStev = vseSlike.length;
	for(i = 0;i<vseSlike.length;i++)
	{
		var div = document.createElement("div");
		document.getElementsByClassName("modal-content")[0].appendChild(div);
		div.className ="mySlides";
		var divStev = document.createElement("div");
		divStev.className = "numbertext";
		var zvezdica = document.createElement("span");
		zvezdica.className = "zvezdicaG";
		zvezdica.style.color = vseSlike[i][0].style.color;
		zvezdica.innerHTML ="&#9733;";
		zvezdica.setAttribute("onclick","zamenjanFavorite()");
		div.appendChild(zvezdica);
		var katerastev = i+1;
		katerastev = katerastev+"/"+vseSlikeStev;
		divStev.innerHTML=katerastev;
		div.appendChild(divStev);
		var slikaN = document.createElement("img");
		slikaN.src = vseSlike[i][1].src;
		slikaN.style.width = "100%";
		slikaN.style.height = vseSlike[i][1].height;
		slikaN.alt = vseSlike[i][1].alt;
		div.appendChild(divStev);
		div.appendChild(slikaN);
	}
	var puscicaL = document.createElement("a");
	puscicaL.className ="prev";
	puscicaL.onclick = function() {plusSlides(-1);};
	puscicaL.innerHTML = "&#10094;";
	var puscicaD = document.createElement("a");
	puscicaD.className ="next";
	puscicaD.onclick = function() {plusSlides(1);};
	puscicaD.innerHTML = "&#10095;";
	document.getElementsByClassName("modal-content")[0].appendChild(puscicaL);
	document.getElementsByClassName("modal-content")[0].appendChild(puscicaD);
	
	var captionD = document.createElement("div");
	captionD.className = "caption-container";
	var captionP = document.createElement("p");
	captionP.id = "caption";
	
	document.getElementsByClassName("modal-content")[0].appendChild(captionD);
	captionD.appendChild(captionP);
	var gumb = document.createElement("button");
	gumb.innerHTML = "Uredi opis";
	gumb.setAttribute("onClick","urediOpis()");
	captionD.appendChild(gumb);
	
	for(i = 0;i<vseSlike.length;i++)
	{
		var divColl = document.createElement("div");
		divColl.className = "column";
		document.getElementsByClassName("modal-content")[0].appendChild(divColl);
		var slikaColl = document.createElement("img");
		slikaColl.src = vseSlike[i][1].src;
		slikaColl.style.width = "100%";
		slikaColl.className = "demo cursor";
		slikaColl.setAttribute("onclick","currentSlide("+parseInt(i+1)+")");
		slikaColl.alt = vseSlike[i][2];
		divColl.appendChild(slikaColl);
	}
	openModal();
	currentSlide(parseInt(stevilkaSlike));
}

function openModal() {
  document.getElementById('myModal').style.display = "block";
}

function closeModal() {
	obnovitevGalerije();
	document.getElementById('myModal').style.display = "none";
	document.getElementsByClassName("modal-content")[0].innerHTML = "";
}

var slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

function obnovitevGalerije()
{
	var slides = document.getElementsByClassName("mySlides");
	var columns = document.getElementsByClassName("column");
	document.getElementsByClassName("galerija")[0].innerHTML = "";
	var div = document.getElementsByClassName("galerija")[0];
	for(var i = 0; i< slides.length;i++)
		{
			var figura = document.createElement("figure");
			figura.className = "slika";
			figura.setAttribute("draggable",true);
			figura.setAttribute("ondragstart","dragStarted(event)");
			figura.setAttribute("ondragover","draggingOver(event)");
			figura.setAttribute("ondrop","dropped(event)");
			figura.setAttribute("onClick","zgenerirajGalerijo(event)");
			div.appendChild(figura);
			var zvezdica = document.createElement("span");
			zvezdica.className = "zvezda";
			zvezdica.style.color = slides[i].children[0].style.color;
			zvezdica.innerHTML ="&#9733;";
			figura.appendChild(zvezdica);
			var izbris = document.createElement("span");
			izbris.className = "brisi";
			izbris.innerHTML ="&#xd7;";
			izbris.setAttribute("onClick","brisiSliko(event)");
			figura.appendChild(izbris);
			var slika = document.createElement("img");
			slika.src = slides[i].children[2].src;
			slika.alt = slides[i].children[2].alt;
			slika.style.width = "90%";
			slika.style.height = "auto";
			figura.appendChild(slika);
			var caption = document.createElement("figcaption");
			caption.innerHTML = columns[i].children[0].alt;
			figura.appendChild(caption);
		}
	napolniTab()	
}

function zamenjanFavorite()
{
	var slides = document.getElementsByClassName("mySlides");
	var spremenu = false;
	if(!spremenu && slides[slideIndex-1].children[0].style.color === "yellow")
	{
		slides[slideIndex-1].children[0].style.color = "black";
		spremenu = true;
	}
	if(!spremenu && slides[slideIndex-1].children[0].style.color === "black")
	{
		slides[slideIndex-1].children[0].style.color = "yellow";
		spremenu = true;
	}
}

function urediOpis()
{
	var caption = document.getElementById("caption");
	caption.innerHTML = "";
	var vnos = document.createElement("input");
	var columns = document.getElementsByClassName("column");
	vnos.setAttribute("onkeypress","ShraniOpisKey(event)");
	vnos.value = columns[slideIndex-1].children[0].alt;
	caption.appendChild(vnos);
	vnos.focus();
	var gumb = document.createElement("button");
	gumb.innerHTML = "Shrani opis";
	gumb.setAttribute("onClick","ShraniOpis()");
	caption.appendChild(gumb);
}

function ShraniOpisKey (e)
{
	if(e.keyCode == 13)
		{
			ShraniOpis();
		}
}

function ShraniOpis ()
{
	var sprememba = document.getElementById("caption").children[0].value;
	var columns = document.getElementsByClassName("column");
	columns[slideIndex-1].children[0].alt = sprememba;
	currentSlide(slideIndex);
}

function pokaziSZvezdico()
{
	var zvezdica = document.getElementsByClassName("zvezdaIskanje");
	var prvic = true;
	if(prvic && zvezdica[0].style.color === "yellow")
	{
		zvezdica[0].style.color = "black";
		prvic = false;
		napolniGalerijoIzTab(VseSLikeZaSkos);
	}
	if(prvic && zvezdica[0].style.color === "black")
	{
		zvezdica[0].style.color = "yellow";
		prvic = false;
		var vseSlike = new Array();
		for(var i= 0;i<VseSLikeZaSkos.length;i++)
		{
			if(VseSLikeZaSkos[i][0])
			{
				vseSlike.push(VseSLikeZaSkos[i]);
			}
		}
		napolniGalerijoIzTab(vseSlike);
	}
}

function prikaziSOpisom()
{
	var tekst = document.getElementsByClassName("isci")[0].value.trim();
	if(tekst != "")
	{
		var vseSlike = new Array();
		for(var i= 0;i<VseSLikeZaSkos.length;i++)
		{
			if(VseSLikeZaSkos[i][2].includes(tekst))
			{
				vseSlike.push(VseSLikeZaSkos[i]);
			}
		}
		napolniGalerijoIzTab(vseSlike);
	}else
	{
		napolniGalerijoIzTab(VseSLikeZaSkos);
	}
}

function napolniTab()
{
	var els = document.getElementsByClassName("slika");
	VseSLikeZaSkos = new Array(els.length);
	for(var i= 0;i<els.length;i++)
	{
		var zvezda = false;
		if(els[i].children[0].style.color === "yellow")
		{
			zvezda = true;
		}
		var slika = els[i].children[2].src;
		var opis = els[i].children[3].innerHTML;
		VseSLikeZaSkos[i] = [zvezda,slika,opis];
	}
	sessionStorage.VseSlike = JSON.stringify(VseSLikeZaSkos);
}

function napolniGalerijoIzTab(tab)
{
	document.getElementsByClassName("galerija")[0].innerHTML = "";
	var div = document.getElementsByClassName("galerija")[0];
	for(var i = 0; i< tab.length;i++)
	{
		var figura = document.createElement("figure");
		figura.className = "slika";
		figura.setAttribute("draggable",true);
		figura.setAttribute("ondragstart","dragStarted(event)");
		figura.setAttribute("ondragover","draggingOver(event)");
		figura.setAttribute("ondrop","dropped(event)");
		figura.setAttribute("onClick","zgenerirajGalerijo(event)");
		div.appendChild(figura);
		var zvezdica = document.createElement("span");
		zvezdica.className = "zvezda";
		if(tab[i][0])
		{
			zvezdica.style.color = "yellow";
		}else
		{
			zvezdica.style.color = "black";
		}
		zvezdica.innerHTML ="&#9733;";
		figura.appendChild(zvezdica);
		var izbris = document.createElement("span");
		izbris.className = "brisi";
		izbris.innerHTML ="&#xd7;";
		izbris.setAttribute("onClick","brisiSliko(event)");
		figura.appendChild(izbris);
		var slika = document.createElement("img");
		slika.src = tab[i][1];
		slika.alt = parseInt(i+1);
		slika.style.width = "90%";
		slika.style.height = "auto";
		figura.appendChild(slika);
		var caption = document.createElement("figcaption");
		caption.innerHTML = tab[i][2];
		figura.appendChild(caption);
	}
}

var input;
function pridobiSliko()
{
	input = document.createElement("input");
	input.setAttribute("type","file");
	input.setAttribute("multiple","multiple");
	input.setAttribute("onchange","zapolniSeznam()");
	input.click();	
}
	
function zapolniSeznam()
{
	var slike = new Array();
	slike = input.files;
	for(var i = 0;i<slike.length;i++)
	{
		var zvezda = false;
		var slika = "Slike/"+slike[i].name;
		var opis = "";
		VseSLikeZaSkos.push([zvezda,slika,opis]);
	}
	sessionStorage.VseSlike = JSON.stringify(VseSLikeZaSkos);
	napolniGalerijoIzTab(VseSLikeZaSkos);
}

function brisiSliko(evt)
{
	var stSlike = evt.target.parentNode.children[2].alt;
	VseSLikeZaSkos.splice(parseInt(stSlike-1),1);
	sessionStorage.VseSlike = JSON.stringify(VseSLikeZaSkos);
	napolniGalerijoIzTab(VseSLikeZaSkos);
}

jQuery(function($){
	$(document).ready(function(){
		if(!sessionStorage.VseSlike)
		{
			sessionStorage.VseSlike = JSON.stringify(VseSLikeZaSkos);
		}else
		{
			VseSLikeZaSkos = JSON.parse(sessionStorage.VseSlike);
			napolniGalerijoIzTab(VseSLikeZaSkos);
		}
	});
});
