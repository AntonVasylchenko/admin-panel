import { ProducItemData } from "../../pages/Products/type"

export type PropsProducts = {
    status: 'loading' | 'success' | 'error';
    products: ProducItemData[];
};