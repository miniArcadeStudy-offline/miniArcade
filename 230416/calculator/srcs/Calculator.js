import { Event } from './Event.js';

export class Calculator {
	constructor() {
		this.firstNumber = null;
		this.secondNumber = null;
		this.operator = null;
		this.result = null;
		this.initView();
		this.addEvent();
	}
	
	initView() {
		this.$view = document.querySelector('#result');
		this.$view.value = '0';
	}
	
	addEvent() {
		Event.addNumberEventListener(this.onClickNumber.bind(this));
		Event.addOperatorEventListener(this.onClickOperator.bind(this));
		Event.addCalculateEventListener(this.calculateResult.bind(this));
		Event.addClearEventListener(this.reset.bind(this));
	}
	
	onClickNumber(event) {
		const num = event.target.textContent; 
		if (this.operator) {
			this.secondNumber = (this.secondNumber ? this.secondNumber + num : num);
			this.$view.value = this.secondNumber;
		} else {
			this.firstNumber = (this.firstNumber ? this.firstNumber + num : num);
			this.$view.value = this.firstNumber;
		}
		// console.log('first: ', this.firstNumber);
		// console.log('second: ', this.secondNumber);

	}

	onClickOperator(event) {
		const inputOperator = event.target.textContent;
		this.operator = inputOperator;
		console.log('operator: ', this.operator);
	}

	calculate() {
		switch (this.operator) {
			case '+':
				this.result = parseInt(this.firstNumber) + parseInt(this.secondNumber);
				// this.result = eval(this.firstNumber + this.operator + this.secondNumber);
				// '3' '+' '5'
				break;
			case '-':
				this.result = parseInt(this.firstNumber) - parseInt(this.secondNumber);
				break;
			case 'x':
				this.result = parseInt(this.firstNumber) * parseInt(this.secondNumber);
				break;
			case '/':
				this.result = parseInt(this.firstNumber) / parseInt(this.secondNumber);
				break;
			default:
				break;
		}
	}

	reset() {
		this.firstNumber = null;
		this.secondNumber = null;
		this.operator = null;
		this.result = null;
		this.$view.value = '0';
	}
	
	keep() {
		this.firstNumber = this.result;
		this.operator = null;
		this.secondNumber = null;
	}

	calculateResult() {
		if (this.secondNumber) {
			this.calculate();
			this.showResult();
			this.keep();
		} else if (this.operator) {
			if (this.firstNumber) return ;
			this.result = this.firstNumber;
		} else {
			this.secondNumber = this.firstNumber;
			this.calculate();
			this.showResult();
			this.keep();
		}
		// console.log('result: ', this.result);
	}

	showResult() {
		this.$view.value = this.result;
	}
}
