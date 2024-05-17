


export const GetAllSeries = async () => {
    try {
        const link = "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=series"
        const response = await fetch(link);
        const data = await response.json();
        return data.entries;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};
export const GetAllMovies = async () => {
    try {
        const link = "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=movie"
        const response = await fetch(link);
        const data = await response.json();
        return data.entries;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}
export const get3RandomMovies = async () => {
    try {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        const link = `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=${randomNum}-${randomNum + 2}&byProgramType=movie`;
        const response = await fetch(link);
        const data = await response.json();
        return data.entries;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}


export const getMoviesByGenreInRange = async (genre: string, range: string) => {
    try {
        const link = `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=${range}&byTags=${genre}&byProgramType=movie`
        const response = await fetch(link);
        const data = await response.json();
        return data.entries;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}
export const getSeriesByGenreInRange = async (genre: string, range: string) => {
    try {
        const link = `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=${range}&byTags=${genre}&byProgramType=series`
        const response = await fetch(link);
        const data = await response.json();
        return data.entries;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}



