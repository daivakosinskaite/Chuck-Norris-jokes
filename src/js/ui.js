import { fetchCategories, fetchJokesByCategory, fetchJokesByQuery } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('categorySelect');
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');
    const searchResults = document.getElementById('searchResults');
    const jokeList = document.getElementById('jokeList');
    const homeLink = document.getElementById('homeLink');
    const jokeListLink = document.getElementById('jokeListLink');
    const homePage = document.getElementById('homePage');
    const jokeListPage = document.getElementById('jokeListPage');

    
    function toggleInputs() {
        if (categorySelect.value) {
            searchInput.disabled = true;
        } else if (searchInput.value) {
            categorySelect.disabled = true;
        } else {
            searchInput.disabled = false;
            categorySelect.disabled = false;
        }
    }

    
    async function loadCategories() {
        const categories = await fetchCategories();
        renderCategories(categories);
    }

    function renderCategories(categories) {
        categorySelect.innerHTML = '<option value="">Select a category</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    
    function renderJokes(jokes) {
        searchResults.innerHTML = '';
        jokes.forEach(joke => {
            const jokeDiv = document.createElement('div');
            jokeDiv.className = 'jokes__item';
            jokeDiv.innerHTML = `
                <p>${joke.value}</p>
                <button class="jokes__save">Save</button>
            `;
            jokeDiv.querySelector('.jokes__save').addEventListener('click', () => saveJoke(joke));
            searchResults.appendChild(jokeDiv);
        });
    }

    
    function saveJoke(joke) {
        let savedJokes = JSON.parse(localStorage.getItem('savedJokes')) || [];
        savedJokes.push(joke);
        localStorage.setItem('savedJokes', JSON.stringify(savedJokes));
        alert('Joke saved!');
    }

    
    function loadSavedJokes() {
        jokeList.innerHTML = '';
        let savedJokes = JSON.parse(localStorage.getItem('savedJokes')) || [];
        savedJokes.forEach(joke => {
            const jokeDiv = document.createElement('div');
            jokeDiv.className = 'jokes__item';
            jokeDiv.innerHTML = `<p>${joke.value}</p>`;
            jokeList.appendChild(jokeDiv);
        });
    }

    
    function showHomePage() {
        homePage.style.display = 'block';
        jokeListPage.style.display = 'none';
    }

    function showJokeListPage() {
        homePage.style.display = 'none';
        jokeListPage.style.display = 'block';
        loadSavedJokes();
    }

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showHomePage();
    });

    jokeListLink.addEventListener('click', (e) => {
        e.preventDefault();
        showJokeListPage();
    });

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = searchInput.value;
        const category = categorySelect.value;
        let jokes = [];

        try {
            if (query) {
                const result = await fetchJokesByQuery(query);
                jokes = result.result;
            } else if (category) {
                const joke = await fetchJokesByCategory(category);
                jokes = [joke];
            }
            renderJokes(jokes);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch jokes');
        }
    });

    categorySelect.addEventListener('change', toggleInputs);
    searchInput.addEventListener('input', toggleInputs);

    loadCategories();
    showHomePage();
});
