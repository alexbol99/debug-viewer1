/**
 * Created by alexanderbol on 19/06/2017.
 */

import {Component} from 'react';
import {Shape, Shadow} from '@createjs/easeljs';
import {graphics} from '../../../../models/graphics';
import {is_equal} from '../../../../models/utils';
import VertexLabel from '../domelements/VertexLabel/VertexLabel';

class VertexComponent extends Component {
    constructor(props) {
        super();
        this.shape = new Shape();
        props.stage.addChild(this.shape);

        this.state = {
            hovered: false
        }
    }

    handleMouseOver = (event) => {
        // this.props.onMouseOver(this.props.model);
        this.shape.shadow = new Shadow(this.props.color, 0, 0, 10);
        this.setState({hovered:true})
    };

    handleMouseOut = (event) => {
        // this.props.onMouseOut();
        this.shape.shadow = null;
        this.setState({hovered:false})
    };

    handleClick = (event) => {
        // this.props.onClick(this.props.model, this.props.layer);
        console.log(this.props.vertex);
    };

    redraw() {
        let stage = this.props.stage;
        let stroke = this.props.color;
        let fill = this.props.color;
        let alpha = 1.0;


        if (this.shape.graphics.isEmpty()) {
            this.shape.graphics = graphics(this.props.vertex,
                {
                    stroke: stroke,     // this.props.color,
                    fill: fill,
                    radius: 3. / (stage.zoomFactor * stage.resolution)
                });
        }
        else {
            this.shape.graphics.circle.radius = 3. / (stage.zoomFactor * stage.resolution);
            this.shape.graphics.fill.style = fill;
        }
        this.shape.alpha = alpha;
    }

    componentDidMount() {
        this.shape.on("mouseover", this.handleMouseOver);
        this.shape.on("mouseout", this.handleMouseOut);
        this.shape.on("click", this.handleClick);

        this.shape.mouseEnabled = true;

        this.redraw();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (is_equal(this.props, nextProps) && is_equal(this.state, nextState)) {
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
    }

    render() {
        return this.state.hovered ? (
            <VertexLabel
                stage={this.props.stage}
                vertex={this.props.vertex}
                divisor={this.props.divisor}
                decimals={this.props.decimals}
            />
            ) : null;
    }
}

export default VertexComponent;