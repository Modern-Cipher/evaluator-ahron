const appDiv = document.getElementById('app');

const routes = {
    '/': () => {
        appDiv.innerHTML = renderHomepage();
    },
    '/nominate': () => {
        appDiv.innerHTML = renderNominationForm();
        if(typeof initNominateLogic === 'function') initNominateLogic();
    },
    '/track': () => {
        appDiv.innerHTML = renderTrackingPage();
        if(typeof initTrackLogic === 'function') initTrackLogic();
    },
    '/evaluator': () => {
        appDiv.innerHTML = renderEvaluatorDashboard();
        if(typeof initEvaluatorLogic === 'function') initEvaluatorLogic();
    },
    '/lead': () => {
        appDiv.innerHTML = renderLeadDashboard();
        if(typeof initLeadLogic === 'function') initLeadLogic();
    },
    // BAGONG ROUTE PARA SA ADMIN STAFF
    '/admin': () => {
        appDiv.innerHTML = renderAdminDashboard();
        if(typeof initAdminLogic === 'function') initAdminLogic();
    }
};

function router() {
    let path = window.location.hash.slice(1) || '/';
    
    document.querySelectorAll('.nav-menu-link').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === '#' + path) link.classList.add('active');
    });

    if (routes[path]) {
        routes[path]();
    } else {
        appDiv.innerHTML = `<h2 class="text-center mt-5 fw-bold text-muted">404 - Page Not Found</h2>`;
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);