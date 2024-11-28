import axios from 'axios';

import {GOOGLE_MAPS_API_KEY} from '../../constants';

export default async function getRidePrice({
  destination,
  origin,
}: {
  origin: {latitude: number; longitude: number};
  destination: {latitude: number; longitude: number};
}) {
  const options = {
    method: 'GET',
    url: 'https://taxi-fare-calculator.p.rapidapi.com/search-geo',
    params: {
      dep_lat: origin.latitude,
      dep_lng: origin.longitude,
      arr_lat: destination.latitude,
      arr_lng: destination.longitude,
    },
    headers: {
      'x-rapidapi-key': '1ea0079362mshe5b517331198218p14c8efjsnc57ff377fba6',
      'x-rapidapi-host': 'taxi-fare-calculator.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function calculateDistance({
  destination,
  origin,
}: {
  origin: string;
  destination: string;
}) {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await axios.get(url);
    const result = response.data;
    const distanceInMeters = result.rows[0].elements[0].distance?.value;
    const timeInMilliSeconds = result.rows[0].elements[0].duration?.value;
    return {distanceInMeters, timeInMilliSeconds};
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
}

interface RideFareConfig {
  baseFare: number; // Base fare for every ride
  costPerKm: number; // Cost per kilometer
  costPerMin: number; // Cost per minute
  surgeMultiplier?: number; // Surge multiplier (1 = no surge)
  serviceFee?: number; // Additional service fee
  minFare?: number; // Minimum fare threshold
}

interface RideDetails {
  distanceKm: number; // Distance in kilometers
  durationMin: number; // Duration in minutes
}

// export function calculateRideFare(
//   config: RideFareConfig,
//   details: RideDetails,
// ): number {
//   const {
//     baseFare,
//     costPerKm,
//     costPerMin,
//     surgeMultiplier = 1, // Default surge to 1 (no surge)
//     serviceFee = 0, // Default service fee to 0 if none provided
//     minFare = 0, // Default min fare to 0 if none provided
//   } = config;

//   const {distanceKm, durationMin} = details;

//   // Calculate base fare + distance cost + time cost
//   let fare = baseFare + distanceKm * costPerKm + durationMin * costPerMin;

//   // Apply surge multiplier, if any
//   fare *= surgeMultiplier;

//   // Add any service fee
//   fare += serviceFee;

//   // Apply minimum fare threshold
//   if (fare < minFare) {
//     fare = minFare;
//   }

//   // Round to two decimal places for currency
//   return Math.round(fare * 100) / 100;
// }

// // Config for Nigerian Naira pricing
// export const rideFareConfig: RideFareConfig = {
//   baseFare: 200, // Base fare in Naira
//   costPerKm: 80, // Cost per kilometer
//   costPerMin: 10, // Cost per minute
//   surgeMultiplier: 1, // Default to no surge
//   serviceFee: 50, // Flat service fee
//   minFare: 400, // Minimum fare threshold
// };

// Conversion rate from Nigerian Naira to Liberian Dollar
const conversionRate = 8.56;

function convertToLiberianDollar(amountInNaira: number): number {
  return amountInNaira / conversionRate;
}

export function calculateRideFare(
  config: RideFareConfig,
  details: RideDetails,
): number {
  const {
    baseFare,
    costPerKm,
    costPerMin,
    surgeMultiplier = 1, // Default surge to 1 (no surge)
    serviceFee = 0, // Default service fee to 0 if none provided
    minFare = 0, // Default min fare to 0 if none provided
  } = config;

  const {distanceKm, durationMin} = details;

  // Calculate base fare + distance cost + time cost
  let fare = baseFare + distanceKm * costPerKm + durationMin * costPerMin;

  // Apply surge multiplier, if any
  fare *= surgeMultiplier;

  // Add any service fee
  fare += serviceFee;

  // Apply minimum fare threshold
  if (fare < minFare) {
    fare = minFare;
  }

  // Round to two decimal places for currency
  return Math.round(fare * 100) / 100;
}

// Config for Liberian Dollar pricing, converted from Nigerian Naira
export const rideFareConfig: RideFareConfig = {
  baseFare: convertToLiberianDollar(200), // Base fare in Liberian Dollars
  costPerKm: convertToLiberianDollar(80), // Cost per kilometer in Liberian Dollars
  costPerMin: convertToLiberianDollar(10), // Cost per minute in Liberian Dollars
  surgeMultiplier: 1, // Default to no surge
  serviceFee: convertToLiberianDollar(50), // Flat service fee in Liberian Dollars
  minFare: convertToLiberianDollar(400), // Minimum fare threshold in Liberian Dollars
};
