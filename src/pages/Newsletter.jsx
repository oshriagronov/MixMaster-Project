import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify"; // Importing the toast function from react-toastify to display notifications of successfully register to the newsletter.

export const action = async ({ request }) => {
  /*
   * The action function is responsible for handling the form submission.It receives the request object as a parameter.
   * Because normally in html submitting a form will just sent "get" request and vite doesn't know that to do with that, so instead we use post request and handle it through rea-router-dom's with action prop.
   */
  const data = await request.formData(); // Extracting the form data from the request object with formData() method. This method returns an instance of FormData which is a collection of key/value pairs representing the form fields
  console.log(Object.fromEntries(data)); // Converting the FormData object to an object using Object.fromEntries() method, so we have easy access to all the form data.
  toast.success("Data submitted successfully"); // Displaying a success notification with react-toastify library.
  return redirect("/"); // Redirecting the user to the home page after successful submission of the form.
};

const Newsletter = () => {
  const { state } = useNavigation(); // Using the useNavigation hook to get the navigation state which contains information about the current route and its status
  const isSubmitting = state === "submitting"; // Checking if the form is currently being submitted by comparing the state with "submitting".If it's true, then the form is being submitted.
  return (
    <section className="page">
      <Form className="form newsletter-form" method="post">
        <div className="title">
          <h3>Our Newsletter</h3>
        </div>
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <input
          type="text"
          className="form-input"
          name="firstName"
          id="firstName"
          required
        />
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-input"
          name="lastName"
          id="lastName"
          required
        />
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-input"
          name="email"
          id="email"
          required
        />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitted" : "Submit"}{" "}
          {/* Displaying the submit button text based on whether the form is being submitted or not. If it's true, then the button text will be "Submitted" and will be disabled, otherwise it will be "Submit". */}
        </button>
      </Form>
    </section>
  );
};
export default Newsletter;
