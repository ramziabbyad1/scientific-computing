import {Component, OnInit, AfterViewInit} from 'angular2/core';
import {HierarchyFormComponent} from './hierarchy-form.component';
import {HierarchyService} from './hierarchy.service';
import {GraphNode} from './graph-node';
import {Hierarchy} from './hierarchy';
import {HierarchyData} from './hierarchy-data';
import {ComparisonFormComponent} from './comparison-form.component';
import * as jsPlumb from 'jsplumb'; 
import {Group} from './group';

@Component({
	templateUrl: 'app/ahp/ahp-intro.component.html',
	directives: [
		HierarchyFormComponent,
		ComparisonFormComponent
	],
	providers: [HierarchyService]
})

export class AHPIntro implements OnInit, AfterViewInit{
	//sampleHierarchy: GraphNode<string>;

	simpleHierarchyData: HierarchyData;
	detailedHierarchyData: HierarchyData;
	comparisonGroups: Group[];
	//hierarchies: QueryList<HierarchyFormComponent>;
	constructor(private _hierarchyService: HierarchyService
		) {
	//	this.hierarchies = _hierarchies;
		
	}
	ngOnInit() {
		this.simpleHierarchyData = {
			containerId: 'simple-marriage',
			hierarchy: this._hierarchyService.createHierarchyById('marriage')
		};
		this.detailedHierarchyData = {
			containerId: 'detailed-marriage',
			hierarchy: this._hierarchyService.createHierarchyById('marriage-detailed')
		};
		//this._hierarchyService.setHierarchyRoot(sample_h_node);
		console.log('logging simple h node');
		console.log(this.simpleHierarchyData);
		console.log('logging detailed h node');
		console.log(this.detailedHierarchyData);
		
		console.log('plumb');
		console.log(jsPlumb);

		this.comparisonGroups = this.detailedHierarchyData.hierarchy.groups;
		console.log('setting comparison groups'); 
		console.log(this.comparisonGroups);
	}
	ngAfterViewInit() {
		console.log('initing content');
		console.log('jsPlumb');
		console.log(jsPlumb);
		//console.log(this.hierarchies);
		window.onresize = (e => {
			this.plumbers.forEach(p => p.repaintEverything())
		}).bind(this);
	}
	plumbers: any[] = [];
	repaint(plumber: any) {
		console.log('repainting');
		this.plumbers.push(plumber);
	}
}
	