import { ref } from "vue";

// import auth service
import { projectAuth } from "@/firebase/config";

const user = ref(projectAuth.currentUser);

projectAuth.onAuthStateChanged((_user) => {
  console.log("Current user in onAuthStateChanged: ", _user);
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
