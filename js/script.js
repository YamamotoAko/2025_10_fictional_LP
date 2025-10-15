document.addEventListener('DOMContentLoaded', function () {
  // Lenis初期化
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Rellax初期化
  if (
    typeof Rellax !== 'undefined' &&
    document.querySelectorAll('.rellax').length > 0
  ) {
    var rellax = new Rellax('.rellax');
  }

  // アコーディオンメニュー
  document.querySelectorAll('.accordion').forEach((accordion) => {
    const props = {
      isAnimating: false,
      slideDuration: 400,
      slideEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    };

    function answerShow(li) {
      props.isAnimating = true;
      li.classList.add('is-open');

      const answer = li.querySelector('.accordion-a');
      if (!answer) return;

      answer.style.display = 'block';
      const startHeight = 0;
      const endHeight = answer.scrollHeight;

      answer.animate(
        [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
        { duration: props.slideDuration, easing: props.slideEasing }
      ).onfinish = () => {
        answer.style.height = '';
        props.isAnimating = false;
      };
    }

    function answerHide(li) {
      props.isAnimating = true;
      li.classList.remove('is-open');

      const answer = li.querySelector('.accordion-a');
      if (!answer) return;

      const startHeight = answer.scrollHeight;
      const endHeight = 0;

      answer.animate(
        [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
        { duration: props.slideDuration, easing: props.slideEasing }
      ).onfinish = () => {
        answer.style.display = '';
        answer.style.height = '';
        props.isAnimating = false;
      };
    }

    accordion.querySelectorAll('li').forEach((li) => {
      const questionBtn = li.querySelector('.accordion-q');
      if (questionBtn) {
        questionBtn.addEventListener('click', () => {
          if (!props.isAnimating) {
            if (!li.classList.contains('is-open')) {
              answerShow(li);
            } else {
              answerHide(li);
            }
          }
        });
      }
    });
  });

  // ループ文字
  const loop = document.querySelector('.loop');
  const originalText = document.querySelector('.loop_text');

  // 画面幅に応じて必要な複製数を計算
  const textWidth = originalText.offsetWidth;
  const containerWidth = window.innerWidth;
  const copies = Math.ceil(containerWidth / textWidth) + 2;

  // 必要な数だけテキストを複製
  for (let i = 0; i < copies; i++) {
    const clone = originalText.cloneNode(true);
    loop.appendChild(clone);
  }

  // ウィンドウリサイズ時に再計算
  window.addEventListener('resize', () => {
    const currentCopies = document.querySelectorAll('.loop_text').length;
    const newTextWidth = originalText.offsetWidth;
    const newContainerWidth = window.innerWidth;
    const neededCopies = Math.ceil(newContainerWidth / newTextWidth) + 2;

    if (neededCopies > currentCopies) {
      for (let i = currentCopies; i < neededCopies; i++) {
        const clone = originalText.cloneNode(true);
        loop.appendChild(clone);
      }
    }
  });
});
