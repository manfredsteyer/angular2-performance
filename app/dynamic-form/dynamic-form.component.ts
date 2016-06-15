import { Component, Input } from '@angular/core';
import { ControlWrapperComponent} from '../control-wrapper/control-wrapper.component';

@Component({
    selector: 'dynamic-form',
    template: require('./dynamic-form.component.html'),
    directives: [ControlWrapperComponent]    
})
export class DynamicFormComponent {
    
    @Input() formMetaData;
    
}