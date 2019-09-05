import { STORE_NAME, SESSION_STORE_KEY } from './Constants';

export const getSession = (state) => state.root.session;
export const getSessionStore = () => `${STORE_NAME}:${SESSION_STORE_KEY}`;