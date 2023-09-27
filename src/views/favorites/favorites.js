import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { CardList } from "../../components/cardList/card-list.js";

export class FavoritesView extends AbstractView {

    state = {
        list: [],
        numFound: 0,
        loading: false,
        searchQuery: undefined,
        offset: 0
    }

    constructor(appState) {
        super();
        this.setTitle('Поиск книг');
        this.appState = appState;
        this.state.numFound = this.appState.favorites.length;
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
        this.state = onChange(this.state, this.stateHook.bind(this))

    }

    destroy() {
        onChange.unsubscribe(this.appState)
    }

    stateHook(path) {
        if (path == "offset") {
            this.render()
        }
    }

    appStateHook(path) {
        if (path == 'favorites') {
            this.state.numFound = this.appState.favorites.length;
            this.render()
        }
    }


    render() {

        const main = document.createElement("div");
        main.append(new CardList(this.appState, this.state).render())
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header)
    }
}