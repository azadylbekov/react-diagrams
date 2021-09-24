import React from 'react'
import ReactDOM from 'react-dom';

import { BodyWidget } from './components/BodyWidget';
import { Application } from './Application';

const App = () => {
	const trayWidgetData = [
		{ id: 1, name: "In node here", color: 'rgb(255, 0, 0)', type: 'in' },
		{ id: 2, name: "Out node here", color: 'rgb(0, 255, 0)', type: 'out' },
		{ id: 3, name: "in node again", color: 'rgb(0, 0, 255)', type: 'in' }
	]
	const modelData = [
		{
			nodeName: 'Apple with in port', color: 'red', portType: 'in', portName: 'in port'
		},
		{
			nodeName: 'Apple with out port', color: 'green', portType: 'out', portName: 'out port'
		},
		{
			nodeName: 'Banana with in port', color: 'red', portType: 'in', portName: 'out port'
		},
		{
			nodeName: 'Banana with out port', color: 'green', portType: 'out', portName: 'out port'
		},
		{
			nodeName: 'Orange with in port', color: 'red', portType: 'in', portName: 'in port'
		},
		{
			nodeName: 'Orange with out port', color: 'green', portType: 'out', portName: 'out port'
		},
		{
			nodeName: 'Cherry with in port', color: 'red', portType: 'in', portName: 'in port'
		},
	]

	let app = new Application(modelData);
	return <BodyWidget app={app} modelData={modelData} trayWidgetData={trayWidgetData} />;
};

ReactDOM.render(
	<App />,
	document.getElementById('root')
);