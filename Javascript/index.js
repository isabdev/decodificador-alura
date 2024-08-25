// Mapeamento de substituições
const substituicoes = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"]
];

// Seletores de elementos
const encriptarBtn = document.getElementById("button__criptografar");
const desencriptarBtn = document.getElementById("button__descriptografar");
const copiarBtn = document.getElementById("button__copiar");
const textoInput = document.getElementById("textoInput");
const textoFinal = document.getElementById("textoFinal");
const munheco = document.getElementById("boneco");
const textoInfo = document.getElementById("textoInfo");
const rightSection = document.getElementById("right");

// Função para realizar a substituição de texto
const substituirTexto = (texto, substituicoes) => {
    return substituicoes.reduce((textoModificado, [original, substituicao]) => 
        textoModificado.replaceAll(original, substituicao), texto);
};

// Função para reverter a substituição de texto
const reverterSubstituicao = (texto, substituicoes) => {
    return substituicoes.reduce((textoModificado, [original, substituicao]) => 
        textoModificado.replaceAll(substituicao, original), texto);
};

// Função para atualizar a interface com o texto processado
const atualizarInterface = (texto) => {
    textoFinal.value = texto; // Use value para textarea
    textoFinal.classList.add("ajustar");
    rightSection.classList.add("ajuste");
    textoInput.value = "";
    textoInput.style.height = "auto";
    textoInput.placeholder = "Digite um texto aqui";
    munheco.classList.add("ocultar");
    textoInfo.classList.add("ocultar");
    copiarBtn.classList.remove("bn_ocultar");
};

// Função para resetar a interface
const resetarInterface = () => {
    textoInput.value = "";
    textoInput.style.height = "auto";
    textoFinal.value = ""; // Use value para textarea
    rightSection.classList.remove("ajuste");
    textoFinal.classList.remove("ajustar");
    munheco.classList.remove("ocultar");
    textoInfo.classList.remove("ocultar");
    copiarBtn.classList.add("bn_ocultar");
    textoInput.focus();
};

// Função para lidar com a criptografia e descriptografia
const processarTexto = (tipo) => {
    const texto = textoInput.value.toLowerCase();
    if (texto) {
        const textoProcessado = tipo === 'encriptar'
            ? substituirTexto(texto, substituicoes)
            : reverterSubstituicao(texto, substituicoes);
        atualizarInterface(textoProcessado);
    } else {
        alert(`Digite um texto para ${tipo === 'encriptar' ? 'criptografar' : 'descriptografar'}`);
        resetarInterface();
    }
};

// Função para ajustar o tamanho e estilo dos botões
const ajustarTamanhoBotoes = () => {
    // Ajusta o tamanho dos botões
    encriptarBtn.style.fontSize = '18px'; // Ajusta o tamanho da fonte
    desencriptarBtn.style.fontSize = '18px'; // Ajusta o tamanho da fonte
    copiarBtn.style.fontSize = '18px'; // Ajusta o tamanho da fonte
    encriptarBtn.style.height = '70px'; // Ajusta a altura
    desencriptarBtn.style.height = '70px'; // Ajusta a altura
    copiarBtn.style.height = '70px'; // Ajusta a altura

    // Adiciona bordas aos botões
    encriptarBtn.style.border = '2px solid var(--color-blue)';
    desencriptarBtn.style.border = '2px solid var(--color-blue)';
    copiarBtn.style.border = '2px solid var(--color-blue)';

    // Adiciona cores aos botões
    encriptarBtn.style.background = 'var(--color-blue)';
    encriptarBtn.style.color = 'white';

    desencriptarBtn.style.background = 'var(--color-lightBlue2)';
    desencriptarBtn.style.color = 'var(--color-blue)';

    copiarBtn.style.background = 'none';
    copiarBtn.style.color = 'var(--color-blue)';
};

// Eventos
encriptarBtn.addEventListener('click', () => processarTexto('encriptar'));
desencriptarBtn.addEventListener('click', () => processarTexto('desencriptar'));

copiarBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(textoFinal.value).then(() => {
        alert("Texto Copiado");
        resetarInterface();
    }).catch(err => {
        console.error('Erro ao copiar texto: ', err);
    });
});

// Auto ajuste do tamanho do textarea
const ajustarAlturaTextarea = (e) => {
    textoInput.style.height = "auto";
    let alturaScroll = e.target.scrollHeight;
    textoInput.style.height = `${alturaScroll}px`;
};

textoInput.addEventListener("change", ajustarAlturaTextarea);
textoInput.addEventListener("keyup", ajustarAlturaTextarea);

// Ajuste do tamanho dos botões ao carregar a página
window.addEventListener('load', ajustarTamanhoBotoes);
