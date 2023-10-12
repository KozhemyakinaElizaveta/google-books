import axios from "axios";

export const BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';
export const API_KEY = 'AIzaSyDhGtG3dRJ5fQFpeB5Q_TdeG7UFWLcBd-0';

type TServerResponse = {
    success: boolean,
};

type TOptions = {
    key: string, 
    q: string,
    orderBy: string,
    maxResults: number,
    fields: string, 
    filter: string
}

// const checkResponse = <T>(res: Response): Promise<T> => {
//     return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
// };

export const searchBooks = (params: TOptions) => {
    return axios.get(BOOKS_API_URL, {
        params,
        timeout: 5000,
    })
}

// export const handleSearch = (input: any) => {
//     return fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyDhGtG3dRJ5fQFpeB5Q_TdeG7UFWLcBd-0`)
//         .then(res => res.json())
//         .then((data) => {
//             if (!data.success){
//             throw new Error(`${(data as any).message}`);
//             }
//             return data
//         });
// }