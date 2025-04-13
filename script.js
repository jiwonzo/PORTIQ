document.addEventListener("DOMContentLoaded", () => {
  const textEl = document.getElementById("text-display");

  function typeText(text, speed = 80) {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        textEl.textContent += text[i];
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(resolve, 800);
        }
      }, speed);
    });
  }

  function clearText(immediate = true) {
    return new Promise((resolve) => {
      if (immediate) {
        textEl.textContent = "";
        resolve();
      } else {
        let content = textEl.textContent;
        const interval = setInterval(() => {
          content = content.slice(0, -1);
          textEl.textContent = content;
          if (content.length === 0) {
            clearInterval(interval);
            resolve();
          }
        }, 50);
      }
    });
  }

  function scrambleText(finalText) {
    return new Promise((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        let output = "";
        for (let i = 0; i < finalText.length; i++) {
          output += i <= index ? finalText[i] : randomChar();
        }
        textEl.textContent = output;
        index++;
        if (index >= finalText.length) {
          clearInterval(interval);
          setTimeout(resolve, 1100);
        }
      }, 100);
    });
  }

  function randomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function animateSequence() {
    await typeText("Welcome, traveler.");
    await clearText(true);

    await typeText("You're entering...");
    // await clearText(true);

    await scrambleText("PORTAL 001");
    await wait(500);
    // await clearText(true);

    showApocalypseText();         // 고정된 'APOCALYPSE' 출력
    await wait(1000);             // 1초 기다림
    swingApocalypseEnding();      // YPSE만 덜렁이게
  }

  // 'APOCALYPSE'를 span으로 각각 출력
  function showApocalypseText() {
    const text = "APOCALYPSE";
    textEl.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.textContent = text[i];
      span.classList.add("apocalypse-letter");
      textEl.appendChild(span);
    }
  }

  // 'YPSE'만 덜렁이게
  function swingApocalypseEnding() {
    const spans = textEl.querySelectorAll(".apocalypse-letter");
    for (let i = 5; i < spans.length; i++) {
      spans[i].classList.add("swing-letter");
    }
  }

  // 별 생성
  const starContainer = document.querySelector(".stars-bg");
  for (let i = 0; i < 80; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${1.5 + Math.random() * 3}s`;
    star.style.opacity = Math.random();
    starContainer.appendChild(star);
  }

  animateSequence();
});
