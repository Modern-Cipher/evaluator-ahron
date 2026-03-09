// js/views/eval.js

function renderEvaluatorDashboard() {
    // Kukunin natin ang totoong data mula sa db.js (localStorage)
    let currentDB = getData();
    let nominees = currentDB ? currentDB.nominees : [];
    
    let listHtml = '';
    
    if (nominees.length === 0) {
        listHtml = `<li class="list-group-item text-center text-muted p-4">No pending nominees found.</li>`;
    } else {
        nominees.forEach(nom => {
            listHtml += `
                <li class="nominee-item" onclick="selectEvalNom('${nom.name}', '${nom.dept}')">
                    <div class="d-flex align-items-center">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(nom.name)}&background=800000&color=fff" class="rounded-circle me-3" width="40">
                        <div>
                            <h6 class="mb-0 fw-bold text-dark">${nom.name}</h6>
                            <small class="text-muted"><i class="fas fa-building me-1"></i>${nom.dept}</small>
                        </div>
                    </div>
                </li>
            `;
        });
    }

    return `
        <div class="row animate__animated animate__fadeIn pb-5">
            <div class="d-flex justify-content-between align-items-center mb-4 mt-2">
                <h2 class="fw-bold text-primary mb-0"><i class="fas fa-user-edit me-2"></i> Evaluator Dashboard</h2>
                <span class="badge badge-maroon-soft rounded-pill px-3 py-2 fs-6">Pending Tasks: ${nominees.length}</span>
            </div>

            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-header bg-white border-bottom py-3">
                        <h6 class="mb-0 fw-bold text-primary"><i class="fas fa-users me-2"></i> Assigned Nominees</h6>
                    </div>
                    <ul class="nominee-list" id="evalSidebar">
                        ${listHtml}
                    </ul>
                </div>
            </div>

            <div class="col-md-8">
                <div class="card shadow-sm h-100 border-top border-primary border-4">
                    <div class="card-header bg-white border-bottom p-4">
                        <h5 class="mb-0 fw-bold text-dark" id="evalFormTitle">Select a nominee to score</h5>
                        <small class="text-muted" id="evalFormSubtitle">Click a name from the left panel to begin evaluation.</small>
                    </div>
                    
                    <div class="card-body p-4" id="evalFormBody" style="display:none;">
                        
                        <div class="alert alert-info border-info mb-4">
                            <i class="fas fa-info-circle me-2"></i> Review the attached portfolio documents before assigning scores.
                        </div>

                        <form id="evalScoreForm">
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <label class="form-label fw-bold text-dark">Teaching Effectiveness (40%)</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control form-control-lg" min="1" max="100" required placeholder="Score (1-100)">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold text-dark">Research / Creative Works (30%)</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control form-control-lg" min="1" max="100" required placeholder="Score (1-100)">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold text-dark">Community Extension (20%)</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control form-control-lg" min="1" max="100" required placeholder="Score (1-100)">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold text-dark">Professional Development (10%)</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control form-control-lg" min="1" max="100" required placeholder="Score (1-100)">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-4">
                                <label class="form-label fw-bold text-dark">Comments / Qualitative Feedback</label>
                                <textarea class="form-control" rows="3" placeholder="Provide justification for your scores..."></textarea>
                            </div>
                            
                            <div class="action-buttons-container mt-5 pt-4 border-top">
                                <button type="button" class="btn btn-outline-secondary btn-lg fw-bold rounded-pill px-4">
                                    <i class="fas fa-save me-2"></i>Save Draft
                                </button>
                                
                                <button type="submit" class="btn btn-maroon btn-lg fw-bold rounded-pill px-5 shadow-sm" onclick="submitEvalScore(event)">
                                    <i class="fas fa-check-circle me-2"></i>Submit Final Scores
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initEvaluatorLogic() {
    // Dynamic selection ng nominee
    window.selectEvalNom = function(name, dept) {
        document.getElementById('evalFormBody').style.display = 'block';
        document.getElementById('evalFormTitle').innerHTML = `<i class="fas fa-user-tie text-primary me-2"></i> ${name}`;
        document.getElementById('evalFormSubtitle').innerHTML = `<i class="fas fa-building me-1"></i> ${dept}`;
        
        // Mag-scroll papunta sa taas ng form sa mobile
        if(window.innerWidth < 768) {
            document.getElementById('evalFormTitle').scrollIntoView({behavior: "smooth"});
        }
    }

    // Submit Action para sa Evaluator
    window.submitEvalScore = function(e) {
        const evalForm = document.getElementById('evalScoreForm');
        
        if(evalForm.checkValidity()) {
            e.preventDefault();
            
            if(typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Scores Locked & Submitted!',
                    text: 'Your evaluation has been forwarded to the Lead Evaluator for consolidation.',
                    icon: 'success',
                    confirmButtonColor: '#800000'
                }).then(() => {
                    evalForm.reset();
                    document.getElementById('evalFormBody').style.display = 'none';
                    document.getElementById('evalFormTitle').innerHTML = 'Select a nominee to score';
                    document.getElementById('evalFormSubtitle').innerHTML = 'Click a name from the left panel to begin evaluation.';
                });
            } else {
                alert("Scores Locked & Submitted! Forwarded to Lead Evaluator.");
                evalForm.reset();
                document.getElementById('evalFormBody').style.display = 'none';
            }
        }
    }
}