import axios from "axios";

export async function getUserInfo(userId) {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_URL}/api/users/user/${userId}`,
    {
      headers: { Authorization: token },
    }
  );
  const user = res.data;
  return user;
}
