export class Criterium {
	private static _lastId: number = 0;
	private _id: number;
	private _key: string;
	private _pathString: string;
	private _pathArr: string[];
	constructor() {
		this._id = Criterium._lastId+1;
		Criterium._lastId++;
	} 
	
}