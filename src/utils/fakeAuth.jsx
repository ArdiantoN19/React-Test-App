const fakeAuth = ({ email, password }) => {
  const validUser = {
    name: "john doe",
    email: "john@gmail.com",
    password: "123456",
  };

  return new Promise((resolved, rejected) => {
    if (email === validUser.email && password === validUser.password) {
      setTimeout(() => {
        resolved(
          JSON.stringify({
            status: "success",
            message: "Berhasil login",
            data: { name: validUser.name, email: validUser.email },
          })
        );
      }, 500);
    } else {
      setTimeout(() => {
        rejected(
          JSON.stringify({
            status: "fail",
            message: "Maaf email atau password Anda salah!",
            data: "",
          })
        );
      }, 500);
    }
  });
};

export default fakeAuth;
