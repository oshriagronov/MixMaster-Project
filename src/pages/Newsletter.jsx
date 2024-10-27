import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const data = await request.formData();
  console.log(Object.fromEntries(data));
  toast.success("Data submitted successfully");
  return redirect("/");
};

const Newsletter = () => {
  const { state } = useNavigation();
  const isSubmitting = state === "submitting";
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
          {isSubmitting ? "Submitted" : "Submit"}
        </button>
      </Form>
    </section>
  );
};
export default Newsletter;
