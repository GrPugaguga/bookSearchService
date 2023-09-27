import { DivComponent } from "../../common/div-component.js";
import './card.css';


export class Card extends DivComponent {

    constructor(appState, cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
    }

    #deleteFromFavorites() {
        this.appState.favorites = this.appState.favorites.filter(
            e => e.key !== this.cardState.key
        )
    }

    #addToFavorites() {
        this.appState.favorites.push(this.cardState);
    }

    openBookView() {
        this.appState.book = this.cardState;
        console.log(this.appState.book)
        console.log(111 + 'bue!!')
    }

    render() {
        this.el.classList.add('card');
        const existInFavorites = this.appState.favorites.find(
            (e) => e.key === this.cardState.key
        )

        console.log(this.cardState)

        this.el.innerHTML = `
        <div class="card__image">
            <img src="https://covers.openlibrary.org/b/isbn/${this.cardState.isbn ? this.cardState.isbn[0] : "9780836924107"}-M.jpg" alt="Обложка"/>     
            </div>
        <div class="card__info">
            <div class="card__tag">
                ${this.cardState.subject ? this.cardState.subject[0] : 'Не задано'}
            </div>
            <a href="#book">
            <div class="card__name">
            ${this.cardState.title.substr(0, 70)}            
            </div>
            </a>
            <div class="card__author">
                ${this.cardState.author_name ? this.cardState.author_name[0] : 'Не задано'}
            </div>
            <div class="card__footer">
                <button class="button__add ${existInFavorites ? 'button__active' : ''}">
                ${existInFavorites
                ? '<img src="/static/favorites.svg" />'
                : '<img src="/static/favorites-white.svg" />'
            }
               </button>
            </div>
        </div>
        `
        if (existInFavorites) {
            this.el
                .querySelector('button')
                .addEventListener('click', this.#deleteFromFavorites.bind(this))
        } else {
            this.el
                .querySelector('button')
                .addEventListener('click', this.#addToFavorites.bind(this))
        }

        this.el.querySelector('a').addEventListener("click", this.openBookView.bind(this))


        return this.el
    }
}