import { DivComponent } from "../../common/div-component.js";
import { Card } from "../card/card.js";
import { OffsetPage } from "../offsetPage/offsetPage.js";
import './card-list.css';


export class CardList extends DivComponent {
    constructor(appState, parentState) {
        super();
        this.appState = appState;
        this.parentState = parentState;
    }

    render() {
        if (this.parentState.loading) {
            this.el.innerHTML = `
            <div class="card_list__loader">
            loading..
            </div>
            `
            return this.el
        }
        for (const card of this.parentState.list.slice(0, 9)) {
            console.log(card)
            console.log("//")
        }

        console.log(this.parentState.list.slice(0, 8))

        this.el.innerHTML = `
        <h1> Найдено книг: ${this.parentState.numFound} <h1>
        `;

        if (location.hash == '#favorites') {
            this.el.innerHTML = ` <h1>Избранные книги</h1>`;
            this.parentState.list = this.appState.favorites
        }

        const cardGrid = document.createElement('div');
        cardGrid.classList.add('card_grid');
        this.el.append(cardGrid);

        for (const card of this.parentState.list.slice(this.parentState.offset, this.parentState.offset + 12)) {
            cardGrid.append(new Card(this.appState, card).render())
        }

        if (this.parentState.list.length > 12) {
            this.el.append(new OffsetPage(this.parentState).render());
        }


        return this.el
    }
}