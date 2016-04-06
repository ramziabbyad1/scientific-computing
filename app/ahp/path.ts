export class Path {
	/*	private _pathString: string;
		private _separator: string;*/
	private _key: string;
	private _title: string;
	private _keyArray: string[];
	private _titleArray: string[];
	private _length: number;
	constructor(
		private _pathString: string,
		private _separator: string,
		private _titleString?: string) {
		this.initPath(_pathString, _separator, _titleString);
	}
	public initPath(_pathString: string, _separator: string, _titleString?: string) {
		let _keyArray = this._initKeyArray(_pathString, _separator);
		this._setLength(_keyArray);
		this._initTitleArray(_titleString, _separator);
	}
	private _initTitleArray(_titleString: string, _separator: string): void {
		this._titleArray = _titleString.split(_separator);
		this._title = this._titleArray[this._titleArray.length-1];
	}
	get title() {
		return this._title;
	}

	private _setLength(_keyArray: string[]) {
		this._length = _keyArray.length;
	}
	public length(): number {
		return this._length;
	}
	public setPathString(pathString: string) {
		this._pathString = pathString;
	}
	public getPathString() {
		return this._pathString;
	}
	public get key() {
		return this._keyArray[this._keyArray.length - 1];
	}
	public set key(key: string){
		console.log('setting key..');
		this._key = key;
	}
	private _initKeyArray(_pathString: string, _separator: string) {
		if(_pathString) {
			this._keyArray = _pathString.split(_separator);
		}
		return this._keyArray;
	}
	public getParent() {
		if(this.length() > 1) {
			return this._keyArray[this.length() - 2];
		}
		return null;
	}
	public getParentTitle(): string {
		if(this.length() > 1) {
			return this._titleArray[this.length() - 2];
		}
		return null;
	}
}