// execute this in browser with www.avantagesjeunes.com opened

let db;
let result = {};

const DBOpenRequest = window.indexedDB.open('CAJ');

DBOpenRequest.onsuccess = (event) => {
    db = DBOpenRequest.result;
    exportDB()
};

function exportDB() {
    const objectStore = db.transaction('badges').objectStore('badges');
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;

        // Check if there are no (more) cursor items to iterate through
        if (!cursor) {
            // No more items to iterate through, we quit.
            return;
        }

        const val = cursor.value;
        result[val.id_badge] = val
        console.log(val)
        cursor.continue()
    }
    console.log(result)
}
