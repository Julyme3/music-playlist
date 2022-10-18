import { ref } from "vue";

// import auth service
import { projectAuth } from "@/firebase/firebase.config";

const error = ref(null);

const logout = async () => {
  error.value = null;

  try {
    await projectAuth.signOut();
  } catch (err) {
    error.value = err.message;
  }
};

const useLogout = () => {
  return { logout, error };
};

export default useLogout;
