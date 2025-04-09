document.addEventListener("DOMContentLoaded", () => {
    const counter = document.querySelector(".counter");
    const finalText = "PORTAL 001";

    function randomString(length) {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    // 1. 무작위 문자 출력 (PORTAL 001 길이만큼)
    function animateInitialRandom(duration = 1000, intervalDelay = 80, callback) {
        const startTime = Date.now();
        const interval = setInterval(() => {
            counter.textContent = randomString(finalText.length);
            if (Date.now() - startTime > duration) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, intervalDelay);
    }

    // 2. 무작위 문자 → PORTAL 001로 한 글자씩 전환
    function animateRandomToFinal(text, steps = 20, delay = 80, callback) {
        let index = 0;
        const interval = setInterval(() => {
            let display = "";
            for (let i = 0; i < text.length; i++) {
                if (i <= index) {
                    display += text[i];
                } else {
                    display += Math.random().toString(36).charAt(2).toUpperCase();
                }
            }
            counter.textContent = display;

            index++;
            if (index >= text.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, delay);
    }

    // 3. PORTAL 001 → 오른쪽에서부터 글자 하나씩 삭제
    function removeLettersTo(targetText, callback) {
        let current = counter.textContent;

        const interval = setInterval(() => {
            if (current.length > targetText.length) {
                current = current.slice(0, -1);
                counter.textContent = current;
            } else {
                clearInterval(interval);
                // 4. 삭제 완료 후 약간의 멈춤
                setTimeout(() => {
                    if (callback) callback();
                }, 820);
            }
        }, 100);
    }

    // 5. APOCALYPSE 출력: 한 번에 출력 + 애니메이션 클래스 부여
    function showApocalypseText() {
        counter.textContent = "APOCALYPSE";
        counter.classList.add("apocalypse-reveal");

    // 사운드 재생
    const sound = document.getElementById("apocalypse-sound");
    if (sound) {
        sound.currentTime = 0; // 재생 위치 초기화
        sound.play().catch(e => console.error("사운드 재생 오류:", e));
    }


    // 인트로 끝나고 본문 보이게
        setTimeout(() => {
        document.body.classList.remove("intro-only");  // 인트로 숨김 해제
        document.body.classList.add("loaded");         // 본문 보이게
    }, 2000); // 2초 후 페이지 전개
}

    // 전체 시퀀스 실행
    animateInitialRandom(1000, 80, () => {
        animateRandomToFinal(finalText, 20, 80, () => {
            removeLettersTo("PORTAL 001", () => {
                showApocalypseText();
            });
        });
    });


    // 🔥 여기에 sparkle 코드 넣기 👇
const glowContainer = document.querySelector('.portal-glow');
const sparkleCount = 150;

for (let i = 0; i < sparkleCount; i++) {
    const dot = document.createElement('span');
    dot.className = 'sparkle';
    dot.style.top = `${Math.random() * 100}vh`;
    dot.style.left = `${Math.random() * 100}vw`;
    dot.style.animationDelay = `${Math.random() * 2}s`;
    dot.style.opacity = Math.random();
    glowContainer.appendChild(dot);
}
});
