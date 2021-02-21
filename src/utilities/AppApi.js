import axios from 'axios';

export default axios.create({
    baseURL: "https://api.unsplash.com/",
    headers: {
        Authorization: 'Client-ID SPYGlR9KJHaZQHk-QcMn_FtQATkiqYokCJTA1nQJkNA'
    }
})