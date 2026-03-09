// js/views/home.js

function renderHomepage() {
    return `
        <div class="animate__animated animate__fadeIn">
            <div class="p-5 mb-4 text-white rounded-4 shadow-sm" style="background: linear-gradient(135deg, #800000, #4a0000);">
                <div class="container-fluid py-5 text-center">
                    <i class="fas fa-university fa-4x mb-3 text-warning"></i>
                    <h1 class="display-5 fw-bold">Outstanding Faculty Awards</h1>
                    <p class="col-md-8 mx-auto fs-5 mt-3 fw-light">
                        Recognizing excellence in teaching, research, and community service at Bulacan State University.
                    </p>
                    <div class="mt-4">
                        <a href="#/nominate" class="btn btn-warning btn-lg px-5 fw-bold rounded-pill text-dark shadow-sm">
                            <i class="fas fa-star me-2"></i> Nominate Now
                        </a>
                    </div>
                </div>
            </div>

            <h3 class="fw-bold mb-4 mt-5 text-center text-primary">Select Your Portal</h3>
            <div class="row g-4 justify-content-center">
                
                <div class="col-md-4">
                    <div class="card h-100 text-center p-4 border-0 shadow-sm">
                        <div class="mb-3"><i class="fas fa-user-graduate fa-3x text-primary"></i></div>
                        <h4 class="fw-bold">Student / Faculty</h4>
                        <p class="text-muted small">Access the portal to submit and track your nominations.</p>
                        <a href="#/nominate" class="btn btn-outline-primary mt-auto fw-medium">Go to Nomination</a>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="card h-100 text-center p-4 border-0 shadow-sm">
                        <div class="mb-3"><i class="fas fa-user-edit fa-3x text-warning"></i></div>
                        <h4 class="fw-bold">Evaluator</h4>
                        <p class="text-muted small">Review nominee portfolios and submit your evaluation scores.</p>
                        <a href="#/evaluator" class="btn btn-outline-primary mt-auto fw-medium">Login as Evaluator</a>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="card h-100 text-center p-4 border-0 shadow-sm">
                        <div class="mb-3"><i class="fas fa-user-shield fa-3x text-dark"></i></div>
                        <h4 class="fw-bold">Lead Evaluator</h4>
                        <p class="text-muted small">See consolidated scores from all evaluators and finalize category-level rankings.</p>
                        <a href="#/lead" class="btn btn-dark mt-auto fw-medium">Lead Evaluator Access</a>
                    </div>
                </div>
                
            </div>
        </div>
    `;
}