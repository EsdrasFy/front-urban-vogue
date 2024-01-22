import axios from "axios";

async function ProductsById(ids: string) {
  try {
    const url_default = `http://localhost:9090/product/${ids}`;
    const data = await axios.get<any[]>(url_default);
    if (!data) {
      console.log("n oego produto");
    }
    console.log(data.status);

    return {
      data: data.data,
      status: data.status,
    };
  } catch (error) {
    console.log(error);
  }
}
export default ProductsById;
