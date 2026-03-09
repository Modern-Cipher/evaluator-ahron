const DB_KEY = 'bsuAwardsDB';

async function initDB() {
    if (!localStorage.getItem(DB_KEY)) {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            localStorage.setItem(DB_KEY, JSON.stringify(data));
        } catch(e) {
            console.warn("No data.json found, using fallback.", e);
            localStorage.setItem(DB_KEY, JSON.stringify({ nominees: [] }));
        }
    }
}
function getData() { return JSON.parse(localStorage.getItem(DB_KEY)); }
function saveData(newData) { localStorage.setItem(DB_KEY, JSON.stringify(newData)); }

initDB();