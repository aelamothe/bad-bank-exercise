function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  function validated(field, label) {
    // array for tracking duplicates
    let duplicate = ctx.users.map((a) => a.email);
    // validateds the fields by checking for empty fields
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 5000);
      return false;
    }
    // check if account with this email already exists
    else if (label === "email" && duplicate.indexOf(email) >= 0) {
      setStatus("Error: Duplicate " + label);
      setTimeout(() => setStatus(""), 5000);
      return false;
    } else return true;
  }

  function handleCreate() {
    console.log(name, email, password);
    // return early if any of the validation checks fail
    if (!validated(name, "name")) return;
    if (!validated(email, "email")) return;
    if (!validated(password, "password")) return;
    // if all is validatedd, then add the users to our contextual list  of users
    ctx.users.push({ name, email, password, balance: 100 });
    console.log(ctx.users);
    // hide our initial form
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  // if show=true, show the form for creating an account
  // else, clear form and provide option to submit a new response
  // empty tags <> because react requires a parent/ container element for components
  return (
    <Card
      bgcolor="dark"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            Password
            <br />
            <input
              type="input"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleCreate}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
            <> </>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}
