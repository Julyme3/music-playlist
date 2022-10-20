import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const useCollection = (collection) => {
  const error = ref(null);
  const isPending = ref(false);

  const addDoc = async (doc) => {
    isPending.value = true;

    try {
      error.value = null;
      await projectFirestore.collection(collection).add(doc);
    } catch (e) {
      console.log(e.message);
      error.value = "Could not send the message";
    } finally {
      isPending.value = false;
    }
  };

  return { error, addDoc, isPending };
};

export default useCollection;
