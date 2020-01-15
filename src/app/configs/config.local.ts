const LOCAL_API_PORT = '3000';

export const LOCAL_HOST_SERVER = 'http://localhost:' + LOCAL_API_PORT;

export const config = {
    LOGIN_URL : LOCAL_HOST_SERVER + '/login',
    SERVER_ADDRESS: "",
    PORT : "",
    SERVER_ADDRESS_REALTIME : LOCAL_HOST_SERVER,
    LIVE_STREAM_CAMERA_URL: '',
    LIVE_STREAM_PORT: LOCAL_API_PORT,
    TEST :  LOCAL_HOST_SERVER + '/new_emp',
    TODAYS_ATTENDANCE : LOCAL_HOST_SERVER + '/employee-attendance',
    LIST_OF_REGISTER_URL : LOCAL_HOST_SERVER + '/list_of_registered_users',
    VERIFY_EMPLOYEE_PRESENCE_URL: LOCAL_HOST_SERVER + '/verify',
    LIST_OF_SOURCES_URL: LOCAL_HOST_SERVER + '/list_of_sources'
}