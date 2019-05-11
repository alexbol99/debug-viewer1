/**
 * Created by alexanderbol on 19/06/2017.
 */

import {Component} from 'react';
import {Shape} from '@createjs/easeljs';
import {graphics} from '../../../../models/graphics';
import Utils from '../../../../models/utils';

class VerticesComponent extends Component {
    constructor(params) {
        super();

        this.vertexShapes = [];

        if (params.model.geom.vertices) {
            for (let vertex of params.model.geom.vertices) {
                let vertexShape = new Shape();
                vertexShape.geom = vertex;   // augment Shape with geom struct
                vertexShape.mouseEnabled = false;
                params.stage.addChild(vertexShape);
                this.vertexShapes.push(vertexShape);
            }
        }
    }

    handleMouseOver = (event) => {
        // this.props.onMouseOver(this.props.model);
    };

    handleMouseOut = (event) => {
        // this.props.onMouseOut();
    };

    handleClick = (event) => {
        // this.props.onClick(this.props.model, this.props.layer);
    };

    redraw() {
        let stage = this.props.stage;
        let stroke = this.props.color;
        let fill = this.props.color;
        let alpha = 1.0;

        for (let vertexShape of this.vertexShapes) {
            let vertex = vertexShape.geom;
            if (vertexShape.graphics.isEmpty()) {
                vertexShape.graphics = graphics(vertex,
                    {
                        stroke: stroke,     // this.props.color,
                        fill: fill,
                        radius: 3. / (stage.zoomFactor * stage.resolution)
                    });
            }
            else {
                vertexShape.graphics.circle.radius = 3. / (stage.zoomFactor * stage.resolution);
                vertexShape.graphics.fill.style = fill;
            }
            vertexShape.alpha = alpha;
        }
    }

    componentDidMount() {
        // this.shape.on("mouseover", this.handleMouseOver);
        // this.shape.on("mouseout", this.handleMouseOut);
        // this.shape.on("click", this.handleClick);

        // this.shape.mouseEnabled = false;

        this.redraw();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (Utils.is_equal(this.props, nextProps)) {
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        this.redraw();
    }

    componentWillUnmount() {
        // this.shape.off("mouseover", this.handleMouseOver);
        // this.shape.off("mouseout", this.handleMouseOut);
        // this.shape.off("click", this.handleClick);
        // this.props.stage.removeChild(this.shape);
        // this.shape.graphics.clear();

        for (let vertexShape of this.vertexShapes) {
            this.props.stage.removeChild(vertexShape);
            vertexShape.graphics.clear();
        }
        this.vertexShapes = [];
    }

    render() {
        return null;
    }
}

export default VerticesComponent;