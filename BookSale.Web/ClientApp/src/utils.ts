export function  handleResponse(result: Response) {
    if (result.ok) {
        return result.text().then(text => text && JSON.parse(text));
    } else {
        return result.json().then(json => {
            throw json.message ? json.message : JSON.parse(json).message;
        });
    }
}