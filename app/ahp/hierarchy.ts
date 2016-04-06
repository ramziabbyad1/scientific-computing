import {Path} from './path';
import {Level} from './level';
import {Group} from './group';
export class Hierarchy {
	private _levels: Level<Path>[];
	private _paths: Path[];
	private _groups: Group[];
	public static separator = '.';
	constructor(private _pathData: any[]) {
		this._paths = _pathData.map(
			path => path.title ? new Path(path.id, Hierarchy.separator, path.title) : new Path(path, Hierarchy.separator)
		);
		this._levels=this.initLevels(this._paths);
		this._groups = this.initGroups(this._levels);
		console.log(this._groups);
	}

	get groups() { return this._groups;}
	set groups(groups: Group[]) { this._groups = groups;}

	initGroups(levels: Level<Path>[]): Group[] {
		let groups: Group[] = [];
		levels.forEach(level => {
			let group: Group;
			let i: number = 0;
			let lev: Path[] = level.level;
			while (i < lev.length) {
				group = { title: lev[i].getParentTitle(), members: [lev[i]] };
				//group.members.push(lev[i]);
				while(lev[i+1] && lev[i].getParent() === lev[i+1].getParent()){
					group.members.push(lev[i+1]);
					i++;
				}
				groups.push(group);
				i++;
			}
			//group.members.push(lev[lev.length-1]);
		});
		return groups;
	}

	get levels(): Level<Path>[] {
		return this._levels;
	}

	set levels(levels: Level<Path>[]) {
		this._levels = levels;
	}

	initLevels(_paths: Path[]) {
		let levels: Level<Path>[] = [];
		for (var i = 0; i < _paths.length; i++) {
			let path = _paths[i];
			let pathLength = path.length();
			let level = levels[pathLength - 1];
			if(level) {
				level.level.push(path);
			}
			else {
				levels[pathLength - 1] = { level: [path] };
			}
		}
		return levels;
	}


	getPaths() {
		return this._paths;
	}
}