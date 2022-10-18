import { ref } from "vue";
import { projectFirestore } from "@/firebase/firebase.config";

const useCollection = (collection) => {
  const error = ref(null);

  const addDoc = async (doc) => {
    try {
      error.value = null;
      await projectFirestore.collection(collection).add(doc);
    } catch (e) {
      console.log(e.message);
      error.value = "Could not send the message";
    }
  };

  return { error, addDoc };
};

export default useCollection;
