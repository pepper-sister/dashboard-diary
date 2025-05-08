// 페이지 로드시 실행
window.onload = () => {
    // 일기 HTML 그리기
    JS_일기그리기();
};

// 일기 그리기 기능
const JS_일기그리기 = () => {
    // 로컬스토리지에서 일기목록 가져오기
    const 스토리지일기목록 = window.localStorage.getItem('일기목록') ?? [];
    const 일기목록 = JSON.parse(스토리지일기목록);

    // 일기 HTML 작성
    const HTML_일기 = 일기목록
        .map(
            (el, index) => `
            <a href="./detail.html?number=${index}" class="CSS_일기_이동">
                <div class="CSS_일기">
                    ${
                        el.기분 === '행복'
                            ? `<img
                                class="CSS_일기_이미지"
                                src="./assets/images/joy.png"
                                alt="행복"
                            />`
                            : ''
                    }
                    ${
                        el.기분 === '슬픔'
                            ? `<img
                                class="CSS_일기_이미지"
                                src="./assets/images/sadness.png"
                                alt="슬픔"
                            />`
                            : ''
                    }
                    ${
                        el.기분 === '놀람'
                            ? `<img
                                class="CSS_일기_이미지"
                                src="./assets/images/surprised.png"
                                alt="놀람"
                            />`
                            : ''
                    }
                    ${
                        el.기분 === '화남'
                            ? `<img
                                class="CSS_일기_이미지"
                                src="./assets/images/anger.png"
                                alt="화남"
                            />`
                            : ''
                    }
                    ${
                        el.기분 === '기타'
                            ? `<img
                                class="CSS_일기_이미지"
                                src="./assets/images/idontknownothing.png"
                                alt="기타"
                            />`
                            : ''
                    }
                    <div class="CSS_일기_정보">
                        <div class="CSS_일기_서브제목">
                            ${
                                el.기분 === '행복'
                                    ? `<div class="CSS_일기_기분 CSS_행복">행복해요</div>`
                                    : ''
                            }
                            ${
                                el.기분 === '슬픔'
                                    ? `<div class="CSS_일기_기분 CSS_슬픔">슬퍼요</div>`
                                    : ''
                            }
                            ${
                                el.기분 === '놀람'
                                    ? `<div class="CSS_일기_기분 CSS_놀람">놀랐어요</div>`
                                    : ''
                            }
                            ${
                                el.기분 === '화남'
                                    ? `<div class="CSS_일기_기분 CSS_화남">화나요</div>`
                                    : ''
                            }
                            ${
                                el.기분 === '기타'
                                    ? `<div class="CSS_일기_기분 CSS_기타">기타</div>`
                                    : ''
                            }
                            <div class="CSS_일기_날짜">${el.날짜}</div>
                        </div>
                        <div class="CSS_일기_제목">${el.제목}</div>
                        <img onclick="JS_일기삭제(event, ${index})" class="CSS_일기_삭제" src="./assets/images/deleteButton.png" alt="삭제버튼" />
                    </div>
                </div>
            </a>`
        )
        .join('');

    // 일기 HTML 그리기
    window.document.getElementById('HTML_일기목록').innerHTML = HTML_일기;
};

// 일기 등록 기능
const JS_일기등록 = () => {
    // 작성한 일기 제목, 내용 가져오기
    const 일기제목 = document.getElementById('HTML_제목_인풋창').value;
    const 일기내용 = document.getElementById('HTML_내용_인풋창').value;

    // 일기 작성일 불러오기
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = today.getDate();
    const 작성일 = `${year}. ${month}. ${date}`;

    // 작성한 일기 기분 가져오기
    const 기분라디오버튼 = document.querySelectorAll("input[name='HTML_기분']");
    let 일기기분 = '';
    기분라디오버튼.forEach((index) => {
        if (index.checked) {
            일기기분 = index.value;
        }
    });

    // 일기 작성
    const 일기 = {
        제목: 일기제목,
        내용: 일기내용,
        기분: 일기기분,
        날짜: 작성일,
        회고: [],
    };

    // 로컬스토리지에서 일기목록 가져오기
    const 스토리지일기목록 = window.localStorage.getItem('일기목록') ?? '[]';
    const 일기목록 = JSON.parse(스토리지일기목록);

    // 일기목록에 일기 추가
    일기목록.push(일기);

    // 일기목록 갱신
    window.localStorage.setItem('일기목록', JSON.stringify(일기목록));

    // 일기 HTMl 그리기
    JS_일기그리기();
};

// 스크롤 움직임 감지
window.addEventListener('scroll', () => {
    // 스크롤 움직인 길이 구하기
    const 스크롤움직인길이 = window.scrollY;

    // 스크롤이 움직이면 필터 색반전
    if (스크롤움직인길이 > 0) {
        document.getElementById('HTML_필터').style = 'filter: invert(100%)';
    } else {
        document.getElementById('HTML_필터').style = '';
    }

    // 푸터 위쪽으로 플로팅 버튼 두기
    const 현재화면과푸터사이길이 = document
        .getElementById('HTML_푸터')
        .getBoundingClientRect().top;
    const 현재화면높이 = window.innerHeight;

    if (현재화면높이 >= 현재화면과푸터사이길이) {
        document.getElementById('HTML_플로팅버튼').style = `position: relative;
            left: 86%;
            top: 0px;
            margin-top: -40px;`;
    } else {
        document.getElementById('HTML_플로팅버튼').style = `position: fixed;
            left: 86%;
            bottom: 40px;`;
    }
});

// 스크롤 이동 기능
const JS_스크롤기능 = () => {
    // 페이지 맨위로 이동
    window.scrollTo({ top: 0 });
};

// 일기 삭제 기능
const JS_일기삭제 = (event, 일기번호) => {
    // 이벤트버블링 막기
    event.preventDefault();

    // 로컬스토리지에서 일기목록 가져오기
    const 스토리지일기목록 = window.localStorage.getItem('일기목록') ?? [];
    const 일기목록 = JSON.parse(스토리지일기목록);

    // 일기목록에서 현재 일기번호 객체 제거
    일기목록.splice(일기번호, 1);

    // 일기목록 갱신, 홈페이지로 이동
    window.localStorage.setItem('일기목록', JSON.stringify(일기목록));
    window.location.href = './index.html';
};
