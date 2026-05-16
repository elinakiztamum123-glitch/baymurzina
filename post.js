const postBlock = document.getElementById('post');
const commentsBlock = document.getElementById('comments');

const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

if (!postId) {
    postBlock.innerHTML = 'ID поста не указан';
} else {
    getData();
}

async function getData() {
    try {
        const res1 = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (!res1.ok) throw new Error('Пост не найден');
        const post = await res1.json();
        
        const res2 = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        if (!res2.ok) throw new Error('Комментариев нет');
        const comments = await res2.json();
        
        postBlock.innerHTML = `
            <h1>${post.title}</h1>
            <p>${post.body}</p>
            <a href="catalog.html">Назад</a>
        `;
        
        commentsBlock.innerHTML = '<h3>Комментарии:</h3>';
        
        for (let i = 0; i < comments.length; i++) {
            commentsBlock.innerHTML += `
                <div>
                    <strong>${comments[i].name}</strong> (${comments[i].email})
                    <p>${comments[i].body}</p>
                    <hr>
                </div>
            `;
        }
    } catch (error) {
        postBlock.innerHTML = `Ошибка: ${error.message}`;
    }
}
