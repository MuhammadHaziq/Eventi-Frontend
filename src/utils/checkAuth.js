const LoginCheck = () => {
    let token = localStorage.getItem("eventi");
    try {
        if (
            typeof token !== "undefined" &&
            token !== false &&
            token !== "false" &&
            token !== "" &&
            token !== null
        ) {
            return true;

        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};
export default LoginCheck;
