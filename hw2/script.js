let big_container = document.querySelector(".big_box_container")
let small_container = document.querySelector(".small_box_container")

function dele(d) {
    let box = d.closest(".box")
    box.remove();
    if (big_container.childElementCount == 0) {
        big_container.style.display = 'none';
        small_container.setAttribute('id', 'full');
    }
    if (document.querySelectorAll(".box").length == 1) {
        big_container.appendChild(document.querySelector('.box'));
        big_container.style.display = "flex";
        small_container.style.display = 'none';
        big_container.setAttribute('id', 'full');
        document.querySelector('.box').setAttribute('id', 'pin');
        console.log(document.querySelector('.box').id);
    }
}

function doPin(d) {
    pinele = big_container.querySelector('#pin')
    if (pinele == d.closest('.box') && document.querySelectorAll(".box").length > 1) {
        small_container.appendChild(pinele);
        pinele.setAttribute('id', '');
        big_container.style.display = 'none';
        small_container.setAttribute('id', 'full');
    }
    else if (pinele == d.closest('.box')) { }
    else if (pinele) {
        d.closest('.box').setAttribute('id', 'pin');
        pinele.setAttribute('id', '');
        small_container.appendChild(pinele);
        big_container.appendChild(d.closest('.box'));
    }
    else {
        d.closest('.box').setAttribute('id', 'pin');
        big_container.appendChild(d.closest('.box'));
        big_container.style.display = 'flex';
        small_container.setAttribute('id', '');
    }
}

function addpeople(e) {
    let box = document.querySelector('.box');
    let newBox = box.cloneNode(true);
    newBox.setAttribute('id', '');
    newBox.querySelector('.box_top').setAttribute('id', '');
    small_container.appendChild(newBox);
    small_container.style.display = 'flex';
    if (big_container.childElementCount == 1) {
        big_container.setAttribute('id', '');
        small_container.setAttribute('id', '');
    }
    else {
        small_container.setAttribute('id', 'full');
    }
}