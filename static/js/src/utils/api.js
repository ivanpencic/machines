export const api = async (url, options = {}) => {
    // Podrazumevani header-i
    const headers = {
      'Content-Type': 'application/json',
      // Dodajte ostale header-e ako su potrebni (npr. autorizacija)
      ...options.headers,
    };
  
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });
  
      // Provera da li je odgovor uspešan (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parsiranje odgovora u JSON format
      const data = await response.json();
      return data;
    } catch (error) {
      // Rukovanje greškama
      console.error('Fetch error:', error);
      throw error; // Bacite grešku dalje kako bi je komponenta mogla uhvatiti
    }
  };