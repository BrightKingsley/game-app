// Socket Constants
const sk = {
  global: {
    reconnect: 'reconnect',
    disconnect_user: 'disconnect_user',
  },
  order: {
    update_rider_socket: 'update_rider_socket',
    update_passenger_socket: 'update_passenger_socket',
    update_rider_location: 'update_rider_location',
    available_rides: 'available_rides',
    ride_completed: 'ride_completed',
    ride_started: 'ride_started',
    ride_cancelled: 'ride_cancelled',
  },
} as const;

export default sk;
