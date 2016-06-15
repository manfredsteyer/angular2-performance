import { Component, Input, OnInit, DynamicComponentLoader, Injector, ChangeDetectorRef } from '@angular/core';
import {ControlValueAccessor, NgControl } from '@angular/common';


@Component({
    selector: 'control-wrapper',
    template: '<span id="control"></span>'
})
export class ControlWrapperComponent 
                    implements OnInit, ControlValueAccessor {
    
    constructor(
        private c: NgControl, 
        private dcl: DynamicComponentLoader, 
        private injector: Injector) {
        
        c.valueAccessor = this;
    }
    
    @Input() metadata;
    
    innerComponent: any;
    innerComponentChangeDetectorRef: ChangeDetectorRef;
    value: any;
    
    ngOnInit() {
        this.dcl.loadAsRoot(this.metadata.control, '#control', this.injector)
            .then(compRef => {
                this.innerComponent                  = compRef.instance;
                this.innerComponentChangeDetectorRef = compRef.changeDetectorRef;
                
                this.innerComponent.writeValue(this.value);
                compRef.changeDetectorRef.detectChanges();
                
                this.innerComponent.registerOnChange((value) => {
                    this.value = value;
                    this.onChange(value); 
                });
                this.innerComponent.registerOnTouched(() => {
                    this.onTouched();
                })
                
            });
    }
    
    writeValue(value: any) {
        this.value = value;
        if (this.innerComponent) {
            this.innerComponent.writeValue(value);
            this.innerComponentChangeDetectorRef.detectChanges();
        }
    }
    
    onChange = (_) => {};
    onTouched = () => {};
    registerOnChange(fn): void { this.onChange = fn; }
    registerOnTouched(fn): void { this.onTouched = fn; }
    
}