export async function fetchCategories() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchJokesByCategory(category) {
    try {
        const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
        if (!response.ok) throw new Error('Failed to fetch joke by category');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function fetchJokesByQuery(query) {
    try {
        const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);
        if (!response.ok) throw new Error('Failed to fetch jokes by query');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}
