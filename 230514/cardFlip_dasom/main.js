import Card from "./src/Card.js";
import CardGenerator from "./src/CardGenerator.js";

const colorArr = ['skyblue', 'antiquewhite', 'darkkhaki', 'salmon', 'cadetblue', 'mediumpurple'];

const init = () => {
	const $wrapper = document.querySelector('.wrapper');
	$wrapper.innerHTML = '';
}

const buttonEvent = () => {
	const $replay = document.querySelector('.replay');
	$replay.addEventListener('click', () => {
		init();
		start();
	});
}

const createCard = (cardArr) => {
	const $wrapper = document.querySelector('.wrapper');
	cardArr.forEach((curCard) => {
		const $card = document.createElement('div');
		$card.classList.add('card');
		$card.innerHTML = `
		<div class="card-inner">
			<div class="card-front"></div>
			<div class="card-back" style="background-color: ${curCard}"></div>
		</div>
		`
		$wrapper.appendChild($card);
	})
}

const start = () => {
	const card = new CardGenerator(colorArr);
	createCard(card.cardArr);
	const cardEvent = new Card();
	cardEvent.showCard();
}

buttonEvent();
start();