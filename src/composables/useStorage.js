import { projectStorage } from "@/firebase/config";
import { ref } from "vue";
import getUser from "@/composables/getUser";

const { user } = getUser();
const useStorage = () => {
  const url = ref(null);
  const filePath = ref(null);
  const error = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);

      if (!res) {
        throw new Error("Could upload file");
      }

      url.value = await res.ref.getDownloadURL();
    } catch (e) {
      error.value = e.message;
      url.value = null;
    }
  };

  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path);

    try {
      await storageRef.delete();
    } catch (e) {
      console.log(e.message);
      error.value = e.message;
    }
  };

  return { url, filePath, error, uploadImage, deleteImage };
};

export default useStorage;
