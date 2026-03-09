// js/views/admin.js

function renderAdminDashboard() {
    let currentDB = getData();
    let nominees = currentDB ? currentDB.nominees : [];
    
    let tableRows = '';

    if (nominees.length === 0) {
        tableRows = `<tr><td colspan="5" class="text-center text-muted py-4">No nominations received yet.</td></tr>`;
    } else {
        nominees.forEach(nom => {
            // Dropdown logic for status selection
            const statuses = ['Received', 'Under Review', 'Shortlisted', 'Final Decision'];
            let statusOptions = statuses.map(s => 
                `<option value="${s}" ${nom.status === s ? 'selected' : ''}>${s}</option>`
            ).join('');

            tableRows += `
                <tr>
                    <td class="text-start ps-4 fw-bold text-dark">OFA2026-00${nom.id}</td>
                    <td class="text-dark fw-medium">${nom.name}</td>
                    <td class="text-muted">${nom.dept}</td>
                    <td>
                        <select class="form-select form-select-sm border-primary text-primary fw-bold" onchange="updateNomStatus(${nom.id}, this.value)">
                            ${statusOptions}
                        </select>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-dark"><i class="fas fa-folder-open"></i> View Files</button>
                    </td>
                </tr>
            `;
        });
    }

    return `
        <div class="animate__animated animate__fadeIn pb-5">
            <div class="d-flex justify-content-between align-items-center mb-4 mt-2">
                <h2 class="fw-bold text-primary mb-0"><i class="fas fa-tasks me-2"></i> Admin Staff Dashboard</h2>
                <span class="badge badge-maroon-soft rounded-pill px-3 py-2 fs-6">Total Submissions: ${nominees.length}</span>
            </div>

            <div class="card shadow-sm border-0 mb-4 border-top border-primary border-4">
                <div class="card-header bg-white border-bottom p-4">
                    <h5 class="mb-0 fw-bold text-dark">Manage Nomination Statuses</h5>
                    <p class="text-muted mb-0 small">Update the status of submissions here. Changes will reflect in the Nominator's tracking page.</p>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0 text-center align-middle">
                            <thead class="bg-light">
                                <tr>
                                    <th class="text-start ps-4">Ref ID</th>
                                    <th>Nominee Name</th>
                                    <th>Department</th>
                                    <th width="200px">Update Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initAdminLogic() {
    window.updateNomStatus = function(id, newStatus) {
        let currentDB = getData();
        
        // Hanapin yung nominee at i-update ang status
        let nomineeIndex = currentDB.nominees.findIndex(n => n.id === id);
        if (nomineeIndex !== -1) {
            currentDB.nominees[nomineeIndex].status = newStatus;
            saveData(currentDB); // I-save pabalik sa LocalStorage
            
            if(typeof Swal !== 'undefined') {
                const Toast = Swal.mixin({
                    toast: true, position: 'top-end', showConfirmButton: false, timer: 2000
                });
                Toast.fire({ icon: 'success', title: 'Status updated to ' + newStatus });
            } else {
                alert('Status updated to ' + newStatus);
            }
        }
    }
}