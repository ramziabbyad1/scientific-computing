import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AHPComponent} from './ahp/ahp-container.component';

@RouteConfig([
/*	{
		path: './about',
		name: 'About',
		//component: AboutComponent,
		useAsDefault: true
	},*/
	{
		path: '/ahp/...',
		name: 'AHP',
		component: AHPComponent
	}
])

@Component({
	selector: 'my-app',
	template: 	`
		<a [routerLink]="['AHP']">Decisions Decision</a>
		<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {

}