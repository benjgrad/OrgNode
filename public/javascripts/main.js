import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AddEventDialogFab from './AddEventDialogFab'; // Our custom react component

injectTapEventPlugin();

document.addEventListener('DOMContentLoaded', function() {
    var app = document.getElementById('addTaskFAB');
    if (app != null) {
        ReactDOM.render(<AddEventDialogFab />, app);
    }
});
