export default class Card {
	constructor() {
		this.clicked = [];
		this.matchCount = 0;
		this.clickable = false;
		this.$cards = document.querySelectorAll('.card');
		this.addClickEvent();
	}

	showCard() {
		this.$cards.forEach((curCard, i) => {
			setTimeout(() => {
				curCard.classList.add('flipped');
			}, 1000 + 80 * i);
		});
	
		setTimeout(() => {
			this.$cards.forEach((card)=> {
				card.classList.remove('flipped');
			});
			this.clickable = true;
		}, 5000);
	}

	checkMatchCount() {
		if (this.matchCount === this.$cards.length / 2) {
			setTimeout(() => {
				alert('축하합니다! 모든 짝을 맞췄습니다');
			}, 800);
		}
	}
	
	isSame() {
		if (this.clicked.length !== 2) return ;
		const firstColor = this.clicked[0].querySelector('.card-back').style.backgroundColor;
		const secondColor = this.clicked[1].querySelector('.card-back').style.backgroundColor;
		if (firstColor == secondColor) {
			this.matchCount++;
			this.clicked = [];
			this.checkMatchCount();
		} else {
			setTimeout(() => {
				this.clicked.forEach((card) => {
					card.classList.toggle('flipped');
				})
				this.clicked = [];
			}, 700);
		}
	}

	onClick(card) {
		if (!this.clickable) return ;
		if (Array.prototype.includes.call(card.classList, 'flipped') 
				&& this.clicked[0] != card) return;
		card.classList.toggle('flipped');
		if (this.clicked[0] == card) {
			this.clicked = [];
			return ;
		}
		if (!this.clicked.length) {
			this.clicked.push(card);
		} else {
			this.clicked.push(card);
			this.isSame();
		}
	}

	addClickEvent() {
		this.$cards.forEach((card) => {
			card.addEventListener('click', this.onClick.bind(this, card));
		})
	}
}
