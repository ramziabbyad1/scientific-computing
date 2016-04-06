import {Component, Input} from 'angular2/core';
import {Group} from './group';
import {ComparisonScaleComponent} from './comparison-scale.component';
@Component({
	selector: 'comparison-group',
	directives: [ComparisonScaleComponent],
	template: `
	<div *ngIf="group" class="group">
		<h3>{{group.title}}</h3>
		<div *ngFor="#left of group.members; #row=index;">
			<div *ngFor="#right of group.members.slice(row+1)">
				<comparison-scale 
						[pair]="{left: left.title, right: right.title, id:left.key+''+right.key }">
				</comparison-scale>
			</div>
		</div>
	</div>
	`
})

export class ComparisonGroupComponent {
	@Input() group: Group;
}