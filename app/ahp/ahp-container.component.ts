import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AHPIntro} from './ahp-intro.component';


@Component({
	template: `
		<a [routerLink]="['Intro']">Introduction</a>
		<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES]
})
/*		<a [routeLink]="['Hierarchy']">Build a hierarchy</a>
*/
@RouteConfig([
	{path: '/intro', name: 'Intro', component: AHPIntro, useAsDefault: true}
])

export class AHPComponent {
	title = "AHP Component bonjour!"
}