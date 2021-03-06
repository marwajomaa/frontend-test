import { firestore } from "../firebase";

export const doesUsernameExist = async (username) => {
  const res = await firestore
    .collection("users")
    .where("username", "==", username)
    .get();
  return res.docs.map((user) => user.data().length > 0);
};
