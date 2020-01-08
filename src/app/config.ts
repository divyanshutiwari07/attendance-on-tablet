const SERVER_URL = 'http://192.168.0.16:';
const PORT = '3000';

// const devMode = "ON_PREMISE";
let devMode = 'LOCALHOST';
// const devMode = "PRODUCTION";

// export const LOCAL_HOST_SERVER = 'http://localhost:3000';
export const LOCAL_HOST_SERVER = 'http://192.168.0.94:3000';

export const SOCKET_EVENTS = {
  NEW_SERVER_EVENT : devMode === 'ON_PREMISE' ? 'new_event_occurred' : 'message',
  USER_JOINED_EVENT : devMode === 'ON_PREMISE' ? 'user_joined' : 'message'
};

const configs = {
  ON_PREMISE: {
    TEST : 'http://localhost:3000/new_emp'
  },
  LOCALHOST: {
    // SERVER_ADDRESS_REALTIME : 'http://localhost:3000',
    SERVER_ADDRESS_REALTIME : 'http://192.168.0.94:3000',
    // TEST : 'http://localhost:3000/new_emp',
    TEST : 'http://192.168.0.94:3000/new_emp',
    TODAYS_ATTENDANCE : LOCAL_HOST_SERVER + '/employee-attendance',
  },
  PRODUCTION: {
    TODAYS_ATTENDANCE : SERVER_URL + PORT + '/awiros_ms/attendence/api/console_data'
  }
};


export const config = configs[devMode];
