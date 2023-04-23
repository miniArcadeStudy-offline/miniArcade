export const Event = {
	addNumberEventListener(onClickNumber) {
		const btnNums = document.querySelectorAll('button[class^="num-"]');
		console.log(btnNums);
		btnNums.forEach((cur) => {
			cur.addEventListener('click', onClickNumber);
		});
	},

	addOperatorEventListener(onClickOperator) {
		const operators = document.querySelectorAll('button[class^="operator-"]');
		operators.forEach((cur) => {
			cur.addEventListener('click', onClickOperator)
		});
	},

	addCalculateEventListener(calculateResult) {
		const calculate = document.querySelector('.calculate');
		calculate.addEventListener('click', calculateResult);
	},

	addClearEventListener(reset) {
		const clear = document.querySelector('.clear');
		clear.addEventListener('click', reset);
	},
}
