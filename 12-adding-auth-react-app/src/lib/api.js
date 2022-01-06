export async function signUp(requestData) {
    const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuhGvFL6E1aMSbkIViNXXwHQwjKeRIeog',
        {
            method: 'POST',
            body: JSON.stringify({
                email: requestData.email,
                password: requestData.password,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    const data = await response.json();
    if (!response.ok) {
        const errorMessage =
            data.error && data.error.errors && data.error.errors[0].message;
        throw new Error(errorMessage || 'Authentication failed!');
    }
    return data;
}

export async function signIn(requestData) {
    const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuhGvFL6E1aMSbkIViNXXwHQwjKeRIeog',
        {
            method: 'POST',
            body: JSON.stringify({
                email: requestData.email,
                password: requestData.password,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        const errorMessage =
            data.error && data.error.errors && data.error.errors[0].message;
        throw new Error(errorMessage || 'Authentication failed!');
    }

    return data;
}

export async function changePassword(requestData) {
    const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCuhGvFL6E1aMSbkIViNXXwHQwjKeRIeog',
        {
            method: 'POST',
            body: JSON.stringify({
                idToken: requestData.idToken,
                password: requestData.password,
                returnSecureToken: false,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        const errorMessage =
            data.error && data.error.errors && data.error.errors[0].message;
        throw new Error(errorMessage || 'Password change request failed!');
    }

    return data;
}
