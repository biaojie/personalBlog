var blogDetail = new Vue({
    el: '#blog_detail',
    data: {
        title: '',
        content: '',
        ctime: '',
        tags: '',
        views: ''
    },
    computed: {

    },
    created: function () {
        // 获取到url的id
        var bid = getParam();
        axios({
            method: 'get',
            url: '/queryBlogById?bid=' + bid
        }).then(function (resp) {
            var temp = getLocalTime(resp.data.data)
            var result = temp[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.ctime = result.ctime;
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;
        }).catch(function (resp) {
            console.log('请求失败');
        })
    }
})

var sendComment = new Vue({
    el: '#send_comment',
    data: {
        reply: -1,
        name: '',
        email: '',
        content: '',
        code: '',
        vcode: '',
        rightCode: '',
        reply_name: 0,
    },
    computed: {

    },
    methods: {
        sendComment() {
            if (this.code.toLocaleLowerCase() != this.rightCode.toLocaleLowerCase()) {
                alert('验证码有误');
                return;
            }
            var bid = getParam();
            axios({
                method: 'get',
                url: `/addComment?bid=${bid}&parent=${this.reply}&name=${this.name}&email=${this.email}&content=${this.content}&parent_name=${this.reply_name}`
            }).then(function (resp) {
                alert('评论成功');
                blogComments.getCommentCount();
                blogComments.getComment();
                sendComment.getCode();
                window.scrollTo(0,0);
                sendComment.reply = -1;
                sendComment.name = '';
                sendComment.email = '';
                sendComment.content = '';
                sendComment.code = '';
                sendComment.reply_name = 0;
            }).catch(function (resp) {
                console.log('请求失败')
            })
        },
        getCode() {
            axios({
                method: 'get',
                url: '/queryRandomCode'
            }).then(function (resp) {
                sendComment.vcode = resp.data.data.data;
                sendComment.rightCode = resp.data.data.text;
            }).catch(function (resp) {
                console.log('请求失败');
            })
        }
    },
    created: function () {
        this.getCode()
    }
})

var blogComments = new Vue({
    el: '#blog_comments',
    data: {
        total: 0,
        comments: []
    },
    methods: {
        reply(commentId, userName) {
            Vue.set(sendComment, 'reply', commentId)
            sendComment.$set(sendComment, 'reply_name', userName);
        },
        getCommentCount() {
            var bid = getParam();
            axios({
                method: 'get',
                url: '/queryCommentsCountByBlogId?bid=' + bid
            }).then(function (resp) {
                blogComments.total = resp.data.data[0].count;
            })
        },
        getComment() {
            // 获取到url的id
            var bid = getParam();
            axios({
                method: 'get',
                url: '/queryCommentsByBlogId?bid=' + bid
            }).then(function (resp) {
                blogComments.comments = getLocalTime(resp.data.data);
                for (var i = 0; i < blogComments.comments.length; i++) {
                    if (blogComments.comments[i].parent > -1) {
                        blogComments.comments[i].options = '回复@' + blogComments.comments[i].parent_name
                    }
                }
            }).catch(function (e) {
                console.log(e);
            })
        }
    },
    computed: {

    },
    created() {
        this.getComment()
        this.getCommentCount();
    }
})

function getParam() {
    var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
    if (searchUrlParams == '') {
        return;
    }
    var bid = -10;
    for (var i = 0; i < searchUrlParams.length; i++) {
        if (searchUrlParams[i].split('=')[0] == "bid") {
            try {
                bid = parseInt(searchUrlParams[i].split('=')[1]);
            } catch (e) {
                console.log(e)
            }
        }
    }
    return bid;
}