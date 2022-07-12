//  Import the components we need from the Tableau Embedding API
import {
    TableauViz,
    TableauAuthoringViz,
} from 'https://10ax.online.tableau.com/javascripts/api/tableau.embedding.3.2.0.js';

//  Define an object to define our dashboard list and help us track the web app's state
let details = {
    dashboards: [
        {
            title: 'Customer Analysis',
            url: 'https://10ax.online.tableau.com/#/site/datadevday/views/Superstore/Customers'
        },
        {
            title: 'Product Drilldown',
            url: 'https://10ax.online.tableau.com/#/site/datadevday/views/Superstore/Product'
        },
        {
            title: 'Iris Identification',
            url: 'https://10ax.online.tableau.com/#/site/datadevday/views/TempIris/IrisSpeciesIdentification'
        },
        {
            title: 'NCAA Golf',
            url: 'https://10ax.online.tableau.com/#/site/datadevday/views/2019NCAAD1MensGolfChampionshipbyChrisDeMartinitableauonlineconverted/NCAAD1MensChampionship'
        },
    ],
    currentDashboardIndex: 1,
    isAuthoringMode: false,
    divId: 'tableauViz'
}

//  Function to setup the tab navigation bar
function init() {

    /************************/
    /*  Navigation Tabs     */
    /************************/

    //  Get the nav bar
    let navContainer = document.getElementById('nav');

    //  Loop through each dashboard
    details.dashboards.forEach( (dashboard,index) => {
        //  Is this the active tab?
        const isActive = (index === details.currentDashboardIndex) ? 'active' : '';

        //  Create a tab for this dashboard/viz
        let tab = document.createElement('template');
        tab.innerHTML = `<li class="nav-item"><a class="nav-link ${isActive}" idx="${index}" href="#">${dashboard.title}</a>`

        //  Append the tab to the web page
        navContainer.appendChild(tab.content.firstChild);
    })

    //  Add click handlers
    document.querySelectorAll("#nav a").forEach( tab => {
        tab.addEventListener('click', event => {
            event.preventDefault();
            switchDashboard(event);
        })
    })
    
    /*************************/
    /*  Web Authoring button */
    /*************************/

    //  Get a reference to the web authoring toggle button
    let button = document.getElementById('webAuthoringToggle');
    
    //  Add click handler
    button.addEventListener('click', webAuthoringToggle)

    //  Update the HTML to show the difference between web authoring and view-only
    renderButton(button);

    /************************/
    /*  Default Viz         */
    /************************/
    renderViz();
}

//  Function to update the display properties of the Web Authoring button
function renderButton(button){

    //  Switch the class, based on toggle status
    button.className = details.isAuthoringMode ? 'btn btn-primary' : 'btn btn-outline-primary';

    //  Switch the button text, based on toggle status
    button.innerText = details.isAuthoringMode ? 'Web Authoring' : 'View Only';
}

//  Function for rendering a tableau viz
function renderViz() {

    //  Which Tableau dashboard/viz do we display?
    const dashboard = details.dashboards[details.currentDashboardIndex];

    //  Make sure the div container is empty
    let tableauContainer = document.getElementById(details.divId)
    tableauContainer.replaceChildren();

    //  Render in web authoring mode or view only?
    let viz;
    if (details.isAuthoringMode) {
        //  Create a new tableau authoring viz object
        viz = new TableauAuthoringViz();
        viz.src = dashboard.url;
        viz.hideCloseButton = true;
    } else {
        //  Create a new tableau viz object
        viz = new TableauViz();
        viz.src = dashboard.url;
        viz.toolbar = 'hidden';
    }

    //  Append the viz to the div container
    tableauContainer.appendChild(viz);

}

//  Handler for web authoring toggle
function webAuthoringToggle(event) {

    //  Toggle the isAuthoringMode boolean
    details.isAuthoringMode = !details.isAuthoringMode;

    //  Re-render the viz
    renderViz();

    //  Update the button's UI
    renderButton(event.target);
}

//  Handler for dashboard navigation
function switchDashboard(event) {
    
    //  Determine the index of the selected tab
    const index = parseInt(event.target.attributes.getNamedItem('idx').value);

    //  Change the currentDashboardIndex
    details.currentDashboardIndex = index;

    //  Re-render the viz
    renderViz();

    //  Update the active tab
    document.querySelectorAll("#nav a").forEach( (tab,tabIndex) => {
        tab.className = (tabIndex == index) ?  "nav-link active" : "nav-link";
    })
}

//  Render the default tableau viz
init();