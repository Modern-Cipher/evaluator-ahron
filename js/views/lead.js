// js/views/lead.js

function renderLeadDashboard() {
    // Kunin ang data mula sa LocalStorage
    let currentDB = getData();
    let nominees = currentDB ? currentDB.nominees : [];
    
    let tableRows = '';
    let hasOutlier = false;

    if (nominees.length === 0) {
        tableRows = `<tr><td colspan="7" class="text-center text-muted py-4">No evaluations available for consolidation.</td></tr>`;
    } else {
        nominees.forEach(nom => {
            // DUMMY SCORES para sa ibang Evaluators (para may ma-compare tayo)
            let evalA = 95;
            let evalB = 92;
            let evalC = 91;
            
            // Dito kunwari pumasok yung score nung Evaluator D (kunwari nag-rate siya ng mababa)
            // Sa totoong system, kukunin ito sa database. Gagamit tayo ng 60 para ma-trigger yung outlier logic base sa docx.
            let evalD = nom.name === "Dr. Jose Rizal" ? 94 : 60; 
            
            // Compute Mean
            let mean = ((evalA + evalB + evalC + evalD) / 4).toFixed(2);
            
            // Outlier Logic: Kung ang score ay may difference na > 15 sa mean
            let isOutlier = Math.abs(evalD - mean) >= 15;
            if(isOutlier) hasOutlier = true;

            let outlierClass = isOutlier ? 'outlier-score p-2 d-inline-block rounded' : 'p-2 d-inline-block';
            let outlierTitle = isOutlier ? 'title="Score significantly deviates from group average."' : '';

            tableRows += `
                <tr>
                    <td class="text-start ps-4 py-3 fw-bold text-dark">
                        ${nom.name} <br>
                        <span class="badge bg-secondary fw-normal mt-1" style="font-size: 0.7rem;">${nom.status || 'Under Review'}</span>
                    </td>
                    <td class="align-middle text-muted">${evalA}</td>
                    <td class="align-middle text-muted">${evalB}</td>
                    <td class="align-middle text-muted">${evalC}</td>
                    <td class="align-middle">
                        <div class="${outlierClass}" ${outlierTitle}>
                            <span class="fw-bold ${isOutlier ? 'text-danger' : 'text-dark'}">${evalD}</span>
                            ${isOutlier ? '<i class="fas fa-exclamation-circle text-danger ms-1"></i>' : ''}
                        </div>
                    </td>
                    <td class="bg-light fw-bold align-middle fs-5 text-dark">${mean}</td>
                    <td class="align-middle">
                        <button class="btn btn-outline-danger btn-sm fw-bold" onclick="flagLeadScore('${nom.name}', ${evalD})">
                            <i class="fas fa-flag"></i> Flag
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    let alertHtml = hasOutlier ? `
        <div class="alert alert-danger border-danger d-flex align-items-center shadow-sm mb-4">
            <i class="fas fa-exclamation-triangle fa-2x me-3"></i>
            <div>
                <strong>Attention Required:</strong> Score significantly deviates from group average. Please review the highlighted outliers.
            </div>
        </div>
    ` : '';

    return `
        <div class="animate__animated animate__fadeIn pb-5">
            <div class="d-flex justify-content-between align-items-center mb-4 mt-2">
                <h2 class="fw-bold text-primary mb-0"><i class="fas fa-chart-pie me-2"></i> Lead Evaluator Dashboard</h2>
                <div>
                    <button class="btn btn-outline-maroon fw-bold me-2"><i class="fas fa-file-pdf me-2"></i>Export PDF</button>
                    <button class="btn btn-maroon fw-bold"><i class="fas fa-file-excel me-2"></i>Export Excel</button>
                </div>
            </div>

            ${alertHtml}

            <div class="card shadow-sm border-0 mb-4">
                <div class="card-header lead-header-custom d-flex justify-content-between align-items-center">
                    <h5 class="mb-0 fw-bold"><i class="fas fa-chalkboard-teacher me-2"></i> Consolidated Scores: Teaching Effectiveness (40%)</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0 text-center">
                            <thead class="bg-light">
                                <tr>
                                    <th class="text-start ps-4">Nominee</th>
                                    <th>Eval A</th>
                                    <th>Eval B</th>
                                    <th>Eval C</th>
                                    <th class="text-primary">Eval D</th>
                                    <th class="bg-light border-start border-end">Mean Score</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="card-footer bg-light p-4 border-top">
                    <div class="row align-items-center">
                        <div class="col-md-7">
                            <div class="form-check">
                                <input class="form-check-input fs-5 mt-1 border-secondary" type="checkbox" id="verifyCheck">
                                <label class="form-check-label text-dark ms-2 fw-medium pt-1" for="verifyCheck">
                                    I verify that the consolidated scores are correct and outliers have been reviewed.
                                </label>
                            </div>
                        </div>
                        <div class="col-md-5 text-end">
                            <button class="btn btn-dark btn-lg fw-bold px-4 rounded-pill shadow-sm" onclick="finalizeRankings()">
                                <i class="fas fa-check-double me-2"></i> Finalize Rankings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="flagModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title fw-bold"><i class="fas fa-flag me-2"></i> Flagged for Review by Lead Evaluator</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div class="d-flex justify-content-between mb-3 bg-light p-3 rounded border">
                            <span class="text-dark"><strong>Nominee:</strong> <span id="modalNomName"></span></span>
                            <span class="text-dark"><strong>Score:</strong> <span id="modalScoreVal" class="badge bg-danger fs-6"></span></span>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label fw-bold text-dark">Add Note / Reason for Flagging</label>
                            <textarea id="flagReason" class="form-control" rows="4" placeholder="e.g., Scores appear inflated compared to documentation..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer bg-light">
                        <button type="button" class="btn btn-outline-secondary fw-bold rounded-pill" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger px-4 fw-bold rounded-pill" onclick="saveFlagLog()"><i class="fas fa-save me-2"></i> Save to Audit Log</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initLeadLogic() {
    let flagModalInstance = null;

    // Magbubukas ng modal kapag kinlick ang Flag button
    window.flagLeadScore = function(nomineeName, score) {
        document.getElementById('modalNomName').innerText = nomineeName;
        document.getElementById('modalScoreVal').innerText = score;
        document.getElementById('flagReason').value = ''; // Reset text area
        
        flagModalInstance = new bootstrap.Modal(document.getElementById('flagModal'));
        flagModalInstance.show();
    }

    // Pag-save ng reason sa Audit Log
    window.saveFlagLog = function() {
        let reason = document.getElementById('flagReason').value;
        if(reason.trim() === '') {
            alert('Please provide a reason for flagging.');
            return;
        }

        flagModalInstance.hide();
        
        if(typeof Swal !== 'undefined') {
            Swal.fire('Saved to Audit Log', 'The score has been flagged and returned to the evaluator for review.', 'success');
        } else {
            alert("Saved to Audit Log. The score has been flagged and returned for review.");
        }
    }

    // Validation Signature / Finalization
    window.finalizeRankings = function() {
        let checkbox = document.getElementById('verifyCheck');
        
        if(!checkbox.checked) {
            if(typeof Swal !== 'undefined') {
                Swal.fire('Verification Required', 'Please check the verification box before finalizing.', 'warning');
            } else {
                alert("Please check the verification box before finalizing.");
            }
            return;
        }

        if(typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Rankings Finalized',
                text: 'The Final Evaluator Report has been submitted to the Dean.',
                icon: 'success',
                confirmButtonColor: '#1e293b'
            });
        } else {
            alert('Rankings Finalized! The Final Evaluator Report has been submitted to the Dean.');
        }
    }
}