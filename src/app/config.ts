const PORT = '3000';
const _PORT = '4000';
const SERVER_URL = 'http://192.168.0.80:';

const devMode = 'ON_PREMISE';
// let devMode = 'LOCALHOST';
// const devMode = "PRODUCTION";

// export const LOCAL_HOST_SERVER = 'http://localhost:' + PORT;
export const LOCAL_HOST_SERVER = 'http://192.168.0.94:' + PORT;

export const SOCKET_EVENTS = {
  NEW_SERVER_EVENT : devMode === 'ON_PREMISE' ? 'new_event_occurred' : 'message',
  USER_JOINED_EVENT : devMode === 'ON_PREMISE' ? 'user_joined' : 'message'
};

const configs = {
  ON_PREMISE: {
    LOGIN_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/login',
    TODAYS_ATTENDANCE : SERVER_URL + _PORT + '/awiros_ms/attendence/api/console_data',
    LIST_OF_REGISTER_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/list_of_registered_users',
    SERVER_ADDRESS_REALTIME : 'http://192.168.0.80:3000',
  },

  LOCALHOST: {
    SERVER_ADDRESS_REALTIME : LOCAL_HOST_SERVER,
    TEST :  LOCAL_HOST_SERVER + '/new_emp',
    TODAYS_ATTENDANCE : LOCAL_HOST_SERVER + '/employee-attendance',
    LIST_OF_REGISTER_URL : LOCAL_HOST_SERVER + '/list_of_registered_users',
  },

  PRODUCTION: {
    TODAYS_ATTENDANCE : SERVER_URL + PORT + '/awiros_ms/attendence/api/console_data'
  }
};


export const config = configs[devMode];
