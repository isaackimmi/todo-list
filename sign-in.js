// Components for SIGN-IN FORM
const signInForm = document.getElementById("sign-in-form");
const userEmail = signInForm['user-login-email'];
const userPassword = signInForm['user-login-password'];
const confirmLoginButton = document.getElementById("confirm-login-button");
const closeLoginButton = document.getElementById("close-login-modal");
const signInButton = document.getElementById("sign-in-button");
const signOutButton = document.getElementById("sign-out-button");
//const loginModal = document.getElementById("login-modal");

// Components for CREATE A NEW ACCOUNT FORM
const createNewAccButton = document.getElementById("create-new-account-button");
const createAccountForm = document.getElementById("create-account-form")
const newUserEmail = createAccountForm['new-user-login-email'];
const newUserPassword = createAccountForm['new-user-login-password'];
const closeSignUpButton = document.getElementById("close-create-account-modal");
const confirmNewAccountButton = document.getElementById("confirm-new-account-button");

async function signUserOut() {
    try {
        await auth.signOut();
    } catch (error) {
        console.log(error);
    }
}


function openSignUpModal(event) {
    event.stopPropagation();
    $('#create-account-modal').modal('show');
}

function openLoginModal(event) {
    event.stopPropagation();
    $('#login-modal').modal('show');
}

function closeLoginModal(event) {
    event.stopPropagation();
    userEmail.value = "";
    userPassword.value = "";
    $('#login-modal').modal('hide');
}

async function loginUser() {
    try {
        const userCred = await auth.signInWithEmailAndPassword(userEmail.value, userPassword.value);
        console.log(userCred);
    } catch (error) {
        console.log(error);
    }

    $('login-modal').modal('hide');
    userEmail.value = "";
    userPassword.value = "";
}

async function addNewUser() {
    try {
        const userCred = await auth.createUserWithEmailAndPassword(newUserEmail.value, newUserPassword.value);
        console.log(userCred);
    } catch (error) {
        console.log(error);
    }
    $('#create-account-modal').modal('hide');
    newUserEmail.value = "";
    newUserPassword.value = "";
}

// Listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in: ", user);
    } else {
        console.log("user logged out.");
    }
})

signInButton.addEventListener("click", (event) => openLoginModal(event));
createNewAccButton.addEventListener("click", (event) => openSignUpModal(event));
closeLoginButton.addEventListener("click", (event) => closeLoginModal(event));
confirmLoginButton.addEventListener("click", loginUser);
confirmNewAccountButton.addEventListener("click", addNewUser);
signOutButton.addEventListener("click", signUserOut);