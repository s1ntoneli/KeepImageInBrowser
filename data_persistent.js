var KEY="KEY_KEEP_IMAGE"

function save_array(array) {
    var str = JSON.stringify(array);
    localStorage.setItem(KEY, str);
}

function obtainArray() {
    var str = localStorage.getItem(KEY);
    return JSON.parse(str)
}

function appendItem(item) {
    var array = obtainArray();
    if (array == null) {
        array = [];
    }
    array[array.length] = item;
    save_array(array);
}
