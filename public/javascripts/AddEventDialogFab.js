/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
//import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import FAB from 'material-ui/FloatingActionButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DatePicker from 'material-ui/DatePicker';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
    container: {
        textAlign: 'right',
        position: 'relative',
        backgroundColor: 'transparent',
        height: '0',
        width: '0',
        overflow: 'hidden',
        borderRadius: '50%',
        margin: 0,

    },
    fab: {
        marginRight: 0,
        marginBottom: 0,
        bottom: 25,
        right: 25,
        zIndex: 100,
        position:'fixed',
    },
    taskNameField: {
        fontSize:'150%',
    },
    dialog: {
        position:'fixed',
        marginTop: '-20px',
    },
};

const muiTheme = getMuiTheme();

class AddEventDialogFab extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            ispublic: true,
            open: false,
            slidervalue: 0,
        };
        console.log("constructor");
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleRequestSubmit = this.handleRequestSubmit.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handlePublicToggle = this.handlePublicToggle.bind(this);
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
        console.log("handleRequestClose");

    }
    handleRequestSubmit() {
        console.log("handleRequestSubmit");
        var method = "post"; // Set method to post

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", '/addEvent');

        var params = {
            startDate : (document.getElementById('startdate').value),
            endDate: (document.getElementById('enddate').value),
            taskName: (document.getElementById('taskname').value),
            duration: (document.getElementById('duration').value),
            ispublic: (this.state.ispublic),
            percentComplete : (this.state.slidervalue),
        };
        // TODO: Verify that the duration = end-start, and select 2 values to index
        for(var key in params) {
            console.log(key+': '+params[key]);
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
        var startDate = document.getElementById('startdate');
        console.log(startDate.value);
        this.handleRequestClose();
    }
    handlePublicToggle(event, value){
        this.state.ispublic=value;
        document.getElementById('ispublic').label=(this.state.ispublic ? 'Public' : 'private');
        console.log(this.state.ispublic);
    }

    handleSliderChange(event, value){
        this.setState({
            slidervalue: value,
        });
    }

    handleTouchTap() {
        this.setState({
            open: true,
        });
    }

    render() {
        const standardActions = (
            <div>
            <FlatButton
                label="Cancel"
                primary={false}
                onTouchTap={this.handleRequestClose}
            />
            <FlatButton
                label="Ok"
                primary={true}
                onTouchTap={this.handleRequestSubmit}
            />
            </div>
        );
        //TODO: format and change the ispublic label
        const toggleLabel = (this.state.ispublic ? 'public' : 'private');
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <Dialog
                        style={styles.dialog}
                        modal={true}
                        open={this.state.open}
                        actions={standardActions}
                        onRequestClose={this.handleRequestClose}>
                        <TextField id="taskname" hintText="Task Name" fullWidth={true} style={styles.taskNameField} />
                        <Toggle id="ispublic" label={(this.state.ispublic ? 'Public' : 'private')} defaultToggled={true} style={styles.toggle} onToggle={this.handlePublicToggle}/>
                        <TextField id="duration" type="number" hintText="Duration in Days" min="1" />
                        <DatePicker id="startdate" hintText="Start Date" fullWidth={true} />
                        <DatePicker id="enddate" hintText="End Date" fullWidth={true} />
                        <h6>Percent Complete</h6>
                        <Slider id="percentcomplete" max={100} step={1} onChange={this.handleSliderChange} />
                    </Dialog>
                    <FAB
                        className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                        secondary={true}
                        style={styles.fab}
                        onTouchTap={this.handleTouchTap}
                    >
                        <ContentAdd/>
                    </FAB>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default AddEventDialogFab;
