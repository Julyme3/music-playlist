import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  const deleteDoc = async () => {
    error.value = null;
    const documentRef = projectFirestore.collection(collection).doc(id);

    try {
      isPending.value = true;
      const res = await documentRef.delete();

      if (!res) {
        throw new Error("Could not delete playlist");
      }

      return res;
    } catch (e) {
      console.log(e.message);
      error.value = e.message;
    } finally {
      isPending.value = false;
    }
  };
  return { error, isPending, deleteDoc };
};

export default useDocument;
