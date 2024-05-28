import {API_URL} from './config';

const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    const data = await response.json();

    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', data.user.id);

    window.location.reload();
};

const logout = async () => {
    await fetch(`${API_URL}/auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.getItem('token')
      }
    });

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };

const isLoggedIn = !!sessionStorage.getItem('token');

export { login, logout, isLoggedIn };