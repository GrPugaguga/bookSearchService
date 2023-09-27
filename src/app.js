import { BookView } from "./views/book/book.js";
import { FavoritesView } from "./views/favorites/favorites.js";
import { MainView } from "./views/main/main.js";


window.onbeforeunload = function () {
    return true;
};

class App {
    routes = [
        { path: "", view: MainView },
        { path: "#favorites", view: FavoritesView },
        { path: `#book`, view: BookView }
    ];
    appState = {
        favorites: [],
        book: {}
    }

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));
        this.route();
    }



    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }
        const view = this.routes.find(el => el.path == location.hash).view;
        this.currentView = new view(this.appState);
        this.currentView.render();

    }


}

new App();

