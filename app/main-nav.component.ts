import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';




@Component({
	selector: 'main-menu',
	template: `
		<a [routerLink]="['AHP']">Decisions Decision</a>
	`,
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS]
})

export class MainNavComponent {
	constructor(
		private _router: Router
	) {

	}

	gotoAHP() {
		this._router
			.navigate(['AHP']);
	}
}