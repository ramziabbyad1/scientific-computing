import {Component, Input} from 'angular2/core';
import * as d3 from 'D3';
import {ComparisonGroupComponent} from './comparison-group.component';
import {Group} from './group';

@Component({
	selector: 'pw-comparisons',
	directives: [ComparisonGroupComponent],
	template: `
		<p>Hola from ComparisonForm!</p>
		<div *ngIf="groups">
			<div *ngFor="#group of groups">
					<comparison-group [group]="group"></comparison-group>
			</div>
		</div>
	`	
})

export class ComparisonFormComponent {
	@Input() groups: Group[];
	constructor(){
		console.log(d3);
	}
	
}