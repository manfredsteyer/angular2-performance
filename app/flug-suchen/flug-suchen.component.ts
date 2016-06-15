import { Http, URLSearchParams, Headers } from '@angular/http'
import { Flug } from '../entities/flug';
import { Component, ChangeDetectionStrategy} from '@angular/core';
import { FlugService} from '../services/flug.service';
import { OrtPipe } from '../pipes/ort.pipe';
import { FlugCard} from '../flug-card/flug-card.component';
import { DateControlComponent} from '../date-control/date-control.component';
import { OrtValidatorDirective } from '../validators/ort-validator-directive';
import { ROUTER_DIRECTIVES } from '@angular/router';


const APP_DIRECTIVES = [
    DateControlComponent,
    FlugCard,
    OrtValidatorDirective  
];

@Component({
    selector: 'flug-suchen', // <flug-suchen></flug-suchen> 
    template: require('./flug-suchen.component.html'),
    //providers: [FlugService],
    pipes: [OrtPipe],
    directives: [APP_DIRECTIVES, ROUTER_DIRECTIVES],
    styles: [require("./flug-suchen.component.css")],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlugSuchenComponent {
    
    public von: string = "Graz";
    public nach: string = "Hamburg";
    public selectedFlug: Flug;
    
    public datum: string = (new Date()).toISOString();
 
    constructor(
        private flugService: FlugService) {
    }
    
    public get fluege() {
        return this.flugService.fluege;
    }
    
    public set fluege(fluege) {
        this.flugService.fluege = fluege;
    }

    public get fluege$() {
        return this.flugService.fluege$;
    }

    search() {
        return this
            .flugService
            .find(this.von, this.nach);
    }

    delay() {

        const ONE_MINUTE = 1000 * 60;

        let oldFlights = this.fluege;
        let oldFlight = oldFlights[0];
        let oldFlightDate = new Date(oldFlight.datum);

        let newFlightDate = new Date(oldFlightDate.getTime() + ONE_MINUTE * 15);
        let newFlight =  {
                id: oldFlight.id,
                abflugort: oldFlight.abflugort,
                zielort: oldFlight.zielort,
                datum: newFlightDate.toISOString()
        };
        let newFlights = [
            newFlight,
            ...oldFlights.slice(1, this.fluege.length)
        ];

        this.fluege = newFlights;

        this.fluege$.next(newFlights);

        // Mutable Counter-Part:
        //this.fluege[0].datum = newFlightDate.toISOString();

        console.debug("Änderung: " + (oldFlights != newFlights));
        console.debug("Änderung: " + (oldFlight != newFlight));

    }
    
    select(flug: Flug): void {
        this.selectedFlug = flug;
    }
    
}