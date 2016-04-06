import {Component, Input, AfterViewInit, Output, EventEmitter} from 'angular2/core';
import * as jsPlumb from 'jsplumb'; 
import {Level} from './level';
import {HierarchyNode} from './hierarchy-node';
import {Hierarchy} from './hierarchy';
import {HierarchyData} from './hierarchy-data';
import {Path} from './path';

@Component({
	//inputs: ['hierarchy'],
	selector: 'sample-hierarchy',
	//template: '<div *ngIf="hierarchy">hierarchy goes here!</div>'
	styleUrls: ['app/ahp/hierarchy-form.css'],
	template: `
	<div *ngIf="plumbContainerId" id="{{plumbContainerId}}" style="position: relative;">
		<div *ngIf="hierarchy">
			<table>
				<tr *ngFor="#level of levels; #row=index" style="height: 100px;">
					<td *ngFor="#node of level.level; #col=index" style="width: 200px;">
					<input *ngIf="node" id="{{plumbContainerId+'-'+node.key}}" [ngModel]="node.title" />
					</td>
					<td>Level {{row}}</td>
				</tr>
			</table>
		</div>
	</div>
	`
})

export class HierarchyFormComponent implements AfterViewInit{
	_levels: Level<Path>[];
	_hierarchy: Hierarchy;
	_maxSize: number;
	sizeArr: number[];
	_plumbContainerId: string;
	private _levelsStream: HierarchyNode<string>[];
	private _plumber;
	_hierarchyData: HierarchyData;
	@Output() formReady = new EventEmitter<any>();
	constructor() {
		
	}
	set plumber(plumber: any) {
		this._plumber = plumber;
	}
	get plumber() {
		return this._plumber;
	}
	@Input() 
	set hierarchyData(data: HierarchyData) {
		this._hierarchyData = data;
		this.hierarchy = data.hierarchy;
		this.plumbContainerId = data.containerId;
	} 
	ngAfterViewInit() {
		console.log('containerId');
		console.log(this.plumbContainerId);
		console.log(jsPlumb);
		//this.ngZone.run( (() =>{
		this._plumber = jsPlumb.getInstance({
			Container: this.plumbContainerId,
			Endpoint: ['Dot', { radius: 1 }]
		});
		this._plumber.batch(
			() => this.drawBranches(this.levels, this.plumbContainerId)
		);
		console.log('this.plumber');
		console.log(this.plumber);
		console.log('this._plumber');
		console.log(this.plumber);
		this.formReady.emit(this.plumber);
	//}).bind(this));
		
	}
	drawBranches(levels: Level<Path>[], containerId: string): void {
		this._plumber.setContainer(document.getElementById(containerId));
		levels.forEach(
			level => {
				level.level.forEach(
					node => {
						if(node && node.getParent()) {
							this._plumber.connect({
								source: containerId+'-'+node.getParent(),
								target: containerId + '-' + node.key,
								connector: ['Straight'], 
								anchor: ['Perimeter', {shape: 'Rectangle'}]
							});
						}
					}
				);
			}
		);
	}
	get plumbContainerId() { return this._plumbContainerId;}
	set plumbContainerId(id: string) {
		this._plumbContainerId = id;
	}

	set hierarchy(hierarchy: Hierarchy) {
		this._hierarchy = hierarchy;
		this.levels = hierarchy.levels;
		console.log(jsPlumb); 
		console.log('hierarchy');
		console.log(hierarchy);
		console.log('reduce stream test');
		/*let stream = ['A', 'A', 'A', 'B', 'B', 'B', 'B'];
		let stream2 = ['A', 'A', 'A', 'C', 'C', 'C', 'C', 'C', 'B', 'B', 'B', 'B'];
		let res = this._reduceStream(stream2);
		console.log(stream2);
		console.log(res);
		let maxSize = this.getMaxSize(this.levels);
		console.log('maxSize = '+maxSize);*/
	}
	get hierarchy() {		
		return this._hierarchy;
	}
	/*
		Design note: instead of padded levels just include the position with 
		the node itself for rendering
	*/
	get levels(): Level<Path>[] { return this._levels; }
	set levels(levels: Level<Path>[]) { 
		console.log('getting levels');
		console.log(levels);
		console.log(this.getMaxSize(levels));
		let maxSize = this.getMaxSize(levels);
		let ranges = this.getRanges(levels, maxSize);
		this._levels = this.padLevels(levels, maxSize, ranges);
		console.log('padded levels');
		console.log(this._levels);
	}
	padLevels(levels: Level<Path>[], maxSize: number, ranges: { key: string, start: number, end: number }[][]) 
		: Level<Path>[] {
		let arr: Level<Path>[]= [];
		for (let i = 0; i < levels.length; i++) {
			let sub: Path[] = [];
			for (let j = 0; j < maxSize; j++) {
				sub.push(null);
			} 
			arr.push({level: sub});
		}
		ranges.forEach(
			(range, levelInd) => {
				range.forEach(
					(obj, keyInd) => {
						let index: number = obj.start + (obj.end - obj.start)/2;
						index = Math.floor(index);
						arr[levelInd].level[index] = levels[levelInd].level[keyInd];
					}
				);
			}
		);
		return arr;
	}
	padLevels2(levels: Level<Path>[], ranges: number[][]) {
		ranges.forEach(function(value, index, array) { 
			let fillLeft: boolean = true;
			value.forEach(function(v, i, a) { 
				levels[index].level.fill(null, v[0], v[1]);
			});
		}, this);
	}
	getRanges(levels: Level<Path>[], maxSize: number): { key: string, start: number, end: number }[][] {
		let mid: number = maxSize >> 1;
		//let ranges: {root: number, size: number} = {root: maxSize, size: 1};
		let ranges: { key: string, start: number, end: number }[][] = [[{
			key: '11', 
			start: 0,
			end: maxSize
		}]];
		let index: number = 0;
		while(ranges.length < levels.length) {
			let levelsLen = levels[index + 1].level.length;
			let rangeStart: number = 0;
			let nextRangeList: { key: string, start: number, end: number }[] = [];
			let runningIndex: number = 0;
			for (var i = 0; i < ranges[index].length; i++) {
				let key: string = ranges[index][i].key;
				let adjNum: number = this._adjacencyCount[key];
				let start: number = ranges[index][i].start;
				let end: number = ranges[index][i].end;
				let chunk: number = end - start;
				chunk /= adjNum;
				for (let j = 0; j < adjNum; j++) {
					nextRangeList.push({
						key: levels[index + 1].level[runningIndex].key,
						start: start + chunk*j,
						end: start + chunk*(j+1)
					});
					runningIndex++;
				}
			}
			ranges.push(nextRangeList); 
			index++;
		}
		return ranges;		
	}
	//
	getRanges2(levels: Level<Path>[], maxSize: number): number[][][] {
		let ranges: number[][][] = [];
		for (var i = 0; i < levels.length; i++) {
			let level: Path[] = levels[i].level;
			let len = level.length;
			let rangeLen = maxSize / (len+1);
			console.log('rangeLen = ' + rangeLen);
			let rangeStart = 0;
			let rangeEnd = rangeLen;
			let currRange: number[][] = [];
			while(rangeEnd <= maxSize) {

				currRange.push([rangeStart, rangeEnd]);
				rangeStart = rangeEnd;
				rangeEnd += rangeLen;
			}
			ranges.push(currRange);
		}
		return ranges;
	} 

	getMaxSize(levels: Level<Path>[]): number {
		let max = -1;
		let maxCache = [1];
		levels.forEach(function(value, index, array){
			let level = value.level;
			if (index === 0) { max = level.length; }
			else {
				let parentList: string[] = [];
				level.forEach(function(v, i, a){
					parentList.push(v.getParent());
				});
				maxCache.push(
					this._getLargestParentLen(parentList) 
					* maxCache[index - 1]
				);

			}
		}, this);
		console.log('maxCache = ');
		console.log(maxCache);
		return maxCache.reduce((prev, curr) => Math.max(prev, curr));
	}

	private _getLargestParentLen(parentList: string[]): number {
		let largestParentLen = this._reduceStream(parentList);
		return largestParentLen;
	}

	private _adjacencyCount: {} = {};

	private _reduceStream(parentList: string[]) : number {
		let max = 0;
		let i = 0;
		while (i < parentList.length - 1) {
			let count = 1;
			while ( (i < parentList.length - 1)
				&& (parentList[i] == parentList[i + 1]) ) {
				i++;
				count++;
			}
			this._adjacencyCount[parentList[i]] = count;
			if (count > max) { 
				max = count;
				this._adjacencyCount['max'] = max;				
			}
			//i += (count - 1);
			i++;
		}
		if(!(parentList[parentList.length-1] in this._adjacencyCount)) {
			this._adjacencyCount[parentList[parentList.length - 1]] = 1;
		}
		return max;
	}

	getMaxSize2(levels: Level<Path>[]): number {
		console.log(levels[0].level.length);
		if (levels.length === 1) return 1;
		let sizeArr: number[] = levels.map(level => level.level.length);
		let max = sizeArr.reduce((prev, curr) => Math.max(prev, curr));
		return max;
	}

/*	initLevels(hierarchy: HierarchyNode<string>) {
		this.levels = [];
		var queue = [];
		queue.push(hierarchy);
		this.levels.push({'level': [hierarchy] });
		this.levels.push({ level: hierarchy.adjacent});
		while(queue.length > 0) { 
			var node = queue.pop();
			//this._levelsStream.push(node.level);
			var nextLevel = [];
			if (node.adjacent) {
				for (var i = 0; i < node.adjacent.length; i++) {
					queue.push(node.adjacent[i]);
					nextLevel.push(node.adjacent[i].adjacent);
				}
				console.log('nextLevel');
				console.log(nextLevel);
				this.levels.push([].concat.apply([], nextLevel));
			}
		}
		window.console.log(this.levels);
	}

	private _interpretStream(levelStream: number[]) {
		var i = 0;
		while (i < levelStream.length) {
			var j = i;
			var currLevel = levelStream[j];
			while(levelStream[j] === currLevel) {
				j++;
			}

		}
	}*/

}