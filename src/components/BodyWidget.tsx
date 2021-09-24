
import * as React from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './TrayWidget';
import { Application } from '../Application';
import { TrayItemWidget } from './TrayItemWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from '../helpers/DemoCanvasWidget';
import styled from '@emotion/styled';
import stringify from 'json-stringify-safe';

class modelDataProps {
	nodeName: string
	color: string
	portType: string
	portName: string

	constructor(nodeName: string, color: string, portType: string, portName: string) {
		this.nodeName = nodeName;
		this.color = color;
		this.portType = portType;
		this.portName = portName;
	}
}

class nodeTrayWidgetProps {
	color: string
	name: string
	type: string

	constructor(color: string, name: string, type: string) {
		this.name = name;
		this.color = color;
		this.type = type;
	}
}

export interface BodyWidgetProps {
	app: Application;
	trayWidgetData: Array<nodeTrayWidgetProps>;
	// eventProps: Array<TrayWidget>;
	modelData: Array<modelDataProps>;
}

export class BodyWidget extends React.Component<BodyWidgetProps> {
	componentDidMount() {
		console.log('mounted');
	}
	componentWillUnmount() {
		console.log('will unmount')
	}
	render() {
		return (
			<S.Body>
				<S.Header>
					<div className="title">Storm React Diagrams - DnD demo</div>
				</S.Header>
				<S.Content>
					<TrayWidget>
						{this.props.trayWidgetData.map((nodeTrayWidget, idx: number) => {
							return <TrayItemWidget
								key={idx}
								model={{ type: nodeTrayWidget.type }}
								name={nodeTrayWidget.name}
								color={nodeTrayWidget.color}
							/>
						})}
					</TrayWidget>
					<S.Layer onDrop={(event) => {
						var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
						let nodeName = JSON.parse(event.dataTransfer.getData('name'));
						let nodeColor = JSON.parse(event.dataTransfer.getData('color'))
						var nodesCount = _.keys(this.props.app.getDiagramEngine().getModel().getNodes()).length;

						var node: DefaultNodeModel = null;
						// console.log(this.props.trayWidgetData);
						// console.log(JSON.parse(event.dataTransfer.getData('name')));
						if (data.type === 'in') {
							node = new DefaultNodeModel(nodeName, nodeColor);
						} else {
							node = new DefaultNodeModel(nodeName, nodeColor);
						}

						node.addInPort('In');
						node.addOutPort('Out');

						var point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
						node.setPosition(point);
						this.props.app.getDiagramEngine().getModel().addNode(node);
						this.forceUpdate();
						console.log('dropped');
						this.props.app.toSerialize(this.props.app.getDiagramEngine().getModel());
					}}
					onDragOver={(event) => {
						event.preventDefault();
					}}>
						<DemoCanvasWidget>
							<CanvasWidget engine={this.props.app.getDiagramEngine()} />
						</DemoCanvasWidget>
					</S.Layer>
				</S.Content>
			</S.Body>
		);
	}
}


namespace S {
	export const Body = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	`;

	export const Header = styled.div`
		display: flex;
		background: rgb(30, 30, 30);
		flex-grow: 0;
		flex-shrink: 0;
		color: white;
		font-family: Helvetica, Arial, sans-serif;
		padding: 10px;
		align-items: center;
	`;

	export const Content = styled.div`
		display: flex;
		flex-grow: 1;
	`;

	export const Layer = styled.div`
		position: relative;
		flex-grow: 1;
	`;
}