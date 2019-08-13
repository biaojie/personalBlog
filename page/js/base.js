var randomTags = new Vue({
    el: '#random_tags',
    data: {
        tags: []
    },
    computed: {
        randomColor: function () {
            return function () {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return `rgb(${red},${green},${blue})`;
            }
        },
        randomSize: function () {
            return function () {
                var size = Math.random() * 20 + 12 + 'px';
                return size;
            }
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/queryRandomTag'
        }).then(function (resp) {
            randomTags.tags = resp.data.data;
        })

    }
})

var newHot = new Vue({
    el: '#new_hot',
    data: {
        titleList: []
    },
    created() {
        axios({
            method: 'get',
            url: '/queryHotBlog?size=5'
        }).then(function (resp) {
            newHot.titleList = resp.data.data;
        })
    }
})

var newComments = new Vue({
    el: '#new_comments',
    data: {
        commentList: []
    },
    created() {
        axios({
            method: 'get',
            url: '/queryNewComments?size=5'
        }).then(function (resp) {
            newComments.commentList = getLocalTime(resp.data.data);
        })
    }
})

var search = new Vue({
    el: '#search',
    data: {
        search: ''
    },
    created() {
        this.search = getParam()
    }
})

function getParam() {
    var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
    if (searchUrlParams == '') {
        return;
    }
    var search = '';
    for (var i = 0; i < searchUrlParams.length; i++) {
        if (searchUrlParams[i].split('=')[0] == "search") {
            try {
                search = parseInt(searchUrlParams[i].split('=')[1]);
            } catch (e) {
                console.log(e)
            }
        }
    }
    return search;
}

function getLocalTime(arr) {
    for(var i = 0; i < arr.length; i++){
        arr[i].ctime = new Date(parseInt(arr[i].ctime) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }
    return arr
}