export default class CardGenerator {
	cardArr = [];

	constructor(colorArr) {
		this.colorArr = colorArr.concat(colorArr);
		this.shuffle();
	}

	get cardArr() {
		return this.cardArr;
	}

	shuffle() {
		for (let i = 0; this.colorArr.length > 0; i++) {[0 ,1, 2, 3]
			const idx = Math.floor(Math.random() * this.colorArr.length);
			this.cardArr.push(this.colorArr.splice(idx, 1)[0]);
		}
	}
}