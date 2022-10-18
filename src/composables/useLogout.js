import { ref } from "vue";

// import auth service
import { projectAuth } from "@/firebase/firebase.config";

const error = ref(null);
const isPending = ref(false);

const logout = async () => {
  error.value = null;
  isPending.value = true;

  try {
    await projectAuth.signOut();
  } catch (err) {
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
};

const useLogout = () => {
  return { logout, error, isPending };
};

export default useLogout;
