/**
 * Created by alexanderbol on 17/04/2017.
 */

import React, {Component} from 'react';
// import FontAwesome from 'react-fontawesome';
import Button from '../../../components/UI/Button/Button';
import Separator from '../../../components/UI/ButtonSeparator/ButtonSeparator';

// import measureShapes from '../../../assets/icons/measureContour.png';
// import measurePoints from '../../../assets/icons/measurePoints.png';
// import width from '../../../assets/icons/WidthOn.png';
// import vertices from '../../../assets/icons/editContourVertextOnOff.png';

import classes from './ToolbarComponent.module.css';
import '@fortawesome/fontawesome-free/css/all.css';

class ToolbarComponent extends Component {
    openJobButtonClicked = () => this.refs.browseFiles.click();

    notImplemented = () => alert("Not implemented yet");

    render() {
        return (
            <div className={classes["App-toolbar"]}>
                {/*<h4>Toolbar</h4>*/}
                <Button type="trigger" title="Open files" iconName='folder-open'
                    onClick={this.openJobButtonClicked}
                />

                {/*<button title="Open file" onClick={this.openJobButtonClicked}>*/}
                    {/*/!*<img src={open} alt="open" />*!/*/}
                    {/*<FontAwesome*/}
                        {/*name='folder-open'*/}
                        {/*size='2x'*/}
                        {/*style={{color:"grey"}}*/}
                    {/*/>*/}
                {/*</button>*/}

                <input style={{fontSize: 16, marginTop: 5, marginBottom: 5, display: "none"}}
                       type="file" id="browseFiles" ref="browseFiles" name="files[]" multiple
                       onChange={this.props.onFileSelected}
                />

                <Button type="trigger" title="Save document on cloud" iconName='save'
                        onClick={this.props.onSaveDocumentButtonClicked}
                />

                <Button type="trigger" title="Manage cloud documents" iconName='cloud'
                        onClick={this.props.onManageCloudStorageButtonClicked}
                />

                <Separator />

                <Button type="trigger" title="Zoom and pan to home view" iconName='home'
                        onClick={this.props.onHomeButtonPressed}
                />

                <Separator />

                <Button type="mode" title="Pan by drag" iconName='hand-paper'
                        active={!this.props.measurePointsActive}
                        onClick={this.props.onPanByDragPressed}
                />

                <Button type="mode" title="Measure distance" iconName='hand-lizard'
                        active={this.props.measurePointsActive}
                        onClick={this.props.onMeasurePointsButtonPressed}
                />

                <Separator />

                <Button type="trigger" title="Measure distance between shapes" iconName='ruler'
                        onClick={this.props.onMeasureBetweenShapesButtonPressed}
                />

                <Button type="trigger" title="Display solid or wire" iconName='fill-drip'
                        onClick={this.props.onToggleWidthModePressed}
                />

                <Button type="trigger" title="Display vertices on/off" iconName='draw-polygon'
                        onClick={this.props.onToggleVerticesPressed}
                />

                <Button type="trigger" title="Display labels on/off" iconName='tag'
                        onClick={this.props.onToggleLabelsPressed}
                />

                {this.props.showSkeletonRecognitionButton ? (
                    <Button type="trigger" title="Skeleton Recognition Demo" iconName='tree'
                            onClick={this.props.onSkeletonRecognitionButtonPressed}
                    />
                ) : null}

                <Separator />

                <button className={classes["App-toolbar-units"]}
                    onClick={this.props.onUnitClicked}
                >
                    {this.props.units}
                </button>

                <Separator />

                <Button type="trigger" title="About" iconName='info'
                        onClick={this.props.onShowAboutPopupPressed}
                />

                <Separator />

            </div>
        )
    }
}

export default ToolbarComponent;