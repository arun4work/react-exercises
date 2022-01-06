const FIREBASE_URL =
    'https://react-http-b7eed-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function addQuote(quoteData) {
    const response = await fetch(`${FIREBASE_URL}/quotes.json`, {
        method: 'POST',
        body: JSON.stringify(quoteData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not create quote.');
    }

    return null;
}

export async function getAllQuotes() {
    const response = await fetch(`${FIREBASE_URL}/quotes.json`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch quotes.');
    }

    const loadedQuotes = [];
    for (const key in data) {
        const quoteObj = {
            id: key,
            ...data[key],
        };
        loadedQuotes.push(quoteObj);
    }
    return loadedQuotes;
}

export async function getSingleQuote(quoteId) {
    const response = await fetch(`${FIREBASE_URL}/quotes/${quoteId}.json`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch the quote.');
    }

    const loadedQuote = {
        id: quoteId,
        ...data,
    };

    return loadedQuote;
}

export async function addComment(requestData) {
    const response = await fetch(
        `${FIREBASE_URL}/comments/${requestData.quoteId}.json`,
        {
            method: 'POST',
            body: JSON.stringify(requestData.commentData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not add comment.');
    }

    return null;
}

export async function getAllComments(quoteId) {
    const response = await fetch(`${FIREBASE_URL}/comments/${quoteId}.json`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not get comments.');
    }

    const transformedComments = [];

    for (const key in data) {
        const commentObj = {
            id: key,
            ...data[key],
        };

        transformedComments.push(commentObj);
    }

    return transformedComments;
}
