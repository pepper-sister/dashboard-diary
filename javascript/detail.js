// 페이지 로드시 실행
window.onload = () => {
    // 쿼리스트링으로 일기번호 받기
    const 쿼리스트링 = location.search;
    const 잘게나눔 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나눔.get('number');

    // 로컬스토리지에서 일기목록 가져오기
    const 일기담는통 = localStorage.getItem('일기목록');
    const 일기목록 = JSON.parse(일기담는통 === null ? [] : 일기담는통);

    // 일기 제목, 기분이미지, 기분, 날짜, 내용 HTML 그리기
    document.getElementById('HTML_상세_제목').innerText =
        일기목록[일기번호].제목;
    document.getElementById('HTML_상세_이미지').innerHTML = `
        ${
            일기목록[일기번호].기분 === '행복'
                ? `<img src="./assets/images/joy-imoji.png" class="CSS_상세_이미지" alt="행복" />`
                : ''
        }
        ${
            일기목록[일기번호].기분 === '슬픔'
                ? `<img src="./assets/images/sadness-imoji.png" class="CSS_상세_이미지" alt="슬픔" />`
                : ''
        }
        ${
            일기목록[일기번호].기분 === '놀람'
                ? `<img src="./assets/images/surprised-imoji.png" class="CSS_상세_이미지" alt="놀람" />`
                : ''
        }
        ${
            일기목록[일기번호].기분 === '화남'
                ? `<img src="./assets/images/anger-imoji.png" class="CSS_상세_이미지" alt="화남" />`
                : ''
        }
        ${
            일기목록[일기번호].기분 === '기타'
                ? `<img src="./assets/images/idontknownothing-imoji.png" class="CSS_상세_이미지" alt="기타" />`
                : ''
        }
    `;
    document.getElementById('HTML_상세_기분').innerHTML = `
    ${
        일기목록[일기번호].기분 === '행복'
            ? `<div class="CSS_행복">행복해요</div>`
            : ''
    }
    ${
        일기목록[일기번호].기분 === '슬픔'
            ? `<div class="CSS_슬픔">슬퍼요</div>`
            : ''
    }
    ${
        일기목록[일기번호].기분 === '놀람'
            ? `<div class="CSS_놀람">놀랐어요</div>`
            : ''
    }
    ${
        일기목록[일기번호].기분 === '화남'
            ? `<div class="CSS_화남">화나요</div>`
            : ''
    }
    ${
        일기목록[일기번호].기분 === '기타'
            ? `<div class="CSS_기타">기타</div>`
            : ''
    }
    `;
    document.getElementById('HTML_상세_날짜').innerText =
        일기목록[일기번호].날짜;
    document.getElementById('HTML_상세_내용').innerText =
        일기목록[일기번호].내용;

    // 회고 HTML 그리기
    JS_회고그리기();

    // 회고영역으로 부드럽게 스크롤
    const 회고영역 = document.getElementById('HTML_회고영역');
    if (회고영역) {
        회고영역.scrollIntoView({ behavior: 'smooth' });
    }
};

// 일기 수정하러가는 기능
const JS_일기수정하러가기 = () => {
    // 쿼리스트링으로 일기번호 받기
    const 쿼리스트링 = location.search;
    const 잘게나눔 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나눔.get('number');

    // 수정페이지로 이동
    window.location.href = `./edit.html?number=${일기번호}`;
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

// 회고 입력 기능
const JS_회고입력 = () => {
    // 쿼리스트링으로 일기번호 받기
    const 쿼리스트링 = location.search;
    const 잘게나눔 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나눔.get('number');

    // 입력된 회고 내용 가져오기
    const 회고내용 = document.getElementById('HTML_회고_인풋창').value;

    // 회고 입력일 불러오기
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = today.getDate();
    const 회고날짜 = `[${year}. ${month}. ${date}]`;

    // 회고 객체 생성
    const 회고 = {
        내용: 회고내용,
        날짜: 회고날짜,
    };

    // 로컬스토리지에서 일기목록 가져오기
    const 스토리지일기목록 = window.localStorage.getItem('일기목록') ?? [];
    const 일기목록 = JSON.parse(스토리지일기목록);

    // 일기목록에서 현재 일기번호의 회고배열에 회고객체 추가
    const 회고목록 = 일기목록[일기번호].회고 ?? [];
    회고목록.push(회고);

    // 일기목록 갱신
    window.localStorage.setItem('일기목록', JSON.stringify(일기목록));

    // 회고 HTML 그리기
    JS_회고그리기();
};

// 일기 삭제 기능
const JS_일기삭제 = (event) => {
    // 이벤트버블링 막기
    event.preventDefault();

    // 쿼리스트링으로 일기번호 받기
    const 쿼리스트링 = location.search;
    const 잘게나눔 = new URLSearchParams(쿼리스트링);
    const 일기번호 = 잘게나눔.get('number');

    // 로컬스토리지에서 일기목록 가져오기
    const 스토리지일기목록 = window.localStorage.getItem('일기목록') ?? [];
    const 일기목록 = JSON.parse(스토리지일기목록);

    // 일기목록에서 현재 일기번호 객체 제거
    일기목록.splice(일기번호, 1);

    // 일기목록 갱신, 홈페이지로 이동
    window.localStorage.setItem('일기목록', JSON.stringify(일기목록));
    window.location.href = './index.html';
};
