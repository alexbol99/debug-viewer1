/**
 * Created by alexanderbol on 17/04/2017.
 */

import {Point, Box} from '@flatten-js/core';
// import { Shape } from '../models/shape';
import Model from './model';

class Layer {
    constructor(stage) {
        // super();
        // cannot define Layer as extension of PlanarSet due to bug in compiler ?
        this.stage = stage;
        this.shapes = [];         // new Flatten.PlanarSet();
        this.name = "";
        this.color = "";
        this.title = "";
        this.displayed = false;
        this.edited = false;
        this.affected = false;
    }

    clone() {
        let layer = new Layer(this.stage);
        return Object.assign(layer, this);
    }

    add(shape) {
        if (shape instanceof Model) {
            this.shapes.push(shape);       // add(shape)
        }
        else {
            let geom = shape;
            let newShape = new Model(geom, {}, shape.label) // , this.stage);
            this.shapes.push(newShape);     // add(newShape);
        }
        return this;
    }

    addShapesArray(shapes) {
        for (let shape of shapes) {
            this.add(shape);
        }
        return this;
    }

    get box() {
        let box = new Box();
        for (let shape of this.shapes) {
            box = box.merge(shape.geom instanceof Box ? shape.clone() : shape.box);
        }
        return box;
    }

    get center() {
        let box = this.box;
        return new Point((box.xmin + box.xmax)/2, (box.ymin + box.ymax)/2);
    }

    toggleDisplayed(color) {
        let displayed = !this.displayed;
        return Object.assign(this.clone(),
            {
                displayed : displayed,
                color: color
            });
    }

    setAffected(affected) {
        this.affected = affected;
        return this;
        // return Object.assign(this.clone(),
        //     {
        //         affected : affected
        //     });
    }

    setEdited(edited) {
        return Object.assign(this.clone(),
            {
                edited : edited
            });
    }

    setNameAndTitle(name,title) {
        return Object.assign(this.clone(),
            {
                name : name,
                title: title,
                edited: false
            });
    }

    setAlpha() {
        for(let shape of this.shapes) {
            shape.alpha = this.displayed ? 1 : 0;
        }
        return this.shapes;
    }

    // toggleExpanded(shapeToggle) {
    //     for(let shape of this.shapes) {
    //         if (shape === shapeToggle) {
    //             shape.expanded = !shape.expanded;
    //         }
    //     }
    //     return this;
    // }

    toJSON() {
        return {
            name: this.name,
            title: this.title,
            shapes: JSON.stringify(this.shapes, null, ' ')
        };
    }
}

export default Layer;
