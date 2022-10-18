import { ref } from "vue";

// import auth service
import { projectAuth } from "@/firebase/config";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
  error.value = null;
  isPending.value = true;

  try {
    const response = await projectAuth.signInWithEmailAndPassword(
      email,
      password
    );

    if (!response) {
      throw new Error("Incorrect login credentials");
    }

    return response;
  } catch (err) {
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
};

const useLogin = () => {
  return { error, login };
};

export default useLogin;
