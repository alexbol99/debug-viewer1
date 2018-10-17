/**
 * Created by alexanderbol on 20/04/2017.
 */

import { Layer } from '../models/layer';

const colors = [
    "#FF0303",
    "#4AA403",
    "#540080",
    "#FFFF40",
    "#FF0080",
    "#AED424",
    "#545400",
    "#FFA980",
    "#A95480",
    "#A9A9FF",
    "#00FF00",
    "#FFEE76",
    "#A40576",
    "#4385C8",
    "#1CC826",
    "#BDBD00",
    "#48316E",
    "#14616E",
    "#8040BD",
    "#DC7676",
    "#924845",
    "#A90000",
    "#FFA900"
];

export class Layers {

    static newLayer(stage, layers) {
        let layer = new Layer(stage);
        layer.name = Layers.getNewName(layers);
        if (layers.length === 0) { // first layer
            // layer.color = Layers.getNextColor(layers);
            layer.displayed = false;
            layer.affected = false;
        }
        return layer;
    }

    static get defaultName() {
        return "layer";
    }

    static getNewName(layers) {
        let name = Layers.defaultName;
        let inc = 1;
        let comparator = (layer) => layer.name === name;
        while (layers.find(comparator) ) {
            name = Layers.defaultName + inc;
            inc++;
        }
        return name;
    }

    static getAffected(layers) {
        return layers.find((lay) => lay.affected);
    }

    static setAffected(layers, layer) {
        let currentAffectedLayer = Layers.getAffected(layers);
        if (currentAffectedLayer) {
            currentAffectedLayer.affected = false;
        }
        layer.affected = true;
    }

    static getNextColor(layers) {
        let color = "";
        for (let col of colors) {
            if (!layers.find((layer) =>
                layer.displayed && layer.color === col)) {
                color = col;
                break;
            }
        }
        return color;
    }

    static delete(layers, layer) {
        // let index = layers.findIndex((l) => l === layer);
        let newLayers = layers.filter(l => l !== layer);
        return newLayers;
        // another option to delete from array:
        // const newLayers = [...layers]
        // return newLayers.splice( index, 1);
    }

    static sort(layers) {
        let newLayers = layers.slice();
        newLayers.sort( function(l1, l2) {
            let name1 = l1.name.toUpperCase();
            let name2 = l2.name.toUpperCase();
            if (name1 < name2) {
                return -1;
            }
            if (name1 > name2) {
                return 1;
            }
            return 0;
        });
        return newLayers;
    }
}