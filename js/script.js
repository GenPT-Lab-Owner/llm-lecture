// 페이지 로드 시 실행되는 함수
document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지 URL에서 파일명 추출
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 네비게이션 메뉴에서 현재 페이지에 해당하는 링크에 active 클래스 추가
    const navLinks = document.querySelectorAll('.table-of-contents a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // 이전/다음 페이지 이동 기능 (topic 페이지에서만 작동)
    if (currentPage.startsWith('topic')) {
        setupNavigation();
    }
    
    // 애니메이션 효과 추가 (Apple 스타일의 점진적인 로드 효과)
    animateContent();
});

// 이전/다음 페이지 이동 기능 설정
function setupNavigation() {
    // 현재 페이지 번호 추출 (예: topic1.html -> 1)
    const currentPageNumber = parseInt(window.location.pathname.split('/').pop().replace('topic', '').replace('.html', ''));
    
    // 이전/다음 버튼 생성 및 이벤트 설정
    const navigationDiv = document.createElement('div');
    navigationDiv.className = 'slide-navigation';
    
    // 이전 페이지 버튼
    if (currentPageNumber > 1) {
        const prevButton = document.createElement('a');
        prevButton.href = `topic${currentPageNumber - 1}.html`;
        prevButton.className = 'nav-button prev-button';
        prevButton.textContent = '이전';
        prevButton.setAttribute('aria-label', '이전 주제로 이동');
        navigationDiv.appendChild(prevButton);
    }
    
    // 홈으로 버튼
    const homeButton = document.createElement('a');
    homeButton.href = 'index.html';
    homeButton.className = 'nav-button home-button';
    homeButton.textContent = '홈으로';
    homeButton.setAttribute('aria-label', '홈으로 이동');
    navigationDiv.appendChild(homeButton);
    
    // 다음 페이지 버튼 (최대 6페이지까지)
    if (currentPageNumber < 6) {
        const nextButton = document.createElement('a');
        nextButton.href = `topic${currentPageNumber + 1}.html`;
        nextButton.className = 'nav-button next-button';
        nextButton.textContent = '다음';
        nextButton.setAttribute('aria-label', '다음 주제로 이동');
        navigationDiv.appendChild(nextButton);
    }
    
    // 네비게이션 버튼을 페이지에 추가
    const slideContainer = document.querySelector('.slide-content-area');
    slideContainer.appendChild(navigationDiv);
}

// Apple 스타일의 점진적인 애니메이션 효과
function animateContent() {
    const sections = document.querySelectorAll('.slide');
    
    sections.forEach((section, index) => {
        // 각 섹션에 지연 애니메이션 적용
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // 주제 카드에 애니메이션 적용 (메인 페이지에만)
    const topicCards = document.querySelectorAll('.topic-card');
    if (topicCards.length > 0) {
        topicCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.transitionDelay = `${0.3 + (index * 0.1)}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300);
        });
    }
} 