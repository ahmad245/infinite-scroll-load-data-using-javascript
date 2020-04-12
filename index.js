const fetchData = async (limit = 1, page = 1) => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
            _limit: limit,
            _page: page
        }
    });
    console.log(response.data);

    return response.data;
}

let postContainer = document.getElementById('posts-container');
let loading=document.querySelector('.loader');
let limit=5;
let page=1;
const loadPost = async () => {
    let posts = await fetchData(limit,page);
    posts.forEach(el => {
        let post = document.createElement('div');
        post.innerHTML = `
        <div class="col s8 offset-s2">
        <div class="card-panel grey lighten-5 z-depth-1">
            <div class="row ">
                <div class="col s4">
                    <strong> ${el.title} </strong>
                </div>
                <div class="col s4">
                    <small class="black-text"> ${el.userId}</small>
                </div>
                <div class="col s4">
                    <a href="" class="waves-effect waves-light btn-small red">edit</a>
                    <a href="#" class="waves-effect waves-light modal-trigger btn-small red">delete</a>
                </div>
            </div>
            <div class="row">
                <div class="col s10 offset-s2">
                    ${el.body}
                </div>
            </div>
        </div>
    </div>
        `;
        
        postContainer.appendChild(post);
    });
}

loadPost();

const showLoading=()=>{
    loading.classList.add('show');
}

const hideLoading=()=>{
    loading.classList.remove('show');
}

window.addEventListener('scroll',()=>{
    let {scrollTop,clientHeight,scrollHeight}=document.documentElement;
    if(scrollTop+clientHeight >= scrollHeight-5){
        showLoading();
        ++page;
        loadPost().then(()=>hideLoading())
    }
})