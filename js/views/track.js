// js/views/track.js

function renderTrackingPage() {
    return `
        <div class="row justify-content-center animate__animated animate__fadeIn pb-5">
            <div class="col-md-7">
                <div class="text-center mb-5 mt-3">
                    <h2 class="fw-bold text-primary"><i class="fas fa-search-location me-2"></i>Track Nomination Status</h2>
                    <p class="text-muted">Enter your Reference ID and Email Address to check the current status of your submission.</p>
                </div>

                <div class="card border-0 shadow-sm mb-5">
                    <div class="card-body p-4 p-md-5">
                        <form id="trackForm" onsubmit="searchStatus(event)">
                            <div class="mb-4">
                                <label class="form-label fw-bold text-dark">Reference ID</label>
                                <input type="text" class="form-control form-control-lg" id="trackRefId" placeholder="e.g., OFA2026-001" required>
                            </div>
                            <div class="mb-4">
                                <label class="form-label fw-bold text-dark">Nominator Email</label>
                                <input type="email" class="form-control form-control-lg" id="trackEmail" placeholder="name@domain.com" required>
                            </div>
                            <button type="submit" class="btn btn-maroon btn-lg w-100 fw-bold rounded-pill shadow-sm">
                                Check Status
                            </button>
                        </form>
                    </div>
                </div>

                <div id="statusResult" style="display: none;">
                    <h5 class="fw-bold text-dark mb-4">Tracking Result for: <span id="displayRef" class="text-primary"></span></h5>
                    
                    <div class="card border-0 shadow-sm">
                        <div class="card-body p-4 p-md-5">
                            <div class="position-relative">
                                <div class="position-absolute h-100 border-start border-3 border-light" style="left: 24px; top: 0; z-index: 1;"></div>
                                
                                <div class="d-flex mb-4 position-relative z-index-2">
                                    <div class="bg-success rounded-circle d-flex align-items-center justify-content-center text-white me-3 mt-1" style="width: 50px; height: 50px; z-index: 2;">
                                        <i class="fas fa-check"></i>
                                    </div>
                                    <div>
                                        <h5 class="fw-bold text-dark mb-1">Received</h5>
                                        <p class="text-muted mb-0 small">Your nomination has been successfully submitted and logged into the system.</p>
                                    </div>
                                </div>

                                <div class="d-flex mb-4 position-relative z-index-2">
                                    <div id="iconReview" class="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white me-3 mt-1" style="width: 50px; height: 50px; z-index: 2;">
                                        <i class="fas fa-spinner"></i>
                                    </div>
                                    <div>
                                        <h5 class="fw-bold text-dark mb-1">Under Review</h5>
                                        <p class="text-muted mb-0 small">The Evaluation Committee is currently reviewing the nominee's documents and scores.</p>
                                    </div>
                                </div>

                                <div class="d-flex mb-4 position-relative z-index-2">
                                    <div class="bg-light border border-2 rounded-circle d-flex align-items-center justify-content-center text-muted me-3 mt-1" style="width: 50px; height: 50px; z-index: 2;">
                                        <i class="fas fa-list-ol"></i>
                                    </div>
                                    <div>
                                        <h5 class="fw-bold text-muted mb-1">Shortlisted</h5>
                                        <p class="text-muted mb-0 small">The nominee has passed the initial evaluation and is included in the shortlist.</p>
                                    </div>
                                </div>

                                <div class="d-flex position-relative z-index-2">
                                    <div class="bg-light border border-2 rounded-circle d-flex align-items-center justify-content-center text-muted me-3 mt-1" style="width: 50px; height: 50px; z-index: 2;">
                                        <i class="fas fa-trophy"></i>
                                    </div>
                                    <div>
                                        <h5 class="fw-bold text-muted mb-1">Final Decision</h5>
                                        <p class="text-muted mb-0 small">Pending final validation and approval from the Dean.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
}

function initTrackLogic() {
    window.searchStatus = function(e) {
        e.preventDefault();
        const refId = document.getElementById('trackRefId').value;
        
        // Pagpapakita ng dummy result (Prototyping logic)
        document.getElementById('statusResult').style.display = 'block';
        document.getElementById('displayRef').innerText = refId.toUpperCase();
        
        // Halimbawang logic: Gawing "Under Review" ang current active status
        document.getElementById('iconReview').classList.remove('bg-secondary');
        document.getElementById('iconReview').classList.add('bg-primary');
        document.getElementById('iconReview').classList.add('shadow');
    }
}