import { ref } from "vue";

// import auth service
import { projectAuth } from "@/firebase/config";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
  isPending.value = true;

  try {
    error.value = null;
    const response = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    if (!response) {
      throw new Error("Could not complete the signup");
    }

    await response.user.updateProfile({ displayName });

    return response;
  } catch (err) {
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
