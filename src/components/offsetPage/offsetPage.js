import { DivComponent } from "../../common/div-component.js";
import './offsetPage.css';


export class OffsetPage extends DivComponent {

    constructor(state) {
        super();
        this.state = state;
    }

    scrollTop() {
        window.scrollTo({
            top: 10,
            behavior: "smooth"
        })
    }

    render() {
        this.el.classList.add("offset__page");
        this.el.innerHTML = `
        <div class="offset__previous h4" >Предыдущая страница</div>
        <div class="offset__next h4">Следующая страница </div>
        `
        this.el
            .querySelector(".offset__previous")
            .addEventListener('click', () => {
                this.scrollTop();
                if (this.state.offset >= 11) {
                    this.state.offset = this.state.offset - 12;
                }
            })

        this.el
            .querySelector(".offset__next")
            .addEventListener('click', () => {
                this.scrollTop();
                if ((this.state.list.length - this.state.offset) > 11) {

                    this.state.offset = this.state.offset + 12;
                }

            })


        return this.el
    }

}