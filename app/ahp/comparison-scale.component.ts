import {Component, AfterViewInit, Input} from 'angular2/core';
import * as d3 from 'D3';

@Component({
	selector: 'comparison-scale',
	styleUrls: ['app/ahp/comparison-scale.css'],
	template: `
	<div *ngIf="pair">
		<div id="compare-container-{{pair.id}}">
			<label>Drag the circle to idicate the weights of the two criteria.</label>
			<div class="left">{{pair.left}}</div> <div class="right">{{pair.right}}</div>
		</div>
	</div>
	`
})

export class ComparisonScaleComponent implements AfterViewInit{
	LOW: number= -9;
	HIGH: number = 9;
	margin: { LEFT: number, RIGHT: number, TOP: number, BOTTOM: number } = {
		TOP: 50,
		BOTTOM: 50,
		LEFT: 50,
		RIGHT: 50
	}
	width: number = 600 - this.margin.LEFT - this.margin.RIGHT;
	height: number = 300 - this.margin.TOP - this.margin.BOTTOM;
	 _pair: { left: string, right: string, id: string };
	containerIdSelector: string;
	get pair() {
		return this._pair;
	}
	@Input()
	set pair(pair: { left: string, right: string, id: string }) {
		this._pair = pair;
		this.containerIdSelector = '#compare-container-'+pair.id;
	}
	constructor() {
		console.log(d3);
	}
	ngAfterViewInit() {
		this.drawScale();
	}
	drawScale(): void {
		this.setOrdinalScale();
		this.setBrush();
		this.renderSvg();
		this.renderSlider();
		this.renderHandle();
		//this.runSliderIntro();

	}
	xDomain(low: number, high: number): string[] {
		let domain: string[] = [];
		for (var i = low; i <= high; i++)
			domain.push(i.toString());
		return domain;
	} 
	domain: string[] = this.xDomain(this.LOW, this.HIGH);
	ordinalScale: d3.scale.Ordinal<string, number>;
	brush;
	handle;
	svg;
	setOrdinalScale(): void {
		this.ordinalScale=d3.scale.ordinal()
			.domain(this.domain)
			.rangeRoundPoints([0, this.width]);
		this.ordinalScale.invert = this.invertX.bind(this);
	}

	x() {
		return this.ordinalScale;
	}
	invertX(rangeVal: number):string {
		for (var j = 0; this.ordinalScale.range()[j] < rangeVal; j++) { }
		return this.ordinalScale.domain()[j];
	}
	setBrush(): void {
		this.brush = d3.svg.brush()
			.x(this.ordinalScale)
			.extent([0, 0])
			.on("brush", this.brushed.bind(this, [this.brush]));
			//d3.scale.
	}
	slider;
	renderSlider() {
		this.slider = this.svg.append("g")
			.attr("class", "slider")
			.call(this.brush);
		this.slider.selectAll(".extent,.resize")
			.remove();

		this.slider.select(".background")
			.attr("height", this.height);
	}
	renderHandle() {
		this.handle = this.slider.append("circle")
			.attr("class", "handle")
			.attr("transform", "translate(0," + this.height / 2 + ")")
			.attr("r", 9);
	}
	runSliderIntro() {
		this.slider
			.call(this.brush.event)
			.transition() // gratuitous intro!
			.duration(750)
			.call(this.brush.extent([0, 0]))
			.call(this.brush.event);
	}
	renderSvg() {
		this.svg = d3.select(this.containerIdSelector).append("svg")
			.attr("width", this.width + this.margin.LEFT + this.margin.RIGHT)
			.attr("height", this.height + this.margin.LEFT + this.margin.RIGHT)
			.append("g")
			.attr("transform", "translate(" + this.margin.LEFT + "," + this.margin.TOP + ")");

		this.svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + this.height / 2 + ")")
			.call(d3.svg.axis()
				.scale(this.ordinalScale)
				.orient("bottom")
				//.tickValues([...xDomain(-9,9)])
				.tickFormat(function(d) {
					d = +d;
					return d < -1 ? (1 + '/' + (-d)) : (d === -1 ? 1 : d);
				})
			)
			/*.tickSize(0)
			.tickPadding(12))*/
			.select(".domain")
			.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
			.attr("class", "halo");
	}
	brushed(context){
		/*console.log('event target');
		console.log(this.brush);*/
		var value = (this.brush.extent()[0] == NaN) ? 0 : this.brush.extent()[0];

		if (window.event) { // not a programmatic event
			value = this.ordinalScale.invert(d3.mouse(this.slider.node())[0]);
			this.brush.extent([value, value]);
		}
		let valueNum = +value;
		valueNum += 9;
		//valueNum = valueNum < 0 ? -valueNum : valueNum+9; 
		let h = (valueNum / 18) * 120;
		let l = .5 - (valueNum / 19) * .25;
		let s = .8;
		this.handle.attr("cx", this.ordinalScale(value));
		d3.select(this.containerIdSelector).style("background-color", d3.hsl(h, s, l).toString());
	}
}