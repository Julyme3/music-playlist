import { ref, watchEffect } from "vue";
import { projectFirestore } from "@/firebase/config";

const getDocument = (collection, id) => {
  const error = ref(null);
  const document = ref(null);

  const documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        throw new Error("That document does not exist");
      }
    },
    (err) => {
      error.value = err.message || "Could not fetch document";
      document.value = null;
    }
  );

  watchEffect((onInvalidate) => {
    // unsub from prev document when watcher is stopped (component unmounted)
    onInvalidate(unsub);
  });

  return { error, document };
};

export default getDocument;
