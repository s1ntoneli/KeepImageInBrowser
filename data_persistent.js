var KEY="KEY_KEEP_IMAGE"

function LocalStorage() {
    this.save_array = function(array) {
        var str = JSON.stringify(array);
        localStorage.setItem(KEY, str);
    }

    this.obtainArray = function() {
        var str = localStorage.getItem(KEY);
        return JSON.parse(str)
    }

    this.appendItem = function(item) {
        var array = obtainArray();
        if (array == null) {
            array = [];
        }
        array[array.length] = item;
        save_array(array);
    }
}