var KEY="KEY_KEEP_IMAGE"

function Storage() {
    this.save_array = function(array) {
    }

    this.obtainArray = function(callback) {
    }

    this.appendItem = function(item) {
    }
    this.initStorage = function() {
    }
}

function LocalStorage() {
    this.save_array = function(array) {
        var str = JSON.stringify(array);
        localStorage.setItem(KEY, str);
    }

    this.obtainArray = function(callback) {
        var str = localStorage.getItem(KEY);
        callback(JSON.parse(str));
    }

    this.appendItem = function(item) {
        console.log("appendItem LocalStorage");
        var _this = this;
        this.obtainArray(function(array) {
            if (array == null) {
                array = [];
            }
            array[array.length] = item;
            _this.save_array(array);
        });
    }
    this.initStorage = function() {

    }
}

function LeanCloudStorage() {
    this.APP_ID = '1Gb9PlMTvFaBgP1AqSobiYuP-gzGzoHsz';
    this.APP_KEY = 'CdNGIbaU4q1H6TVY4fq5ss3u';
    this.ImageRepo = AV.Object.extend('ImageRepo');

    this.formatItem = function(item) {
        var repo = new this.ImageRepo();
        repo.set("srcUrl", item.srcUrl);
        repo.set("tabUrl", item.tabUrl);
        repo.set("tabTitle", item.tabTitle);
        return repo;
    }
    this.parseItem = function(repo) {
        console.log("parsing");
        var item = {};
        item.srcUrl = repo.get("srcUrl");
        item.tabUrl = repo.get("tabUrl");
        item.tabTitle = repo.get("tabTitle");
        console.log("parsed");
        return item;
    }

    this.save_array = function(array) {
        var repoArray = [];
        if (array != null) {
            for (var item in array) {
                var repo = this.formatItem(item);
                repoArray[repoArray.length] = repo;
            }
            AV.Object.saveAll(repoArray).then(function (objects) {
                // 成功
                console.log("saveAll success");
            }, function (error) {
                // 异常处理
                console.log("saveAll error " + error.message);
            });
        }
    }

    this.obtainArray = function(callback) {
        var query = new AV.Query('ImageRepo');
        var _this = this;
        query.find().then(function(results) {
            if (results != null && results.length > 0) {
                console.log("result is not null, length is " + results.length);
                console.log("results " + results);
                var array = [];
                for (var i = 0; i < results.length; i++) {
                    console.log(results[i]);
                    console.log(results[i].get("tabUrl"));
                    array[i] = _this.parseItem(results[i]);
                    console.log(array[i]);
                }
                callback(array);
            } else {
                callback(null);
            }
        }, function(error) {
            callback(null);
            console.error('Failed to find objects, with error message: ' + error.message);
        });
    }

    this.appendItem = function(item) {
        console.log("appendItem LeanCloudStorage");
        var storage = this;
        var repo = this.formatItem(item);
        repo.save().then(function (repo) {
            // 成功保存之后，执行其他逻辑.
            console.log('New object created with objectId: ' + repo.id);
        }, function (error) {
            // 异常处理
            console.error('Failed to create new object, with error message: ' + error.message);
        });
    }

    this.initStorage = function() {
        AV.init({
          appId: this.APP_ID,
          appKey: this.APP_KEY
        });
    }
}

var recentStorage = null;

function getRecentStorage() {
    return recentStorage;
}

function instantiateStorage(className) {
    if (className == "LocalStorage") {
        recentStorage = new LocalStorage();
    } else if (className == "LeanCloudStorage") {
        recentStorage = new LeanCloudStorage();
    }
    return recentStorage;
}