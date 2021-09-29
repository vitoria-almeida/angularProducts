import { Component, Input, OnChanges, EventEmitter, Output } from "@angular/core";


@Component ({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges{
    @Input() rating: number = 0;
    cropWidth: number = 75;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>()

    ngOnChanges(): void {
        this.cropWidth = this.rating * 75/5
    }

    clickMethod(): void {
        console.log(`foiiiiiii ${this.rating} foi clicadaa`)
    }

    anotherClickMethod(): void {
        this.ratingClicked.emit(`The ${this.rating} product was clicked!`)
    }
}