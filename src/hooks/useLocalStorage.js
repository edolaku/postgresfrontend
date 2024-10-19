import { useState, useEffect } from "react";


// Fungsi ini digunakan untuk mengambil data dari localStorage secara aman, dengan beberapa fitur tambahan:
// Cek lingkungan: Menghindari error saat dijalankan di server (seperti di aplikasi Next.js).
// Dukungan fungsi default: Mendukung initialValue sebagai fungsi sehingga nilai default dapat dihitung secara dinamis.
// Parsing data: Mengambil data dari localStorage dalam bentuk yang benar (objek, array, dll.) dengan menggunakan JSON.parse.
const getLocalStorage = (key, initialValue) => {
    // SSR seperti di next.js
    // mengecek apakah window ada atau tidak. Ini berguna di aplikasi seperti Next.js, di mana kode bisa dijalankan di server (server-side rendering) sebelum sampai ke browser. Jika window tidak tersedia (yaitu, kode dijalankan di server), fungsi akan langsung
    // Hal ini mencegah error karena localStorage hanya tersedia di browser, bukan di server
    if (typeof window === 'undefined') {
        return initialValue
    }

    // Jika nilai ditemukan, maka nilai tersebut dikembalikan
    const localValue = localStorage.getItem(key)
    if (localValue) return JSON.parse(localValue)

    // Jika initialValue adalah sebuah fungsi, maka fungsi tersebut akan dijalankan
    if (initialValue instanceof Function) {
        return initialValue()
    }

    return initialValue
}

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => getLocalStorage(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;