const container = document.getElementById('floatingButtonContainer');
const mainButton = document.getElementById('mainButton');
const scrollTopButton = document.getElementById('scrollTopButton');
const optionButtons = document.querySelectorAll('.option-button');
let isOpen = false;

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        const touch = e.touches[0];
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementTouchDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        setNewPosition();
    }

    function elementTouchDrag(e) {
        const touch = e.touches[0];
        pos1 = pos3 - touch.clientX;
        pos2 = pos4 - touch.clientY;
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        setNewPosition();
    }

    function setNewPosition() {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        elmnt.style.bottom = 'auto';
        elmnt.style.right = 'auto';
        adjustPosition();
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}

dragElement(container);

function positionButtons() {
    const radius = 70;
    const centerX = mainButton.offsetWidth / 2;
    const centerY = mainButton.offsetHeight / 2;

    scrollTopButton.style.left = `${centerX - scrollTopButton.offsetWidth / 2}px`;
    scrollTopButton.style.top = `${-radius - scrollTopButton.offsetHeight / 1}px`;

    optionButtons.forEach((button, index) => {
        const angle = (index * 72 - 90) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        button.style.left = `${centerX + x - button.offsetWidth / 2}px`;
        button.style.top = `${centerY + y - button.offsetHeight / 2}px`;
    });
}

function adjustPosition() {
    const rect = container.getBoundingClientRect();
    const margin = 20;
    
    if (rect.right > window.innerWidth - margin) {
        container.style.left = `${window.innerWidth - rect.width - margin}px`;
    }
    if (rect.bottom > window.innerHeight - margin) {
        container.style.top = `${window.innerHeight - rect.height - margin}px`;
    }
    if (rect.left < margin) {
        container.style.left = `${margin}px`;
    }
    if (rect.top < margin) {
        container.style.top = `${margin}px`;
    }
}

mainButton.addEventListener('click', () => {
    isOpen = !isOpen;
    mainButton.classList.toggle('open', isOpen);
    container.classList.toggle('open', isOpen);

    if (isOpen) {
        positionButtons();
        adjustPosition();
        scrollTopButton.style.opacity = '1';
        optionButtons.forEach(button => {
            button.style.opacity = '1';
        });
    } else {
        scrollTopButton.style.opacity = '0';
        optionButtons.forEach(button => {
            button.style.opacity = '0';
            button.style.transform = 'translate(0, 0)';
        });
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('resize', () => {
    if (isOpen) {
        positionButtons();
        adjustPosition();
    }
});

// Posicionamiento inicial
container.style.bottom = '4rem';
container.style.right = '5rem';