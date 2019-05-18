import * as ActionTypes from "../actionTypes";
import * as appActions from "../actions/appActions";
import Layers from '../../models/layers';
import Model from "../../models/model";
import { parseXML } from '../../dataParsers/parserXML';
import { parseODB } from "../../dataParsers/parserODB";
import { parseImage } from "../../dataParsers/parsePGM";
import { parseCSV } from "../../dataParsers/parseCSV";
import { parseTXT } from "../../dataParsers/parseTXT";
import { parseJSON} from "../../dataParsers/parseJSON";

// Closure to capture file information and parameters
const readAsText = (reader, file, stage, layers, dispatch, files) => {

    let promise = new Promise( (resolve, reject) => {
        reader.onload = (function(theFile, stage, layers, dispatch, files, resolve, reject) {
            return (event) => {
                let string = event.target.result;

                let namesplitted = theFile.name.split('.');
                let extension = namesplitted[namesplitted.length-1];
                let job;
                if (extension === 'xml') {
                    job = parseXML(theFile.name, string);
                }
                else if (extension === 'csv') {
                    job = parseCSV(theFile.name, string);
                }
                else if (extension === 'txt') {
                    job = parseTXT(theFile.name, string);
                }
                else if (extension === 'json') {
                    job = parseJSON(theFile.name, string);
                }
                else {
                    job = parseODB(theFile.name, string);
                }
                let layer = Layers.newLayer(stage, layers);
                if (theFile.name !== "") {
                    layer.name = theFile.name;
                }
                layer.title = job.title;

                for (let polygon of job.profiles) {
                    if (polygon.edges.size > 0 && polygon.faces.size > 0) {
                        // let watch = undefined; //  parser.parseToWatchArray(string);
                        // let shape = new Shape(polygon, stage, polygon.style, watch);
                        let shape = new Model(polygon, undefined, polygon.label);

                        layer.add(shape);
                    }
                }

                for (let polygon of job.materials) {
                    if (polygon.edges.size > 0 && polygon.faces.size > 0) {
                        // let watch = undefined; //  parser.parseToWatchArray(string);
                        // let shape = new Shape(polygon, stage, polygon.style, watch);
                        let shape = new Model(polygon, undefined, polygon.label);

                        layer.add(shape);
                    }
                }

                for (let shape of job.shapes) {
                    let model = new Model(shape, undefined, shape.label);
                    layer.add(model);
                }

                // layers.push(layer);

                if (theFile === files[0]) {
                    Layers.setAffected(layers, layer);
                    layer.color = Layers.getNextColor(layers);
                    layer.displayed = true;
                    dispatch({
                        type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
                        stage: stage,
                        shape: layer
                    });
                }
                dispatch({
                    type: ActionTypes.ADD_NEW_LAYER,
                    layer: layer
                });

                dispatch({
                    type: ActionTypes.ASYNC_OPERATION_ENDED
                });

                resolve(true);
            }
        })(file, stage, layers, dispatch, files, resolve, reject);

        reader.readAsText(file);
    });


    dispatch({
        type: ActionTypes.ASYNC_OPERATION_STARTED
    });

    return promise
};

const readAsImage = (reader, file, stage, layers, dispatch, files) => {
    let promise = new Promise( (resolve, reject) => {
        reader.addEventListener("load", function () {
            // let image = {};          // TODO: to be Flatten.Image
            // image.uri = this.result;
            // image.center = new Flatten.Point(0,0);
            // image.width = 2*400000;    // 2 micron
            // image.box = new Flatten.Box(
            //     image.center.x - image.width/2,
            //     image.center.y - image.width/2,
            //     image.center.x + image.width/2,
            //     image.center.y + image.width/2,
            // );

            let image = parseImage(file);
            image.uri = this.result;

            let model = new Model(image);

            let layer = Layers.newLayer(stage, layers);
            if (file.name !== "") {
                layer.name = file.name;
            }

            layer.add(model);

            // layers.push(layer);

            if (file === files[0]) {
                Layers.setAffected(layers, layer);
                layer.color = Layers.getNextColor(layers);
                layer.displayed = true;
                dispatch({
                    type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
                    stage: stage,
                    shape: layer
                });
            }

            dispatch({
                type: ActionTypes.ADD_NEW_LAYER,
                layer: layer
            });

            dispatch({
                type: ActionTypes.ASYNC_OPERATION_ENDED
            });

            resolve(true);
        }, false);

        reader.readAsDataURL(file);
    });

    return promise;
};

const readFile = (file, stage, layers, dispatch, files) => {
    if (file.type !== "" &&
        !(file.type.match('text.*') || file.type.match('application.*') ||
            file.type.match('image.*')) ) return;   // validate type is text

    let reader = new FileReader();

    if (file.type.match('text.*') || file.type.match('application.*') || file.name.match('features*')) {
        return readAsText(reader, file, stage, layers, dispatch, files);
    }

    else if (file.type.match('image.*')) {
        return readAsImage(reader, file, stage, layers, dispatch, files);
    }

    return Promise.reject("not supported file");
};

export const readFiles = (files, stage, layers) => {
    return (dispatch) => {
        dispatch(appActions.asyncOperationStarted());

        // Load and parse files
        // in MS Edge FilesList is not array. It is indexable but not iterable
        // for (let i=0; i < action.files.length; i++) {
        //     readFile(action.files[i], stage, layers, dispatch, action.files);
        // }
        let promises = [];
        for (let file of Array.from(files)) {
            let promise = readFile(file, stage, layers, dispatch, files);
            promises.push(promise);
        }

        return Promise.all(promises)
            .then( (values) => {
                dispatch(filesUploadCompleted(values));
            })

            .catch(error => {
                alert(error.message);
                dispatch(appActions.asyncOperationEnded());
            })
    }
};

export const filesUploadCompleted = (values) => {
    return {
        type: ActionTypes.FILES_UPLOAD_COMPLETED,
        uploadedFiles: values
    }
};

export const initUploadState = () => {
    return {
        type: ActionTypes.INITIALIZE_UPLOAD_STATE
    }
};

export default readFiles;

