

"use strict";
////////////////////////DECLARATION DES VARIABLES/////////////////////////

var fairy, speed, num_class, current_step, zone_safe, safe;
var listZoneAction, currentAction;

/////////////AFFECTATION DE VALEURS AUX VARIABLES/////////////////////////

num_class=1;
speed =10;
current_step =0;
safe = document.querySelector('#safe');
fairy = document.querySelector('#fairy');
zone_safe = document.querySelector('#zone_safe');
listZoneAction = document.querySelectorAll('[data-zone_action]');
currentAction = false;

///////////////////////////////FONCTIONS//////////////////////////////////
$(function(){
	// on cache la div associée à la bonne réponse
	$('#win, #loose, #question1').hide();

// Permet un changement d'inmage pour donner l'illusion que le personnage vole
// on prend un modulo 5 pour que cela soit fluide
function fairyClass() {
	current_step++;
	if (current_step%5==0)
	{
		num_class++;
		if (num_class>=7) 
		{
			num_class=4;
		}
		fairy.className='';
		fairy.classList.add('face_'+num_class);
	}
}
// position initiale du perso
function InitialPosition(){
	fairy.className='';
	fairy.classList.add('face_1');
}

function test_1 (){
	safe.className='';
	safe.classList.add('safe_2');
}
function test_1_out (){
	safe.className='';
	safe.classList.add('safe_1');
}
/*zone d'action quand le perso s'approche du coffre :
On regarde d'abord si le la div contenant le perso est dans la div du coffre. Si c'est le cas, on déclenche le prompt, sinon il ne se passe rien*/
function zoneAction()
{
	for (var i =0; i < listZoneAction.length; i++)
	{
		if (
			(fairy.offsetTop >= listZoneAction[i].offsetTop)
			&& 
			(fairy.offsetTop+fairy.offsetHeight <= listZoneAction[i].offsetTop+listZoneAction[i].offsetHeight)
			&&
			(fairy.offsetLeft >= listZoneAction[i].offsetLeft)
			&& 
			(fairy.offsetLeft+fairy.offsetWidth <= listZoneAction[i].offsetLeft+listZoneAction[i].offsetWidth)
		)
		{
			if (currentAction) return;

			var result = parseInt(prompt("En quelle année Ada Lovelace, pionnière de la science informatique a décrit la machine analytique dont les principaux concepts sont à l’origine des machines informatiques ? 1842, 1924, 1967"));
			//$('#win, #loose, #question1').show();
			if (result==1842) {
				$('#win').show();
			}else{
				document.location.href="game_over.html"
			}
			currentAction = true;
			eval(listZoneAction[i].getAttribute('data-zone_action')+'()');
		}else {
			currentAction = false;
			if( listZoneAction[i].getAttribute('data-zone_action_out')) {
				eval(listZoneAction[i].getAttribute('data-zone_action_out')+'()');
				$('#win, #loose, #question1').hide();
			}
		}
	}
}

/////////////////////////// CODE PRINCIPAL ///////////////////////////////
//on place un écouteur d'event sur les touches du clavier

document.addEventListener('keyup',function(event){

	switch(event.keyCode){
		case 39 :
			InitialPosition()
		break;
		case 37 :
			InitialPosition()
			fairy.classList.add('turnAround');
		break;
		case 38 :
			InitialPosition()
		break;
		case 40 :
			InitialPosition()
		break;
		case 32 :
			InitialPosition()
		break;
	}
});
document.addEventListener('keydown',function(event){

	zoneAction(); 
	switch(event.keyCode){
		case 39 :
			fairyClass();
			fairy.style.left = (parseInt(fairy.offsetLeft)+speed)+"px";
		break;
		case 37 :
			fairyClass();
			fairy.classList.add('turnAround');
			fairy.style.left = (parseInt(fairy.offsetLeft)-speed)+"px";
		break;
		case 38 :
			fairyClass();
			fairy.style.top= (parseInt(fairy.offsetTop)-speed)+"px";
		break;
		case 40 :
			fairyClass();
			fairy.style.top= (parseInt(fairy.offsetTop)+speed)+"px";
		break;
	}
});
});