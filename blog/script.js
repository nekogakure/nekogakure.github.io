document.addEventListener('DOMContentLoaded', () => {
    // JSONファイルの場所
    const jsonFile = './article-2024/index/2024-06.json';

    // JSONファイルを読み込んで表示
    fetch(jsonFile)
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('posts');
            postsContainer.innerHTML = ''; // 既存のコンテンツをクリア

            posts.forEach(post => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="#" onclick="loadPost('${post.file}')">Load more</a>
                `;
                postsContainer.appendChild(article);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});

// Markdownファイルを読み込んで表示
function loadPost(file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = `
                <article>
                    <div>${marked(data)}</div>
                    <a href="index.html">戻る</a>
                </article>
            `;
        })
        .catch(error => console.error('Error loading post:', error));
}
