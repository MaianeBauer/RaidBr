document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const largeImage = document.getElementById('large-image');
    const imageTitle = document.getElementById('image-title');
    const imageDescription = document.getElementById('image-description');



    let typingIntervalId; // Variável para armazenar o ID do intervalo do efeito de digitação

    // Função para o efeito de digitação usando setInterval
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

    // Função para atualizar a imagem e o texto
    function updateImageDisplay(item) {
        const imageUrl = item.dataset.image;
        const title = item.dataset.title;
        const description = item.dataset.description;

        // --- Efeito de Fade da Imagem e Título (mais rápido) ---
        largeImage.style.opacity = 0;
        imageTitle.style.opacity = 0;

        setTimeout(() => {
            largeImage.src = imageUrl;
            imageTitle.textContent = title;

            largeImage.style.opacity = 1;
            imageTitle.style.opacity = 1;
        }, 500); // Imagem e título aparecem após 0.5s

        // --- Atraso para o Efeito de Digitação do Texto (mais lento) ---
        // Limpa qualquer efeito de digitação em andamento antes de iniciar um novo
        if (typingIntervalId) {
            clearInterval(typingIntervalId);
        }
        imageDescription.textContent = ''; // Limpa o texto da descrição instantaneamente
        imageDescription.style.width = '0'; // Reseta a largura para o novo efeito de digitação
        imageDescription.classList.add('typing-cursor'); // Garante que o cursor esteja lá para a nova digitação
        imageDescription.style.borderRight = '.15em solid orange'; // Garante que o cursor esteja visível

        setTimeout(() => {
            typeWriterEffect(imageDescription, description, 50);//Inicia a digitação (50ms por caractere)
        }, 1000); // Descrição começa a digitar após 1 segundo (0.5s para imagem + 0.5s extra)
    }

    // Adiciona o evento de clique a cada item da timeline
    timelineItems.forEach(item => {
        const marker = item.querySelector('.timeline-marker');

        marker.addEventListener('click', () => {
            timelineItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            updateImageDisplay(item);
        });

        // Eventos de hover para destaque visual (mantidos no item para melhor UX)
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover-active');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover-active');
        });
    });

    // Inicializa com o primeiro item ativo e sua imagem/descrição
    if (timelineItems.length > 0) {
        timelineItems[0].classList.add('active');
        updateImageDisplay(timelineItems[0]);
    }
});
// Função para atualizar a imagem e o texto
    function updateImageDisplay(item) {
        const imageUrl = item.dataset.image;
        const title = item.dataset.title;
        const description = item.dataset.description;

        // SEÇÃO ADICIONADA: Lógica para destruir qualquer instância anterior do Typed.js
        if (typedInstance) {
            typedInstance.destroy(); // Limpa a instância anterior
            typedInstance = null;    // Zera a variável
        }

        // LINHAS ALTERADAS/ADICIONADAS: Limpa o texto e remove estilos manuais antes de Typed.js
        imageDescription.textContent = '';
        imageDescription.style.width = 'auto'; 
        imageDescription.style.borderRight = 'none'; 

        // --- Efeito de Fade da Imagem e Título (mantido) ---
        largeImage.style.opacity = 0;
        imageTitle.style.opacity = 0;

        setTimeout(() => {
            largeImage.src = imageUrl;
            imageTitle.textContent = title;
            largeImage.style.opacity = 1;
            imageTitle.style.opacity = 1;
        }, 500);

        // --- Atraso para o Efeito de Digitação do Texto (agora com Typed.js) ---
        setTimeout(() => {
            // SEÇÃO ALTERADA: Criação de uma nova instância do Typed.js
            typedInstance = new Typed('#image-description', {
                strings: [description], // O texto que será digitado
                typeSpeed: 50,         // Velocidade de digitação
                showCursor: true,      // Mostrar o cursor
                cursorChar: '|',       // Caractere do cursor
                // onComplete: (self) => { /* Opcional: callback ao terminar */ }
            });
        }, 1000); 
    }

    // Adiciona o evento de clique a cada item da timeline (mantido)
    timelineItems.forEach(item => {
        const marker = item.querySelector('.timeline-marker');

        marker.addEventListener('click', () => {
            timelineItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            updateImageDisplay(item);
        });

        // Eventos de hover para destaque visual (mantidos)
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover-active');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover-active');
        });
    });

    // Inicializa com o primeiro item ativo e sua imagem/descrição (mantido)
    if (timelineItems.length > 0) {
        timelineItems[0].classList.add('active');
        updateImageDisplay(timelineItems[0]);
    };