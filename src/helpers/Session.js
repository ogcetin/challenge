const Session = {};

Session.set = (key, value) => {
    sessionStorage.setItem(key, value);
};

Session.get = (key) => {
    return sessionStorage.getItem(key);
};

Session.remove = (key) => {
    return sessionStorage.removeItem(key);
};

export default Session;