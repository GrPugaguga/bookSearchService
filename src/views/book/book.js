import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import './book.css';

export class BookView extends AbstractView {
    constructor(appState) {
        super();
        this.setTitle('Книга');
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
    }

    destroy() {
        onChange.unsubscribe(this.appState)
    }

    appStateHook(path) {
        if (path == 'favorites') {
            this.render()
        }
    }

    #deleteFromFavorites() {
        this.appState.favorites = this.appState.favorites.filter(
            e => e.key !== this.appState.book.key
        )
    }

    #addToFavorites() {
        this.appState.favorites.push(this.appState.book);
    }


    render() {
        console.log(this.appState.book)
        const existInFavorites = this.appState.favorites.find(
            (e) => e.key === this.appState.book.key
        )
        const main = document.createElement("div");
        if (this.appState.book.title) {
            this.app.innerHTML = `
                <h2>${this.appState.book.title}</h2>
                <div class="book__category">
                    <div class="book__image">
                    <img src="https://covers.openlibrary.org/b/isbn/${this.appState.book.isbn ? this.appState.book.isbn[0] : "9780836924107"}-M.jpg" alt="Обложка"/>    
                </div>
                
                    <div class="book__info">
                    <div>
                        Author : <span>${this.appState.book.author_name ? this.appState.book.author_name : "Не задано"}</span>
                    </div>
                    <div>
                        Category : <span>${this.appState.book.subject ? this.appState.book.subject[0] : "Не задано"}</span>
                    </div>
                    <div>
                        First publish year : <span>${this.appState.book.first_publish_year ? this.appState.book.first_publish_year : "Не задано"}</span>
                    </div>
                    <div>
                        Number of pages : <span>${this.appState.book.number_of_pages_median ? this.appState.book.number_of_pages_median : "Не задано"}</span>
                    </div>
                    <div>
                    <button class="book__button ${existInFavorites ? 'book_button__active' : ''}">
                    ${existInFavorites ? 'В избранном' : ' В избранное'}
                </button>
                </div>
                    </div>
                    
                </div>
                <div class="book__description">
                <h4>Description:</h4>
                A ${this.appState.book.title} is the first novel in A Song of Ice and Fire, a series of fantasy novels by the ${this.appState.book.author_name}. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award. The novella Blood of the Dragon, comprising the Daenerys Targaryen chapters from the novel, won the 1997 Hugo Award for Best Novella. In January 2011, the novel became a New York Times Bestseller and reached No. 1 on the list in July 2011.
                </div>
                <h4>Tags:</h4>
                <div class="book__tags">
                    <div class="book__tag">${this.appState.book.subject ? this.appState.book.subject[1] : "Не задано"}</div>
                    <div class="book__tag">${this.appState.book.subject ? this.appState.book.subject[2] : "Не задано"}</div>
                    <div class="book__tag">${this.appState.book.subject ? this.appState.book.subject[3] : "Не задано"}</div>
                    <div class="book__tag">${this.appState.book.subject ? this.appState.book.subject[4] : "Не задано"}</div>
                    <div class="book__tag">${this.appState.book.subject ? this.appState.book.subject[5] : "Не задано"}</div>
                </div >
            `;
        } else {
            this.app.innerHTML = `
            <h2> Ошибка, книга не найдена... </h2>
            `
        }

        this.renderHeader();
        this.app.append(main);

        if (existInFavorites) {
            this.app
                .querySelector('button')
                .addEventListener('click', this.#deleteFromFavorites.bind(this))
        } else {
            this.app
                .querySelector('button')
                .addEventListener('click', this.#addToFavorites.bind(this))
        }



    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header)
    }
}