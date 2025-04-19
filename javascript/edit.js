// 페이지 로드시 실행
window.onload = () => {
    // 쿼리스트링으로 일기번호 받기
    const 쿼리스트링 = location.search;
    const 잘게나눔 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나눔.get('number');

    // 로컬스토리지에서 일기목록 가져오기
    const 일기담는통 = localStorage.getItem('일기목록');
    const 일기목록 = JSON.parse(일기담는통 === null ? [] : 일기담는통);

    // 일기 제목, 내용 HTML 그리기
    document.getElementById('HTML_수정_제목').innerHTML = `
        <input id="HTML_수정_제목입력" type="text" class="CSS_수정_제목입력" value="${일기목록[일기번호].제목}" />
    `;
    document.getElementById('HTML_수정_내용').innerHTML = `
        <textarea id="HTML_수정_내용입력" class="CSS_수정_내용입력">${일기목록[일기번호].내용}</textarea>
    `;

    // 회고 HTML 그리기
    JS_회고그리기();
};

// 일기 수정기능
const JS_일기수정 = () => {
    // 쿼리스트링으로 일기번호 받기
    const 쿼리스트링 = location.search;
    const 잘게나눔 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나눔.get('number');

    // 수정한 일기 기분 가져오기
    const 기분라디오버튼 = document.querySelectorAll("input[name='HTML_기분']");
    let 일기기분 = '';
    기분라디오버튼.forEach((index) => {
        if (index.checked) {
            일기기분 = index.value;
        }
    });

    // 일기 수정일 불러오기
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = today.getDate();
    const 수정일 = `${year}. ${month}. ${date}`;

    // 로컬스토리지에서 일기목록 가져오기
    const 스토리지일기목록 = window.localStorage.getItem('일기목록') ?? [];
    const 일기목록 = JSON.parse(스토리지일기목록);

    // 일기 수정
    일기목록[일기번호] = {
        제목: document.getElementById('HTML_수정_제목입력').value,
        내용: document.getElementById('HTML_수정_내용입력').value,
        기분: 일기기분,
        날짜: 수정일,
        회고: 일기목록[일기번호].회고,
    };

    // 일기목록 갱신, 상세페이지로 이동
    window.localStorage.setItem('일기목록', JSON.stringify(일기목록));
    window.location.href = `./detail.html?number=${일기번호}`;
};

// 일기 수정 취소기능
const JS_취소기능 = () => {
    // 쿼리스트링으로 일기번호 받기
    const 쿼리스트링 = location.search;
    const 잘게나눔 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나눔.get('number');

    // 상세페이지로 이동
    window.location.href = `./detail.html?number=${일기번호}`;
};

// 회고 그리기 기능
const JS_회고그리기 = () => {
    // 쿼리스트링으로 일기번호 받기
    const 쿼리스트링 = location.search;
    const 잘게나눔 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나눔.get('number');

    // 로컬스토리지에서 일기목록 가져오기
    const 스토리지일기목록 = window.localStorage.getItem('일기목록') ?? [];
    const 일기목록 = JSON.parse(스토리지일기목록);

    // 회고 HTML 작성 (첫 인덱스가 아니면 div라인 추가)
    let HTML_회고 = '';
    HTML_회고 = 일기목록[일기번호].회고
        .map(
            (el, index) =>
                `${index !== 0 ? `<div class="CSS_회고_div"></div>` : ''}
                <div class="CSS_회고_댓글">
                    <div class="CSS_회고_댓글내용">
                        ${el.내용}
                    </div>
                    <div class="CSS_회고_댓글작성일">
                        ${el.날짜}
                    </div>
                </div>
        `
        )
        .join('');

    // 회고 HTML 그리기
    document.getElementById('HTML_회고').innerHTML = HTML_회고;
};
