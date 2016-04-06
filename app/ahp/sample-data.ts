import {HierarchyNode} from './hierarchy-node';
export const SAMPLE_H: HierarchyNode<string> ={
	data: '11',
	level: 0,
	adjacent: [
		{data: '21', level: 1, adjacent:null},
		{ data: '22', level: 1, adjacent: null }
	]
};
export const SAMPLE_H2: string[] = [
	'11',
	'11.21',
	'11.22',
	'11.21.31',
	'11.21.32',
	'11.21.33',
	'11.22.34',
	'11.22.35',
	'11.21.31.41',
	'11.21.31.42',
	'11.21.31.43',
	'11.21.31.44',
	'11.21.32.45',
	'11.21.32.46',
	'11.22.35.47'
];
export const MARRIAGE_CRITERIA: {id: string, title: string}[] = [
	{ id: '11', title: 'Decision' },
	{ id: '11.21', title: 'Decision.Expenses' },
	{ id: '11.22', title: 'Decision.Leisure Time' },
	{ id: '11.23', title: 'Decision.Stability' }
];

export const MARRIAGE_CRITERIA_DETAILED: { id: string, title: string }[] = [
	{ id: '11', title: 'Decision' },
	{ id: '11.21', title: 'Decision.Expenses' },
	{ id: '11.22', title: 'Decision.Life Style' },
	{ id: '11.23', title: 'Decision.Stability' },
	{ id: '11.21.31', title: 'Decision.Expenses.Benefits' },
	{ id: '11.21.32', title: 'Decision.Expenses.Wedding related costs' },
	{ id: '11.22.33', title: 'Decision.Life Style.Children' },
	{ id: '11.22.34', title: 'Decision.Life Style.Leisure Time' },
];
/*<tr><th>Pros < /th><th></th > <th>Cons < /th></tr >
<tr><td>Criterium A< /td><td>Tax Benefits</td > <td><em>&lt; </em></td> <td>Wedding Ring expense< /td></tr >
<tr><td>Criterium B< /td><td>Children</td > <em>&gt; </em><td>Less free time</td> </tr>
< tr > <td>Criterium C< /td><td>Stability</td > <em>&gt; </em><td>Commitment</td> </tr>
< tr > <td>Count < /td><td>2</td > <td></td><td>1</td> </tr>
< /table>*/
//export SAMPLE_H;