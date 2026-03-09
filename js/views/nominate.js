// js/views/nominate.js

function renderNominationForm() {
    return `
        <div class="row justify-content-center animate__animated animate__fadeIn pb-5 nominate-wrapper">
            <div class="col-md-10">
                <div class="d-flex justify-content-between align-items-center mb-4 mt-2">
                    <h2 class="fw-bold text-primary mb-0"><i class="fas fa-award me-2"></i> Start Nomination</h2>
                    <span class="badge badge-maroon-soft rounded-pill px-3 py-2 fs-6">Cycle 2026</span>
                </div>
                
                <div id="eligibilityGate" class="step-container border-top border-primary border-4 shadow-sm">
                    <div class="text-center mb-4">
                        <i class="fas fa-clipboard-check fa-3x text-primary mb-3"></i>
                        <h4 class="fw-bold">Eligibility Check</h4>
                        <p class="text-muted">Please confirm all eligibility items to continue.</p>
                    </div>
                    
                    <div class="mb-4">
                        <label class="form-check check-card mb-3 d-flex align-items-center m-0">
                            <input class="form-check-input elig-check fs-4 mt-0 me-3 shadow-none" type="checkbox" id="chk1">
                            <span class="form-check-label text-dark fw-medium">I have direct knowledge of the nominee’s work.</span>
                        </label>
                        
                        <label class="form-check check-card mb-3 d-flex align-items-center m-0">
                            <input class="form-check-input elig-check fs-4 mt-0 me-3 shadow-none" type="checkbox" id="chk2">
                            <span class="form-check-label text-dark fw-medium">I can provide at least two pieces of evidence.</span>
                        </label>
                        
                        <label class="form-check check-card d-flex align-items-center m-0">
                            <input class="form-check-input elig-check fs-4 mt-0 me-3 shadow-none" type="checkbox" id="chk3">
                            <span class="form-check-label text-dark fw-medium">I understand false claims may invalidate the nomination.</span>
                        </label>
                    </div>
                    
                    <div class="text-end mt-4">
                        <button id="btnContinueNom" class="btn btn-maroon btn-lg px-5 fw-bold rounded-pill" disabled>
                            Start Form <i class="fas fa-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>

                <div id="nominationFormContainer" class="step-container border-top border-primary border-4 shadow-sm" style="display: none;">
                    
                    <ul class="nav nav-pills nav-justified mb-4 border-bottom pb-3" id="nominationTabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active fw-bold" id="step1-tab" data-bs-toggle="pill" data-bs-target="#step1" type="button" role="tab">1. Nominator</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link fw-bold" id="step2-tab" data-bs-toggle="pill" data-bs-target="#step2" type="button" role="tab">2. Nominee</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link fw-bold" id="step3-tab" data-bs-toggle="pill" data-bs-target="#step3" type="button" role="tab">3. Justification</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link fw-bold" id="step4-tab" data-bs-toggle="pill" data-bs-target="#step4" type="button" role="tab">4. Submit</button>
                        </li>
                    </ul>

                    <form id="nomForm">
                        <div class="tab-content" id="nominationTabsContent">
                            
                            <div class="tab-pane fade show active" id="step1" role="tabpanel">
                                <h5 class="text-primary fw-bold mb-4"><i class="fas fa-user-edit me-2"></i>Nominator Information</h5>
                                <div class="row g-4">
                                    <div class="col-md-6">
                                        <label class="form-label fw-medium text-dark">Your Full Name</label>
                                        <input type="text" class="form-control form-control-lg" id="nomNominatorName" required placeholder="Juan Dela Cruz">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-medium text-dark">Relationship to Nominee</label>
                                        <input type="text" class="form-control form-control-lg" required placeholder="e.g., Department Head, Colleague">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-medium text-dark">Your Email Address</label>
                                        <input type="email" class="form-control form-control-lg" required placeholder="name@domain.com">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-medium text-dark">Phone Number (Optional)</label>
                                        <input type="tel" class="form-control form-control-lg" placeholder="+63 900 000 0000">
                                    </div>
                                </div>
                                <div class="text-end mt-5 pt-3 border-top">
                                    <button type="button" class="btn btn-maroon px-5 fw-bold rounded-pill" onclick="nextTab('step2-tab')">Next Step <i class="fas fa-arrow-right ms-2"></i></button>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="step2" role="tabpanel">
                                <h5 class="text-primary fw-bold mb-4"><i class="fas fa-chalkboard-teacher me-2"></i>Nominee Information</h5>
                                <div class="row g-4">
                                    <div class="col-md-6">
                                        <label class="form-label fw-medium text-dark">Nominee's Full Name</label>
                                        <input type="text" class="form-control form-control-lg" id="nomNomineeName" required placeholder="e.g. Prof. Maria Santos">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-medium text-dark">Department</label>
                                        <input type="text" class="form-control form-control-lg" id="nomNomineeDept" required placeholder="e.g., College of Engineering">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-medium text-dark">Rank / Position</label>
                                        <input type="text" class="form-control form-control-lg" required placeholder="e.g., Associate Professor">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-medium text-dark">Award Category</label>
                                        <select class="form-select form-control-lg" id="nomCategory" required>
                                            <option value="" selected disabled>Select Category...</option>
                                            <option>Teaching Excellence</option>
                                            <option>Research Impact</option>
                                            <option>Community Service</option>
                                            <option>Innovation in Instruction</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between mt-5 pt-3 border-top">
                                    <button type="button" class="btn btn-outline-secondary px-4 fw-bold rounded-pill" onclick="nextTab('step1-tab')"><i class="fas fa-arrow-left me-2"></i> Back</button>
                                    <button type="button" class="btn btn-maroon px-5 fw-bold rounded-pill" onclick="nextTab('step3-tab')">Next Step <i class="fas fa-arrow-right ms-2"></i></button>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="step3" role="tabpanel">
                                <h5 class="text-primary fw-bold mb-4"><i class="fas fa-align-left me-2"></i>Criteria-Aligned Justifications</h5>
                                
                                <div class="mb-4">
                                    <label class="form-label fw-bold text-dark">Superior Accomplishments <span class="fw-normal text-muted">(150–300 words)</span></label>
                                    <textarea class="form-control word-counter-input" rows="3" required></textarea>
                                    <div class="text-end mt-1"><small class="text-muted word-count-display">0 words</small></div>
                                </div>
                                <div class="mb-4">
                                    <label class="form-label fw-bold text-dark">Innovation & Creativity <span class="fw-normal text-muted">(150–300 words)</span></label>
                                    <textarea class="form-control word-counter-input" rows="3" required></textarea>
                                    <div class="text-end mt-1"><small class="text-muted word-count-display">0 words</small></div>
                                </div>
                                <div class="mb-4">
                                    <label class="form-label fw-bold text-dark">Exemplary Conduct & Professionalism <span class="fw-normal text-muted">(150–300 words)</span></label>
                                    <textarea class="form-control word-counter-input" rows="3" required></textarea>
                                    <div class="text-end mt-1"><small class="text-muted word-count-display">0 words</small></div>
                                </div>
                                <div class="mb-4">
                                    <label class="form-label fw-bold text-dark">Impact on Students/Institution <span class="fw-normal text-muted">(150–300 words)</span></label>
                                    <textarea class="form-control word-counter-input" rows="3" required></textarea>
                                    <div class="text-end mt-1"><small class="text-muted word-count-display">0 words</small></div>
                                </div>

                                <div class="d-flex justify-content-between mt-4 pt-3 border-top">
                                    <button type="button" class="btn btn-outline-secondary px-4 fw-bold rounded-pill" onclick="nextTab('step2-tab')"><i class="fas fa-arrow-left me-2"></i> Back</button>
                                    <button type="button" class="btn btn-maroon px-5 fw-bold rounded-pill" onclick="nextTab('step4-tab')">Next Step <i class="fas fa-arrow-right ms-2"></i></button>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="step4" role="tabpanel">
                                <h5 class="text-primary fw-bold mb-4"><i class="fas fa-file-upload me-2"></i>Evidence & Declarations</h5>
                                
                                <div class="bg-light p-4 rounded mb-4 border">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold text-dark">Upload Evidence Files</label>
                                        <input type="file" class="form-control form-control-lg bg-white" multiple accept=".pdf,.jpg,.png,.mp4" required>
                                        <div class="form-text mt-2"><i class="fas fa-info-circle text-primary me-1"></i> Min 2, max 6 files allowed. (Max 50MB per file).</div>
                                    </div>
                                    <div>
                                        <label class="form-label fw-bold text-dark">Evidence Captions</label>
                                        <textarea class="form-control" rows="2" placeholder="Briefly describe your uploaded files..." required></textarea>
                                    </div>
                                </div>

                                <div class="bg-white p-4 border rounded-3 mb-4 shadow-sm">
                                    <label class="form-check check-card mb-3 d-flex align-items-start m-0">
                                        <input class="form-check-input fs-5 mt-1 me-3 shadow-none" type="checkbox" required>
                                        <span class="form-check-label text-dark fw-medium">I declare that the information provided is accurate and true to the best of my knowledge.</span>
                                    </label>
                                    <label class="form-check check-card d-flex align-items-start m-0">
                                        <input class="form-check-input fs-5 mt-1 me-3 shadow-none" type="checkbox" required>
                                        <span class="form-check-label text-dark fw-medium">I consent to the processing of this information for the evaluation of the award.</span>
                                    </label>
                                </div>

                                <div class="d-flex justify-content-between mt-5 pt-3 border-top">
                                    <button type="button" class="btn btn-outline-secondary px-4 fw-bold rounded-pill" onclick="nextTab('step3-tab')"><i class="fas fa-arrow-left me-2"></i> Back</button>
                                    <button type="submit" class="btn btn-success btn-lg fw-bold rounded-pill px-5 shadow-sm" onclick="submitNomination(event)">
                                        <i class="fas fa-paper-plane me-2"></i> Submit Final Nomination
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function nextTab(tabId) {
    const triggerEl = document.getElementById(tabId);
    if (triggerEl) {
        const tabInstance = new bootstrap.Tab(triggerEl);
        tabInstance.show();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function initNominateLogic() {
    const checks = document.querySelectorAll('.elig-check');
    const btn = document.getElementById('btnContinueNom');
    const gate = document.getElementById('eligibilityGate');
    const form = document.getElementById('nominationFormContainer');

    checks.forEach(check => {
        check.addEventListener('change', () => {
            btn.disabled = !Array.from(checks).every(c => c.checked);
        });
    });

    if(btn) {
        btn.addEventListener('click', () => {
            gate.style.display = 'none';
            form.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const textareas = document.querySelectorAll('.word-counter-input');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            const display = this.nextElementSibling.querySelector('.word-count-display');
            const wordCount = this.value.trim().split(/\s+/).filter(word => word.length > 0).length;
            display.innerText = `${wordCount} words`;
            
            if (wordCount >= 150 && wordCount <= 300) {
                display.classList.remove('text-muted', 'text-danger');
                display.classList.add('text-success');
            } else if (wordCount > 300) {
                display.classList.remove('text-muted', 'text-success');
                display.classList.add('text-danger');
                display.innerText += ' (Over limit)';
            } else {
                display.classList.remove('text-success', 'text-danger');
                display.classList.add('text-muted');
            }
        });
    });

    window.submitNomination = function(e) {
        const nomFormElement = document.getElementById('nomForm');
        
        if(!nomFormElement.checkValidity()) {
            nomFormElement.reportValidity();
            return;
        }

        e.preventDefault();

        const nomineeNameInput = document.getElementById('nomNomineeName').value;
        const nomineeDeptInput = document.getElementById('nomNomineeDept').value;
        
        let currentDB = getData();
        if(!currentDB) currentDB = { nominees: [] };

        const newId = currentDB.nominees.length > 0 ? currentDB.nominees[currentDB.nominees.length - 1].id + 1 : 1;

        currentDB.nominees.push({
            id: newId,
            name: nomineeNameInput,
            dept: nomineeDeptInput,
            status: "Pending"
        });

        saveData(currentDB);

        if(typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Nomination Submitted!',
                text: 'Your application has been saved to the database. Ref ID: OFA2026-00' + newId,
                icon: 'success',
                confirmButtonColor: '#800000'
            }).then(() => {
                window.location.hash = '/'; 
                window.scrollTo(0,0);
            });
        } else {
            alert("Nomination Submitted successfully! Ref ID: OFA2026-00" + newId);
            window.location.hash = '/';
            window.scrollTo(0,0);
        }
    }
}