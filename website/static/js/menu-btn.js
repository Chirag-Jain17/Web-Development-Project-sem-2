window.addEventListener("load", (event) => {
    const menuBtn = document.querySelector(".menu-btn");
    const main = document.getElementById("banner");
    const navArea = document.querySelector(".nav-area");

    main.addEventListener("click", () => {
      if (menuBtn.classList.contains("active")){
        menuBtn.classList.toggle("active");
        navArea.classList.toggle("active");
      }
    });

    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        navArea.classList.toggle("active");
    });
});