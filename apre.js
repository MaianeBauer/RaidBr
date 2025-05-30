// Obtém o modal
var modal = document.getElementById("imageModal");

// Obtém a imagem dentro do modal e a legenda
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

// Obtém todas as imagens com a classe 'clickable-chart'
var charts = document.getElementsByClassName("clickable-chart");

// Itera sobre todas as imagens e adiciona o evento de clique
for (var i = 0; i < charts.length; i++) {
    var chart = charts[i];
    chart.onclick = function() {
        modal.style.display = "block"; // Exibe o modal
        modalImg.src = this.src;      // Define a src da imagem do modal para a imagem clicada
        // A legenda pode ser obtida do atributo 'alt' da imagem ou de um elemento irmão (como a legenda do gráfico)
        captionText.innerHTML = this.alt || this.nextElementSibling.innerText;
    }
}

// Obtém o elemento <span> que fecha o modal
var span = document.getElementsByClassName("close")[0];

// Quando o usuário clica no <span> (x), fecha o modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quando o usuário clica fora da imagem no modal, fecha o modal
modal.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Opcional: Fechar o modal com a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && modal.style.display === "block") {
        modal.style.display = "none";
    }
});
