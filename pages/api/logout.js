import { deleteCookie } from 'cookies-next';

const logout = () => {
    deleteCookie('jwt');
    deleteCookie('login_user');
    deleteCookie('cart_id');
};

export default logout;
