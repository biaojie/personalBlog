var blogList = new Vue({
    el: '#blog_list',
    data: {
        blogList: []
    },
    created () {
        axios({
            method: 'get',
            url: '/queryAllBlog'
        }).then(function(resp){
            blogList.blogList = resp.data.data;
        }).catch(function(e){
            console.log(e);
        })
    }
})