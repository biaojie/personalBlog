var everyDay = new Vue({
    el: '#every_day',
    data: {
        content: 'ffffffffffffff'
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },
    created: function() {
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then(function(resp){
            everyDay.content = resp.data.data[0].content;
        }).catch(function(resp){
            console.log('请求失败')
        })
    }
})

var articleList = new Vue({
    el: '#article_list',
    data: {
        page: 1,
        pageSize: 5,
        count: 0,
        pageNumberList: [],
        articleList: []
    },
    methods: {
        getBlogCount(){
            axios({
                method: 'GET',
                url: '/queryBlogCount',
            }).then(function(resp){
                articleList.count = resp.data.data[0].count;
                window.scrollTo(0,0);
            }).catch(function(){
                console.log('请求错误');
            })
        },
        getTagBlogCount(tag){
            axios({
                method: 'GET',
                url: '/queryByTagsCount?tag=' + tag,
            }).then(function(resp){
                articleList.count = resp.data.data[0].count;
                window.scrollTo(0,0);
            }).catch(function(){
                console.log('请求错误');
            })
        },
        getSearchCount(search){
            axios({
                method: 'GET',
                url: '/querySearchBlogCount?search=' + search,
            }).then(function(resp){
                articleList.count = resp.data.data[0].count;
                window.scrollTo(0,0);
            }).catch(function(){
                console.log('请求错误');
            })
        }
    },
    computed: {
        jumpTo: function(){
            return function(page) {
                this.getPage(page, this.pageSize);
            }
        },
        getPage: function() {
            return function(page, pageSize){
                var param = getParam();
                if(param && param[0][0] == 'tag'){
                    this.getTagBlogCount(param[0][1]);
                    axios({
                        method: 'GET',
                        url: '/queryByTags?tag=' + param[0][1] + '&pageSize=' + pageSize + '&page=' + (page - 1) 
                    }).then(function(resp){
                        var result = resp.data.data;

                        getLocalTime(result);
                        articleList.articleList = result;
	
                        articleList.page = page;
                        articleList.generatePageTool;
                    }).catch(function(resp){
                        console.log('请求错误');
                    })  
                } else if (param && param[0][0] == 'search') {
                    this.getSearchCount(param[0][1]);
                    axios({
                        method: 'GET',
                        url: '/querySearchBlog?search=' + param[0][1] + '&pageSize=' + pageSize + '&page=' + (page - 1) 
                    }).then(function(resp){
                        var result = resp.data.data;
                        getLocalTime(result);
                        articleList.articleList = result;
                        articleList.page = page;
                        articleList.generatePageTool;
                    }).catch(function(resp){
                        console.log('请求错误');
                    }) 
                }else{
                    this.getBlogCount()
                    axios({
                        method: 'GET',
                        url: '/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                    }).then(function(resp){
                        var result = resp.data.data;
                        getLocalTime(result);
                        articleList.articleList = result;
                        articleList.page = page;
                        articleList.generatePageTool;
                    }).catch(function(resp){
                        console.log('请求错误');
                    })
                }
                
            }
        },
        generatePageTool: function() {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text: '<<', page: 1});
            if(nowPage > 2){
                result.push({text: nowPage - 2 , page: nowPage-2});
            }
            if(nowPage > 1){
                result.push({text: nowPage - 1 , page: nowPage-1});
            }
            result.push({text: nowPage, page: nowPage});
            if(nowPage + 1 <= (totalCount + pageSize - 1) / pageSize){
                result.push({text: nowPage + 1 , page: nowPage+1});
            }
            if(nowPage + 2 <= (totalCount + pageSize - 1) / pageSize){
                result.push({text: nowPage + 2 , page: nowPage+2});
            }
            result.push({text: ">>", page: parseInt((totalCount + pageSize - 1) / pageSize)});
            this.pageNumberList = result;
            return result;
        }
    },
        
    created: function() {
        this.getPage(this.page, this.pageSize)
    }
})

function getParam() {
    var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
    if (searchUrlParams == '') {
        return;
    }
    var tag = [];
    for (var i = 0; i < searchUrlParams.length; i++) {
        if (searchUrlParams[i].split('=')[0] == "tag" || searchUrlParams[i].split('=')[0] == "search") {
            try {
                tag.push(searchUrlParams[i].split('='));
                return tag;
            } catch (e) {
                console.log(e)
            }
        }
    }
    return tag;
}