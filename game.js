var timerId = null; //variavel para armazenar a cahamado da funcao timeout

function startGame(){

	var url = window.location.search;
	var nivel_game = url.replace("?", "");
	alert(nivel_game);
	
	//facil -> 2 minutos
	if (nivel_game == 1) {
		time_seconds = 120;
	}
	//normal -> 1 minuto
	if (nivel_game == 2) {
		time_seconds = 60;
	}
	//dificil -> 30 segundos
	if (nivel_game == 3) {
		time_seconds = 30;
	}	
	
	//colocando os segundos no span

	document.getElementById('cronometro').innerHTML = time_seconds;	

	var qtde_baloes = 30;

	cria_baloes(qtde_baloes);

	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	countTime(time_seconds)
}

function countTime(seconds){
	seconds = seconds - 1;

	if (seconds == -1) {
		clearTimeout(timerId);
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = seconds;
	timerId = setTimeout("countTime("+seconds+")", 1000);

}
function game_over(){
	remove_evento();
	alert('Fim de jogo');
}

function cria_baloes(qtde_baloes){

	for(var i = 1; i<= qtde_baloes; i++){
		var balao = document.createElement('img');
		balao.src = 'imagens/balao_azul_pequeno.png'
		balao.style.margin = '10px';
		balao.id = 'b' +i;
		balao.onclick = function(){estourar(this);}

		document.getElementById('cenario').appendChild(balao);
		
	}


}

function estourar(e){

	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick","");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png'

	pontuacao(-1);
}

function remove_evento(){
	var i = 1;

	while(document.getElementById('b'+i)){
		document.getElementById('b'+i).onclick = '';
		i++;		
	}
}

function pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros'). innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros, baloes_estourados);

}
function situacao_jogo(baloes_inteiros, baloes_estourados){
	if(baloes_inteiros == 0){
		alert('WIN!');
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}