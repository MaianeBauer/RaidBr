document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const largeImage = document.getElementById('large-image');
    const imageTitle = document.getElementById('image-title');
    const imageDescription = document.getElementById('image-description');
    const carouselButtons = document.querySelectorAll('.carousel-button'); // Seleciona todos os botões do carrossel

    let typedInstance; // Variável para armazenar a instância do Typed.js

    // A função typeWriterEffect original não é mais necessária se você estiver usando Typed.js,
    // mas a manterei comentada caso decida voltar a ela.
    /*
    let typingIntervalId; // Variável para armazenar o ID do intervalo do efeito de digitação

    function typeWriterEffect(element, text, speed) {
        let i = 0;
        element.textContent = ''; // Limpa o texto existente imediatamente
        element.style.width = '0'; // Define a largura inicial para 0 para o efeito de digitação
        element.classList.add('typing-cursor'); // Adiciona a classe do cursor
        element.style.borderRight = '.15em solid orange'; // Garante que o cursor esteja visível

        // Limpa qualquer intervalo de digitação anterior para evitar sobreposição
        if (typingIntervalId) {
            clearInterval(typingIntervalId);
        }

        typingIntervalId = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i); // Adiciona um caractere
                i++;
            } else {
                clearInterval(typingIntervalId); // Para o intervalo quando o texto termina
                element.classList.remove('typing-cursor'); // Remove a classe do cursor
                element.style.borderRight = 'none'; // Esconde o cursor
                element.style.width = 'auto'; // Permite que o texto ocupe a largura total
            }
        }, speed);
    }
    */

    // Função para atualizar a imagem e o texto
    // Esta função será usada tanto pelos itens da timeline quanto pelos botões do carrossel
    function updateImageDisplay(element) {
        const imageUrl = element.dataset.image;
        const title = element.dataset.title;
        const description = element.dataset.description;

        // Limpa e destrói qualquer instância anterior do Typed.js para evitar sobreposição
        if (typedInstance) {
            typedInstance.destroy();
            typedInstance = null;
        }

        // Limpa o texto e remove estilos manuais antes de Typed.js
        imageDescription.textContent = '';
        imageDescription.style.width = 'auto';
        imageDescription.style.borderRight = 'none';

        // --- Efeito de Fade da Imagem e Título ---
        largeImage.style.opacity = 0;
        imageTitle.style.opacity = 0;

        setTimeout(() => {
            largeImage.src = imageUrl;
            imageTitle.textContent = title;

            largeImage.style.opacity = 1;
            imageTitle.style.opacity = 1;
        }, 500); // Imagem e título aparecem após 0.5s

        // --- Atraso para o Efeito de Digitação do Texto com Typed.js ---
        setTimeout(() => {
            typedInstance = new Typed('#image-description', {
                strings: [description], // O texto que será digitado
                typeSpeed: 50,          // Velocidade de digitação
                showCursor: true,       // Mostrar o cursor
                cursorChar: '|',        // Caractere do cursor
            });
        }, 1000); // Descrição começa a digitar após 1 segundo (0.5s para imagem + 0.5s extra)
    }

    // --- Lógica para os itens da Timeline (existente) ---
    timelineItems.forEach(item => {
        const marker = item.querySelector('.timeline-marker');

        marker.addEventListener('click', () => {
            // Remove a classe 'active' de todos os itens da timeline
            timelineItems.forEach(i => i.classList.remove('active'));
            // Remove a classe 'active' de todos os botões do carrossel
            carouselButtons.forEach(btn => btn.classList.remove('active'));
            
            item.classList.add('active'); // Ativa o item da timeline clicado
            updateImageDisplay(item);
        });

        // Eventos de hover para destaque visual
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover-active');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover-active');
        });
    });

    // --- Lógica para os Botões do Carrossel (NOVA) ---
    carouselButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os itens da timeline
            timelineItems.forEach(i => i.classList.remove('active'));
            // Remove a classe 'active' de todos os botões do carrossel
            carouselButtons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active'); // Ativa o botão do carrossel clicado
            updateImageDisplay(button); // Atualiza a imagem e o texto com os dados do botão
        });
    });

    // Inicializa com o primeiro item da timeline ativo e sua imagem/descrição
    // Ou, se preferir, inicialize com o primeiro botão do carrossel.
    // Eu escolhi manter a inicialização com o primeiro item da timeline para consistência com o que você já tinha.
    if (timelineItems.length > 0) {
        timelineItems[0].classList.add('active');
        updateImageDisplay(timelineItems[0]);
    }
    // Se você quisesse que o PRIMEIRO botão do carrossel iniciasse ativo e exibisse seu conteúdo:
    // else if (carouselButtons.length > 0) {
    //     carouselButtons[0].classList.add('active');
    //     updateImageDisplay(carouselButtons[0]);
    // }
});
