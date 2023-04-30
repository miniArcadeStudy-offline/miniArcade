// 저장된 메모를 저장할 배열
//우선 memos라는 배열을 만들어서 저장된 메모들을 담기.
let memos = JSON.parse(localStorage.getItem("memos")); //로컬스토리지 사용
// 저장되어있는게 없으면 빈배열로
memos = memos ?? [];

// 저장된 메모를 화면에 보여주는 함수
// showMemos() 함수는 이 배열에 저장된 메모들을 화면에 보여주는 역할.
function showMemos() {
  // 메모 리스트 엘리먼트를 찾음
  // showMemos() 함수 내부에서는 memoList라는 ID 값을 가진 엘리먼트를 찾아내고, 이전에 보여준 메모를 지움.
  const memoList = document.getElementById("memoList");

  // 이전에 보여준 메모를 모두 지움
  memoList.innerHTML = "";

  // forEach() 메소드를 사용하여 배열 memos에 저장된 메모들마다 <li> 엘리먼트를 만들어 화면에 보여줌.
  // 이때 각각의 메모마다 내용과 삭제 버튼이 함께 나타나도록 구성함.
  // 각각의 메모마다 li 엘리먼트를 만들어 메모 내용과 삭제 버튼을 추가함.
  memos.forEach((memo, index) => {
    const li = document.createElement("li");
    const time = new Date(memo.timestamp).toLocaleString();
    const textNode = document.createTextNode(`${time}
${memo.text}`);
    const deleteButton = document.createElement("button");

    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", () => {
      memos.splice(index, 1);
      localStorage.setItem("memos", JSON.stringify(memos));
      //로컬스토리지에서도 삭제

      showMemos();
    });
    li.appendChild(textNode);
    li.appendChild(deleteButton);
    memoList.appendChild(li);
  });
}

// 저장 버튼을 눌렀을 때 실행되는 함수
// saveMemo() 함수는 사용자가 입력한 메모를 저장하는 역할을 함.
function saveMemo() {
  // 이 함수는 memo라는 ID 값을 가진 엘리먼트에서 사용자가 입력한 메모 내용을 가져옴.
  // 입력한 메모 내용을 가져옴
  const memoText = document.getElementById("memo").value;

  // 그리고 showMemos() 함수를 호출하여 메모를 화면에 보여주고, 입력한 메모 내용을 지움.

  if (!memoText) {
    // 만약 사용자가 아무런 내용을 입력하지 않았다면 저장하지 않음.
    return;
  }
  //그렇지 않다면, 현재 시간을 저장하고,
  // 현재 시간을 저장함
  const timestamp = Date.now();

  // 새로운 메모 객체를 생성하여 기존 메모(memos)배열에 추가함
  const newMemo = { text: memoText, timestamp };
  memos.unshift(newMemo);
  localStorage.setItem("memos", JSON.stringify(memos));
  //로컬스토리지에도 추가된 메모로 업데이트 해줌

  //저장되는 메모리스트 순서를 설정 array push() 배열 제일 뒤 / array unshift() 배열 제일 앞

  // 그리고 showMemos() 함수를 호출하여 메모를 화면에 보여줌
  showMemos();

  // 저장했으니 메모인풋의 입력한 메모 내용을 지움.
  document.getElementById("memo").value = "";
}
// 마지막으로 window.onload 이벤트가 발생할 때(페이지가 로드될 때) showMemos() 함수를 호출하여 저장된 메모들을 화면에 보여줌.
window.onload = showMemos;
