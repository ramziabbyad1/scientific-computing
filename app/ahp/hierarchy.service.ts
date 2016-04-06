import {Injectable} from 'angular2/core';
import {MARRIAGE_CRITERIA, MARRIAGE_CRITERIA_DETAILED, SAMPLE_H, SAMPLE_H2} from './sample-data';
import {Hierarchy} from './hierarchy';
@Injectable()
export class HierarchyService {
	private _hierarchyDataMap = {
		'test1-graphnode': SAMPLE_H,
		'test1-array' : SAMPLE_H2,
		'marriage': MARRIAGE_CRITERIA,
		'marriage-detailed': MARRIAGE_CRITERIA_DETAILED
	}
	getRootedSampleData() {
		return SAMPLE_H;
	}
	getArraySampleData(): string[] {
		return SAMPLE_H2;
	}
	
	getSampleHierarchy(): Hierarchy {
		return new Hierarchy(this.getArraySampleData());
	}
	createHierarchyById(id: string) : Hierarchy {
		return new Hierarchy(this.getDataById(id));
	}

	getDataById(id: string): any {
		return this._hierarchyDataMap[id];
	}
}