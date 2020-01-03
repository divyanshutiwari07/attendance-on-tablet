const SERVER_URL = 'http://192.168.0.16:';
const PORT = '3000';

// const devMode = "ON_PREMISE";
let devMode = 'LOCALHOST';
// const devMode = "PRODUCTION";

export const LOCAL_HOST_SERVER = 'http://localhost:3000';

export const SOCKET_EVENTS = {
  NEW_SERVER_EVENT : devMode === "ON_PREMISE" ? "new_event_occurred" : "message",
  USER_JOINED_EVENT : devMode === "ON_PREMISE" ? "user_joined" : "message"
};

const configs = {
  ON_PREMISE: {
    TEST : 'http://localhost:3000/new_emp'
  },
  LOCALHOST: {
    TEST : 'http://localhost:3000/new_emp',
  },
  PRODUCTION: {
    TODAYS_ATTENDANCE : SERVER_URL + PORT + '/awiros_ms/attendence/api/console_data'
  }
};


export const config = configs[devMode];
