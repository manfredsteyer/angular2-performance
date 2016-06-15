import { Flug } from '../entities/flug';
import { EventEmitter, Input, Output, Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'flug-card',
    template: require('./flug-card.component.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlugCard {
    
    @Input() item: Flug;
    @Input() selectedItem: Flug;
    @Output() selectedItemChange = new EventEmitter();
    
    select() {
        this.selectedItemChange.emit(this.item);
    }
}