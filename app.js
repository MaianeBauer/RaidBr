let nextBtn = document.querySelector(".next"),
  prevBtn = document.querySelector(".prev"),
  carousel = document.querySelector(".carousel"),
  list = document.querySelector(".list"),
  item = document.querySelectorAll(".item"),
  runningTime = document.querySelector(".carousel .timeRunning");

let timeRunning = 3000;
let timeAutoNext = 7000;
let activeIndex = 0; // Índice do item atualmente ativo
const goToNextSlide = () => showSlider("next");
nextBtn.onclick = goToNextSlide;

prevBtn.onclick = function () {
  showSlider("prev");
};

let runTimeOut;
let runNextAuto = setTimeout(goToNextSlide, timeAutoNext);

function resetTimeAnimation() {
  runningTime.style.animation = "none";
  runningTime.offsetHeight; /* trigger reflow */
  runningTime.style.animation = null;
  runningTime.style.animation = `runningTime ${
    timeAutoNext / 1000
  }s linear 1 forwards`;
}

function updateActiveClass() {
  item.forEach((el, index) => {
    el.classList.remove("active");
    // Remova quaisquer outras classes de estado visual, se existirem
  });
  item[activeIndex].classList.add("active");
  // Aqui você pode adicionar lógica para exibir o conteúdo do item ativo
  // Por exemplo, manipulando a visibilidade do elemento .content dentro do item ativo.
  const activeContent = item[activeIndex].querySelector(".content");
  if (activeContent) {
    activeContent.style.display = "block"; // Garante que o conteúdo do ativo seja visível
  }

  // Esconda o conteúdo dos outros itens
  item.forEach((el, index) => {
    if (index !== activeIndex) {
      const content = el.querySelector(".content");
      if (content) {
        content.style.display = "none";
      }
    }
  });
}

function showSlider(type) {
  let sliderItemsDom = list.querySelectorAll(".carousel .list .item");

  // Atualiza o índice ativo ANTES de mover os elementos
  if (type === "next") {
    activeIndex = (activeIndex + 1) % sliderItemsDom.length;
    list.appendChild(sliderItemsDom[0]);
    carousel.classList.add("next");
  } else {
    activeIndex =
      (activeIndex - 1 + sliderItemsDom.length) % sliderItemsDom.length;
    list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
    carousel.classList.add("prev");
  }

  // Garante que a classe ativa seja atualizada após a movimentação
  updateActiveClass();

  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carousel.classList.remove("next");
    carousel.classList.remove("prev");
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    nextBtn.click();
  }, timeAutoNext);

  resetTimeAnimation();
}

// Inicialização
if (item.length > 0) {
  updateActiveClass(); // Define o primeiro item como ativo na inicialização
}
resetTimeAnimation();
