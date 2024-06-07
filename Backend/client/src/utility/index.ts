export function setCookie(name: string, value: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}


export function getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}
export function deleteCookie(name: string): void{
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';    
}

export function converToMoney(value: number): string {
    return (value / 100) + "$";
}

export function createArrayFromNumber(value: number): number[] {
    return Array.from({ length: value }, (_v, i) => i + 1);
}

export function createCustomerFromCookie(): {
    firstName: string,
    lastName: string
} {
    const customer: {
        firstName: string,
        lastName: string
    } = JSON.parse(getCookie("customer") || '{"firstName": "", "lastName": ""}');    
    return {
        firstName: customer.firstName,
        lastName: customer.lastName,
    }
}

export function tranformFormatDate(dateString: string):string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
        
    return `${year}-${month}-${day}`
}


export function createClasses(...rest:string[]): string {
    return rest.join(" ");
}

export function buildUrl<T extends Record<string, string | number>>(url: string, params: T): string {
    let newUrl = new URL(url);
    (Object.keys(params) as Array<keyof T>).forEach(key => {
        newUrl.searchParams.append(key.toString(), params[key].toString())
    })

    return newUrl.toString()
}

export function findName(array: { name: string, path: string }[], value: string): string {
    const correctObj = [...array].filter(element => element.path === value);
    return correctObj[0]?.name || "Dashboard"
}