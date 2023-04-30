const addNoteBtn = document.querySelector(".add-note-btn");
const memoContainer = document.querySelector(".memo-container");
//메모를 저장할 배열  
let data = JSON.parse(localStorage.getItem("data")) || [];

//메모 색 설정 랜덤함수
function getRandomColor() {
  const colors = ["#FFBB3F", "#F6D55C", "#F5AB99", "#FEB47B"];
  return colors[Math.floor(Math.random() * colors.length)];
}

//메모 생성함수 
function createMemo(memoTextContent) {

  //DocumentFragment를 사용해서 DOM 이벤트를 한번에 업데이트(HTML 구조가 생성될 때마다 브라우저에 랜더링 되는 것을 막음으로써 성능 최적화 up)
  const fragment = new DocumentFragment();
  const memo = document.createElement("div");

  memo.className = "memo";
  memo.innerHTML = `
      <textarea class="memo-textContent">${memoTextContent}</textarea>
      <div class="add-remove-Btn"> 
        <button class="submit-btn" type="button">작성완료</button>
        <button class="delete-btn" type="button">삭제하기</button>
      </div>
      <div class="pin-collapse-Btn"> 
        <button class="pin-btn" type="button">&#128204;</button>
        <button class="collapse-btn" type="button">&#8595;</button>
      </div>
    `;
   
  //메모를 fragment 객체에 추가 
  fragment.appendChild(memo);
  //추가한 fragment를 다시 memoContainer에 추가 
  memoContainer.appendChild(fragment);
  memoContainer.classList.add("memo-container-change");

  
  let memoTextarea = memo.querySelector("textarea");
  //메모가 생성될 때 색 랜덤설정 
  const bgColor = getRandomColor();
  memo.style.backgroundColor = bgColor;
  memoTextarea.style.backgroundColor = bgColor;
  
  //메모 저장 함수
  function saveMemo() {
    //입력된 메모 내용을 가져온다. 
    const memoTextContent = memoTextarea.value.trim();
    //생성된 메모의 갯수를 childElementCount통해 구한 뒤 childCnt에 저장한다
    //childElementCount -> 자식요소의 개수를 구하는 프로퍼티
    const childCnt = memoContainer.childElementCount;
    if(memoTextContent) {
      if(childCnt === data.length){
        //현재 메모 개수와 메모 데이터 배열의 길이가 같다면, 가장 최근의 메모를 덮어쓰기
        data[childCnt-1] = memoTextContent;
        //그렇지 않다면, 메모 데이터 배열에 새로운 메모를 추가합니다.
      } else{
        data.push(memoTextContent);
      }
      //로컬스토리지에 매모 저장
      localStorage.setItem("data", JSON.stringify(data));
      alert("메모가 성공적으로 저장되었습니다!");
      //메모가 저장됐다면 작성완료-> 수정완료로 버튼 변경
      submitBtn.textContent = "수정하기";
      submitBtn.classList.replace("submit-btn", "modify-btn");
    } else {
      alert("메모를 작성해주세요!");
    }
  }



  //메모 삭제 함수
  function deleteMemo() {
    const confirmed = confirm("정말 메모를 삭제하시겠습니까?");
    //"예" 를 누르면 
    if (confirmed) {
      //innerhtml로 추가한 html요소 삭제 
      memo.remove();
      //삭제할 메모 텍스트 값에 접근
      const memoTextContent = memoTextarea.value.trim();
      //memoTextContent 가 해당되는 배열의 인덱스를 찾아서 index 변수에 할당 
      const index = data.indexOf(memoTextContent);
      //data 배열에 값이 존재하는 경우
      if (index !== -1) {
        //splice를 통해 index에 접근해서 하나를 제거 
        data.splice(index, 1);
        //삭제한 값을 반영하기 위해 다시 로컬스토리지에 저장
        localStorage.setItem("data", JSON.stringify(data));
      }
    }
  }

//작성완료버튼
  const submitBtn = memo.querySelector(".submit-btn");
  submitBtn.addEventListener("click", saveMemo);


//삭제버튼 
  const deleteBtn = memo.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteMemo);

  //메모 접기 버튼
  const collapseBtn = memo.querySelector(".collapse-btn");
  collapseBtn.addEventListener("click", () => {
    //만약 핀 고정상태가 아니라면 
    if (!memo.classList.contains("pinned")) {
      //collapsed에 display: none을 주고 toggle기능
      memo.classList.toggle("collapsed");
    }
  });

  //핀 고정기능 버튼
  const pinBtn = memo.querySelector(".pin-btn");
  pinBtn.addEventListener("click", () => {
    memo.classList.toggle("pinned");
    //핀 버튼 클릭시 pinned 클래스를 가진 메모는 화면 고정
    if (memo.classList.contains("pinned")) {
      alert("메모가 고정되었습니다!");
    } else {
      alert("메모 고정이 해제되었습니다!");
    }
  });

}

// 저장된 메모 데이터를 이용해서 초기화면에 렌더링하는 함수
function renderMemos() {
  //forEach로 저장된 데이터 배열을 순회하면서 화면에 메모 생성 
  data.forEach((memoTextContent) => {
    createMemo(memoTextContent);
  });
  
}


// 초기화면 렌더링
renderMemos();

//새로운 메모를 추가할 땐 빈 문자열로 생성하기 위한 이벤트 리스너
addNoteBtn.addEventListener("click", () => {
  createMemo("");
});



//값이 같을때  원하는 배열만 삭제할 수 있게 