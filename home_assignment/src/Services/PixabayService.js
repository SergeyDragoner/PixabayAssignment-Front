import {fetchPixabay, pixabayStore} from "../Redux/PixabayState";
import axios from "axios";

class PixabayService {
    async getAllFromPixabay(category, page) {
        try {
            const { data } = await axios.get("http://localhost:3000/items", {
                params: { page, category },
            });
            pixabayStore.dispatch(fetchPixabay(data));
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const pixabayService = new PixabayService();
export default pixabayService;