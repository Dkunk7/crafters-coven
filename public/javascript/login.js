 async function signupFormHandler(event) {
    event.preventDefault();

    // Double check these HTML values
    const username = document.querySelector(`#username-signup`).nodeValue.trim();
    const email = document.querySelector(`#email-signup`).nodeValue.trim();
    const password = document.querySelector(`#password-signup`).nodeValue.trim();

    if (username && email && password) {
        const response = await fetch(`/api/users`, {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log(`account created`);
        } else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    // Double check these HTML values
    const email = document.querySelector(`#email-login`).value.trim();
    const password = document.querySelector(`#password-login`).value.trim();

    if (email && password) {
        const response = await fetch(`/api/users/login`, {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // Am I sticking with dashboard for this????
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        }
    }
}