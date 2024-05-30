(function () {
    const App = {
        // les variables/constantes
        _pathMobile: document.querySelector("#pathMobile"),
        _burger: document.querySelector(".nav-burger"),
        _burgerMenu: document.querySelector(".nav-list-burger"),
        _navItems: document.querySelectorAll(".nav-list-item"),
        _nameLogo: document.querySelector(".header-logo-wrapper span"), // correction ici
        _cursor: document.querySelector(".cursor"),
        _cursor2: document.querySelector(".cursor2"),
        _btn: document.querySelectorAll(".btn"),
        _link: document.querySelectorAll(".link"),
        _sections: document.querySelectorAll(".container[id]"),
        _progress: document.querySelector(".progress-bar"),
        _carousel: document.querySelector(".carousel"),
        _carouselItems: document.querySelectorAll(".carousel-item"),
        _projectsWrapper: document.querySelector(".projects-wrapper"),
        _copyBtn: document.querySelector(".copy"),
        _tooltip: document.querySelector(".tooltiptext"),

        // initialisations
        app_init: function () {
            App.app_handlers();
        },

        // les gestionnaires d'ev
        app_handlers: function () {
            // gestion du scroll pour le path
            const lengthPathMobile = App.lengthPath(App._pathMobile);
            window.addEventListener("scroll", () => {
                App.scrollPath(lengthPathMobile, App._pathMobile);

                // gestion de la progress barre
                let totalHeight = document.body.scrollHeight - window.innerHeight;

                let progressHeight = (window.pageYOffset / totalHeight) * 100;
                App._progress.style.height = `${progressHeight}%`;
            });
            // Gestion du cursor
            document.addEventListener("mousemove", App.cursorMove);
            document.addEventListener("mousedown", App.cursorEvent);
            document.addEventListener("mouseup", App.cursorEvent);
            App._link.forEach((link) => {
                link.addEventListener("mouseover", () => {
                    App.cursorEvent();
                    if (App._cursor.classList.contains("cursor-event")) {
                        link.style.cursor = "none";
                    }
                });
                link.addEventListener("mouseout", App.cursorEvent);
            });
            // ouverture et fermture du menu burger
            if (App._burger) { // ajout de cette vérification
                App._burger.addEventListener("click", App.toggleMenu);
                App._burger.addEventListener("click", App.disabledScroll);
            }
            if (App._navItems) { // ajout de cette vérification
                App._navItems.forEach((item) => {
                    item.addEventListener("click", App.toggleMenu);
                    item.addEventListener("click", () => {
                        document.documentElement.classList.remove("scroll-disabled");
                    });
                });
            }
            // gestion de l'apparition des éléments
            const callback = (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(entry.target.dataset.animate);
                        observer.unobserve(entry.target);
                    }
                });
            };
            let options = {
                threshold: 0.3,
            };
            let observer = new IntersectionObserver(callback, options);
            const animationItems = document.querySelectorAll(".animate");
            animationItems.forEach((item) => {
                observer.observe(item);
            });
            // gestion du scroll spy
            let options2 = {
                threshold: 0.6,
            };
            const observerScroll = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute("id");
                    if (entry.isIntersecting) {
                        document
                            .querySelector(`li a[href="#${id}"]`)
                            .parentElement.classList.add("active");
                    } else {
                        document
                            .querySelector(`li a[href="#${id}"]`)
                            .parentElement.classList.remove("active");
                    }
                });
            }, options2);
            App._sections.forEach((section) => {
                observerScroll.observe(section);
            });
            // boutons magnetiques
            App._btn.forEach((btn) => {
                btn.addEventListener("mousemove", (e) => {
                    const position = btn.getBoundingClientRect();
                    const x = e.clientX - position.left - position.width / 2,
                        y = e.clientY - position.top - position.height / 2;
                    btn.style.transform =
                        "translate(" + x * 0.4 + "px," + y * 0.4 + "px)";
                });
                App._btn.forEach((btn) => {
                    btn.addEventListener("mouseout", (e) => {
                        btn.style.transform = "translate(0,0)";
                    });
                });
            });
            // Mise en place du scroll horizontal
            App._projectsWrapper.addEventListener("wheel", (e) => {
                e.preventDefault();

                App._projectsWrapper.scrollLeft += e.deltaY * 5;
            });
            // Mise en place de la copie du cv
            if (App._copyBtn) { // ajout de cette vérification
                App._copyBtn.addEventListener("click", App.setClipboard);
            }
        },
        /**
         * Calcule la longueur du path
         * @param {*} path
         * @returns la longueur du path
         */
        lengthPath: (path) => {
            let pathLength = path.getTotalLength();
            path.style.strokeDasharray = pathLength + " " + pathLength;
            path.style.strokeDashoffset = pathLength;
            return pathLength;
        },
        /**
         * Affiche le svg en fonction du scroll
         * @param {*} pathVar
         */
        scrollPath: (pathLength, pathVar) => {
            let scrollPercentage =
                (document.documentElement.scrollTop + document.body.scrollTop) /
                (document.documentElement.scrollHeight -
                    document.documentElement.clientHeight);
            let drawLength = pathLength * scrollPercentage;
            // Empêche le retour en arrière du SVG
            let curOffset = parseFloat(pathVar.style.strokeDashoffset);
            pathVar.style.strokeDashoffset = Math.min(
                curOffset,
                pathLength - drawLength
            );
        },
        /**
         * Gestion du menu burger
         */
        toggleMenu: () => {
            App._burger.classList.toggle("active");
            setTimeout(() => {
                App._burgerMenu.classList.toggle("active");
            }, 200);
        },
        /**
         * Désactivation du scroll quand ouverture du menu
         */
        disabledScroll: () => {
            document.documentElement.classList.toggle("scroll-disabled");
        },
        /**
         * Déplacement du cursor
         * @param {*} e
         */
        cursorMove: (e) => {
            App._cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
            const x = e.clientX;
            const y = e.clientY;
            App._cursor2.style.left = x + "px";
            App._cursor2.style.top = y + "px";
        },
        /**
         * Le maintient du clic permet d'ajouter le visuel du cursor
         */
        cursorEvent: () => {
            App._cursor.classList.toggle("cursor-event");
        },
        /**
         * Copie du cv dans le presse-papiers
         */
        setClipboard: () => {
            let url = `${window.location.host}/assets/files/cv-theo-martin.pdf`;
            navigator.clipboard.writeText(url).then(() => {
                App._tooltip.classList.add("show");
                setTimeout(() => {
                    App._tooltip.classList.remove("show");
                }, 1500);
            });
        },
    };
    window.addEventListener("DOMContentLoaded", App.app_init);
})();
