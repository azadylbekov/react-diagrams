import createEngine, { DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './helpers/DemoCanvasWidget';
import './main.css'

const App = () => {

	const [nameValue, setNameValue] = useState("");
	const [subtitleValue, setSubtitleValue] = useState("");
	const [serialized, setSerialized] = useState({});
	//1) setup the diagram engine
	let engine = createEngine();

	//2) setup the diagram model
	let model = new DiagramModel();

	// model.registerListener({
	// 	nodesUpdated: (event) => { console.log(event) }
	// });

	//3-A) create a default node
	let node1 = new DefaultNodeModel({
		name: 'Node 1',
		color: 'rgb(0,192,255)'
	});
	node1.setPosition(100, 100);
	let port1 = node1.addOutPort('Out');

	//3-B) create another default node
	let node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
	let port2 = node2.addInPort('In');
	node2.setPosition(400, 100);

	// link the ports
	let link1 = port1.link<DefaultLinkModel>(port2);
	link1.getOptions().testName = 'Test';
	link1.addLabel('Hello World!');

	//4) add the models to the root graph
	model.addAll(node1, node2, link1);

	//5) load model into engine
	engine.setModel(model);

	// setSerialized(engine.getModel().serialize());
	console.log(serialized)

	let xCoord = 100;
	let yCoord = 200;

	const addNodes = (name: any, color: string = 'rgb(0,192,255)') => {
		xCoord += 100;
		let newNode = new DefaultNodeModel({
			name, color: color
		})
		newNode.setPosition(xCoord, yCoord)
		model.addNode(newNode)
		engine.setModel(model);
		// console.log('click');
		// console.log(name);
		// setSerialized(engine.getModel().deserialize());
		// engine = engine.getModel().deserialize()
		// console.log(engine.getModel().deserialize())
		console.log(model.getNodes());
		console.log(model.getLinks())
		// engine.recalculatePortsVisually();
		// engine.getDiagramEngine().recalculatePortsVisually()
		engine.repaintCanvas()

	}



	const handleSubmit = (e: any) => {
		e.preventDefault();
		addNodes(nameValue);
	}

	// useEffect(() => {
	// 	let nodes = localStorage.getItem('nodes')
	// 	if (nodes) {
	// 		console.log(serialized);
	// 		setSerialized(engine.getModel().serialize());
	// 	} else {
	// 		let emptyNodes: any[] = [];
	// 		localStorage.setItem('nodes', JSON.stringify(emptyNodes));
	// 	}
	// }, [])

	// useEffect(() => {
	// 	// let nodes = localStorage.getItem('nodes')
	// 	if (Object.keys(serialized).length !== 0) {
	// 		// let models: object = serialized.layers;
	// 		// console.log(serialized[key: string]:number );
	// 		// let models: number | string | undefined = serialized.layers[1].models;
	// 	}
	// 	// let models: object = serialized.layers;
	// }, [serialized])

	//6) render the diagram!
	return (
		<DemoCanvasWidget>
			<div className="container">
				<form className='add-node-form' onSubmit={handleSubmit}>
					<label className='add-node-item' htmlFor="name">
						Name
						<input
							type="text"
							placeholder='Name'
							id='name'
							onChange={(e: any) => { setNameValue(e.target.value) }}
							value={nameValue}
						/>
					</label>
					<label className='add-node-item' htmlFor="subtitle">
						Subtitle
						<input
							type="text"
							placeholder='Subtitle'
							id='subtitle'
							onChange={(e: any) => { setSubtitleValue(e.target.value) }}
							value={subtitleValue}
						/>
					</label>
					<div className='add-node-item'>
						<button type='submit' className='addButton' >Add Node</button>
						{/* onClick={() => addNodes('new node')} */}
					</div>
				</form>
			</div>
			<CanvasWidget engine={engine} />
		</DemoCanvasWidget>
	);
};

export default App