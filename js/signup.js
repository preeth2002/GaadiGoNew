import { loginDetails, firebaseSuccessMsg } from "./firebase.js";
import { hashPassword } from "./password-functions.js";

const createAccountForm = document.getElementById("createAccountForm");
createAccountForm.addEventListener("submit", createAccountViaForm);

async function createAccountViaForm(e) {
  e.preventDefault();

  // Check if email already exists
  const email = document.getElementById("email").value;
  var query = loginDetails.where("email", "==", email);
  let result = await query.get();
  if (!result.empty) {
    alert("Email already exists.");
    return;
  }

  // Hash Password for security
  const hash_result = await hashPassword(
    document.getElementById("password").value
  );

  const data = {
    email: document.getElementById("email").value.toLowerCase(),
    password: hash_result.hash,
    salt: hash_result.salt,
    mobile: document.getElementById("mobile").value,
    age: document.getElementById("age").value,
    name: document.getElementById("full_name").value,
  };

  loginDetails.add(data); // Write data to firebase

  firebaseSuccessMsg();
  createAccountForm.reset();
}
