import { firestore } from "../firebase";

export const doesUsernameExist = async (username) => {
  const res = await firestore
    .collection("users")
    .where("username", "==", username)
    .get();
  return res.docs.map((user) => user.data().length > 0);
};

export async function getUserByUserId(userId) {
  const result = await firestore
    .collection("users")
    .where("userId", "==", userId)
    .get();
  const [user] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}
