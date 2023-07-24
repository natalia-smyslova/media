export default class TimelineTable {
    constructor(container) {
        this.container = container;
        this.memory = [];
    }

    static get markup() {
        return `
        <div class="messages">
        <div class="message">
        <div class="message-group">
        <div class="message-data">Date</div>
        <div class="message-content">Content</div>
        <div class="message-footer">
        <div class="coords">Coords</div>
        <div class="views">Views</div>
        </div>
        </div>
        </div>
        </div>
        `;
    }
    static get views() {
        return '.views';
    }

    bindToDom() {
        this.container.innerHTML = TimelineTable.markup;
        this.views = this.container.querySelector(TimelineTable.views);
    }

    // Какой-то метод, создающий из массива memories дивы с сообщениями 

    createMemories() {

    }
}