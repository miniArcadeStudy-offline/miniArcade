# 2048 게임

- 이탈리아의 웹 개발자 가브리엘레 치룰리가 만든 게임
- 원작 주소: https://github.com/gabrielecirulli/2048
- 다양한 변형 버전모음: http://allthe2048.com/

---

## 코드 설명

</br>

함수

- startGame(): 게임을 시작하기 전, createDocumentFragment로 4X4 테이블을 만드는데 필요한 태그를 추가한 뒤, table 자체를 append하는 함수. 뒤이어 put2ToRandomCell(), draw() 실행한다.
- put2ToRandomCell(): 빈칸을 찾아서 랜덤으로 빈칸 중 하나의 칸을 선택해서 2를 넣어주는 함수
- draw(): 반복문으로 각 칸에 텍스트, 클래스를 부여하는 함수
- moveCells(): 값이 있는 칸을을 한쪽 방향으로 정렬하고, 같은 숫자가 나오는 칸이 있다면 숫자를 더해주는 함수

이벤트 리스너

- 키보드 이벤트: 방향키(상, 하, 좌, 우)를 눌렀을 때(keyup), moveCells()를 실행한다.
- 마우스 이벤트: 마우스를 누르고 뗐을때의 좌표를 계산하여 상,하,좌,우를 판단하여, moveCells()를 실행한다.
- 다시시작 버튼에 클릭 이벤트: 데이터, 화면을 초기화하고 startGame()을 실행한다.
