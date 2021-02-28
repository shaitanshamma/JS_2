const overlayMenuOpenButton = document.getElementById("open__overlay");

const overlayStyle = document.getElementById("overlay_menu");

const overlayMenuClose = document.getElementById("close__overlay");

const basketNum = document.getElementById("basket__count");

let basketCount;

window.onload = () => {
    if (document.querySelector(".cart_items") !== null) {
        basketCount = document.querySelector(".cart_items").children.length;
        basketNum.textContent = `${basketCount}`;
    } else {
        basketNum.textContent = "2";
    }
};

overlayMenuOpenButton.onclick = () => {
    /* С точки зрения доступности сайта, лучше использовать display: none, иначе читалка сможет увидеть меню, даже если оно скрыто */
    // https://htmlacademy.ru/blog/boost/frontend/short-12
    if (overlayStyle.style.visibility === "hidden") {
        document.body.style.overflow = 'hidden'
        document.getElementById("overlay_menu").style.opacity = "1";
        document.getElementById("overlay_menu").style.visibility = "visible";
    } else {
        document.body.style.overflow = null
        document.getElementById("overlay_menu").style.opacity = "0";
        document.getElementById("overlay_menu").style.visibility = "hidden";
    }
};
overlayMenuClose.onclick = () => {
    document.body.style.overflow = null
    document.getElementById("overlay_menu").style.visibility = "hidden";
    document.getElementById("overlay_menu").style.opacity = "0";
};

function removeItem(id) {
    document.getElementById(id).remove();
    if (document.querySelector(".cart_items").children.length !== 0) {
        basketCount--;
        basketNum.textContent = `${basketCount}`;
    } else {
        document.querySelector(".products_in_cart").remove();
        basketNum.textContent = `0`;
    }
}
