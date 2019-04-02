/**
 * Created by alexanderbol on 19/06/2017.
 */

import {Component} from 'react';
import {Shape} from '@createjs/easeljs';
import {graphics} from '../../../../models/graphics';
import Utils from '../../../../models/utils';

export class ShapeComponent extends Component {
    constructor(params) {
        super();

        this.shape = new Shape();
        params.stage.addChild(this.shape);

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
        this.props.onMouseOver(this.props.model);
    };

    handleMouseOut = (event) => {
        this.props.onMouseOut();
    };

    handleClick = (event) => {
        this.props.onClick(this.props.model, this.props.layer);
    };

    redrawVertices(stroke, fill, alpha) {
        let stage = this.props.stage;

        for (let vertexShape of this.vertexShapes) {
            let vertex = vertexShape.geom;
            if (vertexShape.graphics.isEmpty()) {
                vertexShape.graphics = graphics(vertex,   // vertex.graphics({
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

    redraw() {
        // Draw shape
        let stage = this.props.stage;
        let color = (this.props.hovered || this.props.selected) ? "black" : this.props.color;
        let alpha = (this.props.hovered || this.props.selected) ? 1.0 : 0.6;
        let widthOn = this.props.widthOn;

        let strokeStyle = this.props.model.geom.aperture ? this.props.model.geom.aperture : undefined;
        let fill = (widthOn && !this.props.displayVertices) ? this.props.color : "white";

        if (this.shape.graphics.isEmpty()) {
            this.shape.graphics = graphics(this.props.model.geom,{
                strokeStyle: strokeStyle,
                ignoreScale: true,
                stroke: color,
                fill: fill,
                radius: 3. / (stage.zoomFactor * stage.resolution)
            });

            // this.skeletonShape = new Shape();
            // this.skeletonShape.graphics = this.props.model.geom.graphics({
            //     strokeStyle: 1,
            //     ignoreScale: true,
            //     stroke: color,
            //     fill: fill,
            //     radius: 3. / (stage.zoomFactor * stage.resolution)
            // });
            // this.skeletonShape.alpha = 1;
            // this.props.stage.addChild(this.skeletonShape);
        }
        else {
            if (this.shape.graphics.stroke) this.shape.graphics.stroke.style = color;
            if (this.shape.graphics.fill) this.shape.graphics.fill.style = fill;
            if (this.shape.graphics.circle) this.shape.graphics.circle.radius =
                3. / (stage.zoomFactor * stage.resolution);
        }
        this.shape.alpha = this.props.displayed ? alpha : 0.0;

        // let box = this.props.model.geom.box;
        // this.shape.cache(box.xmin, box.ymin, box.xmax - box.xmin, box.ymax - box.ymin);

        // Draw vertices
        alpha = this.props.displayed && this.props.displayVertices ? 1.0 : 0.0;
        this.redrawVertices(color, color, alpha);
    }

    componentDidMount() {
        this.shape.on("mouseover", this.handleMouseOver);
        this.shape.on("mouseout", this.handleMouseOut);
        this.shape.on("click", this.handleClick);

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
        this.shape.off("mouseover", this.handleMouseOver);
        this.shape.off("mouseout", this.handleMouseOut);
        this.shape.off("click", this.handleClick);
        this.props.stage.removeChild(this.shape);
        this.shape.graphics.clear();
        for (let vertexShape of this.vertexShapes) {
            this.props.stage.removeChild(vertexShape);
        }
        this.vertexShapes = [];
    }

    render() {
        return null;
    }
}
