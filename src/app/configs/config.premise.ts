import * as COMMON from './config.common';

const SERVER_URL = 'http://192.168.0.169' + ':';

const API_URLS = {
    LOGIN_URL : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/login',
    TODAYS_ATTENDANCE : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/console_data',
    LIST_OF_REGISTER_URL : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/list_of_registered_users',
    VERIFY_EMPLOYEE_PRESENCE_URL: SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/update_label',
    LIST_OF_SOURCES_URL: SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/list_of_sources',
    REJECT_ATTENDANCE_URL : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/reject_user_attendence'
};

export const config = {
    SERVER_ADDRESS_REALTIME : 'http://192.168.0.169:3000',
    SERVER_ADDRESS : '192.168.0.169',
    PORT : COMMON.ASSET_PORT,
    LIVE_STREAM_CAMERA_URL: 'http://192.168.0.169:',
    LIVE_STREAM_PORT: COMMON.LIVE_STREAM_PORT,
    ...API_URLS
};
