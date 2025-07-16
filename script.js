// DOM 요소 선택
const navBtns = document.querySelectorAll('.nav-btn'); // 모든 네비게이션 버튼 선택
const sessionContents = document.querySelectorAll('.session-content'); // 모든 세션 컨텐츠 선택

// 네비게이션 버튼 클릭 이벤트 리스너 추가
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const sessionNum = btn.getAttribute('data-session'); // 클릭된 버튼의 data-session 속성 값 가져오기
        
        // 모든 네비게이션 버튼과 세션 컨텐츠에서 'active' 클래스 제거
        navBtns.forEach(b => b.classList.remove('active'));
        sessionContents.forEach(content => content.classList.remove('active'));
        
        // 클릭된 버튼과 해당 세션 컨텐츠에 'active' 클래스 추가
        btn.classList.add('active');
        document.getElementById(`session${sessionNum}`).classList.add('active');
    });
});

// Intersection Observer를 사용하여 스크롤 애니메이션 구현
const observerOptions = {
    threshold: 0.1, // 요소의 10%가 보일 때 콜백 실행
    rootMargin: '0px 0px -50px 0px' // 뷰포트 하단에서 50px 위에서 콜백 실행
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // 요소가 뷰포트에 들어왔을 때
            entry.target.style.opacity = '1'; // 투명도를 1로 변경
            entry.target.style.transform = 'translateY(0)'; // Y축 변형을 0으로 변경
        }
    });
}, observerOptions);

// 모든 '.content-box' 요소에 초기 스타일 설정 및 관찰자 추가
document.querySelectorAll('.content-box').forEach(box => {
    box.style.opacity = '0'; // 초기 투명도 0
    box.style.transform = 'translateY(20px)'; // 초기 Y축 변형 20px
    box.style.transition = 'all 0.6s ease'; // 모든 속성에 0.6초 전환 효과
    observer.observe(box); // 관찰자에게 요소 등록
});

// 활동 아이템에 마우스 호버 효과 추가
const activityItems = document.querySelectorAll('.activity-item'); // 모든 활동 아이템 선택
activityItems.forEach(item => {
    item.addEventListener('mouseenter', function() { // 마우스가 요소 위로 들어왔을 때
        this.querySelector('.activity-icon').style.transform = 'scale(1.2) rotate(10deg)'; // 아이콘 크기 확대 및 회전
    });
    
    item.addEventListener('mouseleave', function() { // 마우스가 요소 밖으로 나갔을 때
        this.querySelector('.activity-icon').style.transform = 'scale(1) rotate(0)'; // 아이콘 원래 크기 및 회전으로 복원
    });
});

// 페이지 로드 시 히어로 섹션 애니메이션
window.addEventListener('load', () => {
    document.querySelector('.hero-section').style.opacity = '1'; // 히어로 섹션 투명도를 1로 변경
});

// 부드러운 스크롤 효과 구현
document.querySelectorAll('a[href^="#"]').forEach(anchor => { // '#'으로 시작하는 모든 <a> 태그 선택
    anchor.addEventListener('click', function (e) { // 클릭 이벤트 리스너 추가
        e.preventDefault(); // 기본 링크 동작 방지
        const target = document.querySelector(this.getAttribute('href')); // href 속성 값으로 대상 요소 선택
        if (target) { // 대상 요소가 존재하면
            target.scrollIntoView({ // 부드러운 스크롤 효과 적용
                behavior: 'smooth', // 부드러운 스크롤
                block: 'start' // 요소의 시작 부분이 뷰포트 상단에 오도록 정렬
            });
        }
    });
});

// 숫자 카운트 애니메이션 함수 (차시 번호 등)
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null; // 애니메이션 시작 시간
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp; // 시작 시간 설정
        const progress = Math.min((timestamp - startTimestamp) / duration, 1); // 진행률 계산 (0에서 1 사이)
        element.innerHTML = Math.floor(progress * (end - start) + start); // 현재 값 계산 및 업데이트
        if (progress < 1) { // 애니메이션이 끝나지 않았으면 다음 프레임 요청
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step); // 애니메이션 시작
};

// 통계 숫자 애니메이션을 위한 Intersection Observer (필요시 사용)
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // 요소가 뷰포트에 들어왔을 때
            const numberElements = entry.target.querySelectorAll('.number'); // '.number' 클래스를 가진 요소 선택
            numberElements.forEach(el => {
                const finalValue = parseInt(el.getAttribute('data-value')); // data-value 속성에서 최종 값 가져오기
                animateValue(el, 0, finalValue, 1000); // 숫자 카운트 애니메이션 실행
            });
            statsObserver.unobserve(entry.target); // 한 번 실행 후 관찰 중지
        }
    });
}, { threshold: 0.5 }); // 요소의 50%가 보일 때 콜백 실행