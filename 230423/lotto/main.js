const generateNumberArray = () => {
	const candidate = Array(45).fill().map((cur, i) => i + 1);
	return candidate;
}

const displayBall = (winNumbers, bonusNumber, timeGap) => {
	const $result = document.querySelector('#result');
	for (let i = 0; i < winNumbers.length; i++) {
		setTimeout(() => {
			const $ball = document.createElement('div');
			$ball.className = 'ball';
			$ball.textContent = winNumbers[i];
			$result.appendChild($ball);
		}, timeGap * (i + 1));
	}
	const $bonus = document.querySelector('#bonus');
	setTimeout(() => {
		const $ball = document.createElement('div');
		$ball.className = 'ball';
		$ball.textContent = bonusNumber[0];
		$bonus.appendChild($ball);
	}, timeGap * 7);
}

const start = () => {
	const candidate = generateNumberArray();
	const winNumbers = [];
	const bonusNumber = [];
	for (let i = 0; i < 7; i++) {
		const randomNumber = Math.floor(Math.random() * candidate.length);
		if (i == 6) bonusNumber.push(candidate[randomNumber]);
		else winNumbers.push(candidate[randomNumber]);
		candidate.splice(randomNumber, 1);
	}
	winNumbers.sort((a , b) => a - b);
	displayBall(winNumbers, bonusNumber, 1000);
}


start();