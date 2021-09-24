import * as SRD from '@projectstorm/react-diagrams';
import * as _ from 'lodash';


import createEngine, { DiagramModel, DefaultNodeModel, DefaultLabelModel } from '@projectstorm/react-diagrams';
import {update} from "lodash";
import { CanvasWidget, Action, ActionEvent, InputType } from '@projectstorm/react-canvas-core';
import { DefaultState } from './DefaultState';

/**
 * @author Azamat Adylbekov
 */

class CustomMouseUpAction extends Action {
	constructor(model) {
		super({
			type: InputType.MOUSE_UP,
			fire: (event: ActionEvent<React.MouseEvent>) => {
				toSerializeStuff(model);

			}
		});
	}
}

export class Application {
	protected activeModel: SRD.DiagramModel;
	protected diagramEngine: SRD.DiagramEngine;
	public yCoord: number = 100;
	public modelData: any = [];

	constructor(modelData) {
		this.diagramEngine = SRD.default();
		let scene = localStorage.getItem('scene');
		if(scene !== null) {
			console.log('scene is not null ')
			if(scene.length > 0) {
				console.log('scene is more than 0')
				this.toDeserialize();
			}
		} else {
			console.log('scene is null')
			this.newModel();
		}
	}

	public newModel() {
		this.activeModel = new SRD.DiagramModel();
		this.diagramEngine.setModel(this.activeModel);

		//3-A) create a default node
		var node1 = new SRD.DefaultNodeModel('Node 1', 'rgb(0,192,255)');
		// let port = node1.addOutPort('Out');
		node1.addOutPort('Out');
		node1.addInPort('In');
		node1.setPosition(100, 100);

		//3-B) create another default node
		var node2 = new SRD.DefaultNodeModel('Node 2', 'rgb(192,255,0)');
		// let port2 = node2.addInPort('In');
		node2.addInPort('In');
		node2.addOutPort('Out');
		node2.setPosition(400, 100);

		// link the ports
		// let link1 = port.link(port2);

		this.activeModel.addAll(node1, node2);
		this.diagramEngine.getActionEventBus().registerAction(new CustomMouseUpAction(this.activeModel));
		this.activeModel.registerListener({
			linksUpdated: e => {
				console.log('link updated');
				// console.log(e);
			}
		})
	}

	public toSerialize(model) {
		let scene = JSON.stringify(model.serialize());
		localStorage.setItem('scene', scene);
	}

	public toDeserialize() {
		let scene = localStorage.getItem('scene');
		let model2 = new DiagramModel();
		model2.deserializeModel(JSON.parse(scene), this.diagramEngine);
		// console.log(model2.getNodes()[0].getPosition())
		this.diagramEngine.setModel(model2);
		// console.log(this.diagramEngine.getModel().getNodes()[0].getPosition());
		// console.log('updated model node 1 position', this.getDiagramEngine().getModel().getNodes()[0].getPosition());
		this.diagramEngine.getActionEventBus().registerAction(new CustomMouseUpAction(this.getDiagramEngine().getModel()));
		this.diagramEngine.getModel().registerListener({
			linksUpdated: e => {
				console.log('link updated');
				// console.log(e);
			}
		})
	}

	public loadModels(models) {
		// models.map(model => {
		// 	// if(model.options) {
		// 	// 	console.log('mode in load models', model.options);
		// 	// 	this.activeModel.addNode(this.newNode(model.options.name, model.options.color, model.options.portType, models.option.portName))
		// 	// }
		// 	// if(model.options) {
		// 	// 	this.activeModel.addNode(this.newNode(model.options.name, model.options.color, model.options.portType, model.options.portName))
		// 	// 	console.log('loading models')
		// 	// } else {
		// 	// 	console.log('not loading models');
		// 	// 	this.activeModel.addNode(this.newNode(model.nodeName, model.color, model.portType, model.portName))
		// 	// }
		// 	// model.options.map(option => {
		// 	// 	this.activeModel.addNode(this.newNode(option.nodeName, option.color, option.portType, option.portName))
		// 	// })
		// 	// this.activeModel.addNode(this.newNode(model.options.name, model.options.color, model.options.portType, models.option.portName))
		// 	// console.log('model in load models', model.options.name);
		// 	// console.log('mode in load models', model);
		// 	// console.log('model in load models', model);
		// })
	}

	// public newNode(nodeName: string, color: string, portType: string, portName: string) {
	// 	this.yCoord += 100;
	// 	let newNode = new SRD.DefaultNodeModel(nodeName, color);
	// 	// if (portType.toLowerCase() === 'in') {
	// 	// 	newNode.addInPort(portName);
	// 	// } else if (portType.toLowerCase() === 'out') {
	// 	// 	newNode.addOutPort(portName);
	// 	// }
	// 	newNode.setPosition(100, this.yCoord);
	// 	return newNode;
	// }
	public getActiveDiagram(): SRD.DiagramModel {
		return this.activeModel;
	}

	public getDiagramEngine(): SRD.DiagramEngine {
		return this.diagramEngine;
	}
}

function toSerializeStuff(model) {
	let scene = JSON.stringify(model.serialize());
	localStorage.setItem('scene', scene);
	console.log("serializing...");
}