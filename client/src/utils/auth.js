import decode from 'jwt-decode';

class AuthService {
    // fetch data saved in token
    getProfile() {
        return decode(this.getToken()); // this is define below
    }

    // verify that user is logged in
    loggedIn() {
        // checks for valid token
        const token = this.getToken();
        // use type coersion to check if token is NOT undefined and is NOT expired; *Referenced from deep-thoughts
        return !!token && !this.isTokenExpired(token); // this is defined below
    }

    // check if token has expired
    isTokenExpired(token) {
        try {
            const decodedToken = decode(token);
            if (decodedToken.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // fetch token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // set token to localStorage and reload page to homepage
    login(idToken) {
        // save token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // clear token from localStorage and force logout with reload
    logout() {
        localStorage.removeItem('id_token');
        // this reloads the page and resets the state of the app
        window.location.assign('/');
    }
}

export default new AuthService();