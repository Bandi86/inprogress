import dotenv from 'dotenv'; // dotenv importálása

dotenv.config(); // dotenv konfiguráció

export async function fetchCars() {
    const headers: { [key: string]: string } = {
        'X-RapidAPI-Key': process.env.API_KEY!, // Környezeti változó használata
        'X-RapidAPI-Host': process.env.API_HOST! // Környezeti változó használata
    };

    const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars', { headers });
    const result = await response.json();
    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

